import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import {
  IProductsServiceCreate,
  IProductsServiceFindOne,
  IProductsServiceCheckSoldout,
  IUpdateProductInput,
} from './interfaces/products.services.interface';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsSaleslocationsService } from '../productsSalesLocations/productsSaleslocations.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,

    private readonly productsSaleslocationsService: ProductsSaleslocationsService,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find({
      relations: ['productSaleslocation'],
    });
  }

  findOne({ productId }: IProductsServiceFindOne): Promise<Product> {
    return this.productsRepository.findOne({
      where: { id: productId },
      relations: ['productSaleslocation'],
    });
  }

  async create({
    createProductInput,
  }: IProductsServiceCreate): Promise<Product> {
    // 1. 상품 하나만 등록할 때 사용하는 방법
    // const result = this.productsRepository.save({
    //   ...createProductInput,
    // });

    // 2. 상품과 상품 거래위치를 같이 등록하는 방법
    const { productSalesLocation, ...rest } = createProductInput;

    const result = await this.productsSaleslocationsService.create({
      productSalesLocation,
    }); // 서비스를 타고 가야 하는 이유는 ... ?
    //  // 래파지토리에 직접 접근하면 검증 로직을 통일 시킬수 없음

    const result2 = this.productsRepository.save({
      ...rest,
      productSaleslocation: result, // result 통째로 넣기 vs. 아이디만 빼서 넣기
    });

    return result2;
  }

  async update({
    productId,
    updateProductInput,
  }: IUpdateProductInput): Promise<Product> {
    // this.productsRepository.create; // DB 접속이랑 관련 없음. 등록을 위해서 빈 껍데기 객체 만들기 위함
    // this.productsRepository.insert; // 결과를 객체로 못 돌려 받는 등록 방법
    // this.productsRepository.update; // 결과를 객체로 못 돌려 받는 수정 방법

    // 서비스에서 검증을 해야하는데 이렇게 하면 30개를 또 검증 해야하니, 똑같은걸 재사용
    // 기존 있는 내용을 재사용하여, 로직을 통일하자!
    // const product = await this.productsRepository.findOne({
    //   where: { id: productId },
    // });
    const product = await this.findOne({ productId });

    // 검증은 서비스에서 하자!
    this.checkSoldout({ product });

    // 등록 수정은 save 으로 쓰는데 아이디가 있으면 등록 없으면 수정
    const result = this.productsRepository.save({
      ...product,
      ...updateProductInput,
    });

    return result;
  }

  // checkSoldout 을 함수로 만드는 이유 => 수정시, 삭제시 등 같음 거증 로직 사용
  checkSoldout({ product }: IProductsServiceCheckSoldout) {
    if (product.isSoldout) {
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다');
    }

    // if (product.isSoldout) {
    //   throw new HttpException(
    //     '이미 판매 완료된 상품입니다',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // }
  }

  async delete({ productId }: IProductDelete): Promise<boolean> {
    // 1. 실제 삭제 방법
    // const result = await this.productsRepository.delete({ id: productId });
    // return result.affected ? true : false;

    // 2. 소프트 삭제 (직접 구현)- isDeleted. 그리고 find쪽 에서 조건을 줘야함
    // this.productsRepository.update({ id: productId }, { isDeleted: true });

    // 3. 소프트 삭제 (직접 구현)- deletedAt
    // this.productsRepository.update({id: productId}, {deletedAt: new Date()})

    // typeOrm 에서 제공하는걸 쓰면 find 에서 또 다른 조건을 안걸어도 됨

    // 4. 소프트 삭제 - [TypeOrm 제공] - softRemove
    // 단점: id로만 삭제 가능
    // 장점: 배열로 여러 아이디 한번에 지우기 가능
    // .softRemove([{id: aaaa} , {id: qqqq}, {id: zzzz}])
    // this.productsRepository.softRemove({ id: productId });

    // 5. 소프트 삭제 - [TypeOrm 제공] - softDelete
    const result = await this.productsRepository.softDelete({ id: productId });
    // 단점: 여러 아이디 한번에 지우기 불가능
    // 장점: 다른 컬럽으로도 삭제 가능
    return result.affected ? true : false;
  }
}

interface IProductDelete {
  productId: string;
}
