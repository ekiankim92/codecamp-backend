import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IProductsServiceFindOne,
  IProductsServicesCreate,
  IProductsServiceCheckSoldout,
  IProductsServiceUpdate,
} from './interfaces/products-service.interface';
import { ProductsSaleslocationsService } from '../productsSaleslocations/productsSaleslocations.service';
import { ProductsTagsService } from '../productsTags/productsTags.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>, //

    private readonly productsSaleslocationsService: ProductsSaleslocationsService,

    private readonly productsTagsService: ProductsTagsService,
  ) {}

  findall(): Promise<Product[]> {
    return this.productsRepository.find({
      relations: ['productSaleslocation', 'productCategory'],
    });
  }
  findone({ productId }: IProductsServiceFindOne): Promise<Product> {
    return this.productsRepository.findOne({
      where: { id: productId },
      relations: ['productSaleslocation', 'productCategory'],
    });
  }

  async create({
    createProductInput,
  }: IProductsServicesCreate): Promise<Product> {
    // 1. 상품 하나만 등록할 때 사용하는 방법
    // const result = this.productsRepository.save({
    //   ...createProductInput,
    // 하나 하나 직접 나열하는 방식
    //     name: '마우스',
    //     description: '좋은 마우스',
    //     price: 3000,
    // });

    // 2. 상품과 상품거래위치를 같이 등록하는 방법
    const { productSalesLocation, productCategoryId, productTags, ...product } =
      createProductInput;

    // 2-1. 상품거래위치 등록
    const result = await this.productsSaleslocationsService.create({
      productSalesLocation,
    }); // 서비스를 타고 가야 하는 이유는...?
    //  // 레파지토리에 직접 접근하면 검증 로직을 통일시킬 수 없음!!!!

    // 2-2. 상품태그 등록
    // productTags가 ["#전자제품", "#영등포", "#컴퓨터"]라고 가정
    const tagNames = productTags.map((el) => el.replace('#', ''));
    const prevTags = await this.productsTagsService.findByNames({ tagNames });

    const temp = [];
    tagNames.forEach((el) => {
      const isExists = prevTags.find((prevEl) => el === prevEl.name); // prevEl? 전자제품
      if (!isExists) temp.push({ name: el });
    });

    const newTags = await this.productsTagsService.bulkInsert({ names: temp });
    const tags = [...prevTags, ...newTags.identifiers];

    const result2 = this.productsRepository.save({
      ...product,
      productSaleslocation: result, // result 통째로 넣기 vs id만 빼서 넣기
      productCategory: {
        id: productCategoryId,
        // 만약 name까지 받고싶으면?
        // => createProductInput에 name까지 포함해서 받기
      },
      productTags: tags,
    });

    return result2;
  }

  async update({
    productId,
    updateProductInput,
  }: IProductsServiceUpdate): Promise<void> {
    const product = await this.findone({ productId });

    // if (product.isSoldout) {
    //   throw new HttpException(
    //     '이미 판매가 완료된 상품입니다.',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // }

    // this.productsRepository.create() => DB 접속과는 관련 없음. 빈 껍데기 객체 만들기 위함
    // this.productsRepository.insert() => 결과를 객체로 못 돌려받는 등록 방법
    // this.productsRepository.update() => 결과를 객체로 못 돌려받는 수정 방법

    // this.productsRepository.save() => 결과를 돌려받을 수 있는 등록 or 수정 방법
    // 숙제!!!!
    // const result = this.productsRepository.save({
    //   ...product, // 수정 후, 수정되지 않은 다른 결과값까지 모두 객체로 돌려받고 싶을 때
    //   ...updateProductInput,
    // });
    // return result;
  }

  // checkSoldout을 함수로 만드는 이유 => 수정, 삭제 시 같은 검증 로직 사용하기 위함
  checkSoldout({ product }: IProductsServiceCheckSoldout) {
    if (product.isSoldout) {
      throw new UnprocessableEntityException('이미 판매가 완료된 상품입니다.');
    }
  }

  async delete({ productId }: IProductsServiceDelete): Promise<boolean> {
    // 1. 실제 삭제
    // const result = await this.productsRepository.delete({ id: productId });
    // return result.affected ? true : false;

    // 2. 소프트 삭제 - isDeleted
    // this.productsRepository.update({ id: productId }, { isDeleted: true });

    // 3. 소프트 삭제 - deletedAt
    // this.productsRepository.update({ id: productId }, { deletedAt: new Date() })

    // 4. 소프트 삭제(TypeORM 제공) - softRemove
    // 장점: 여러 ID 한번에 삭제 가능 .softRemove([{id: qqq}, {id: www}, {id: eee}])
    // 단점: ID로만 삭제 가능
    // this.productsRepository.softRemove({ id: productId });

    // 4. 소프트 삭제(TypeORM 제공) - softDelete
    // 장점: ID 외에 다른 칼럼으로도 삭제 가능
    // 단점: 여러 ID 한번에 삭제 불가능
    const result = await this.productsRepository.softDelete({ id: productId });
    return result.affected ? true : false;
  }
}

interface IProductsServiceDelete {
  productId: string;
}
