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

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  findOne({ productId }: IProductsServiceFindOne): Promise<Product> {
    return this.productsRepository.findOne({ where: { id: productId } });
  }

  create({ createProductInput }: IProductsServiceCreate): Promise<Product> {
    const result = this.productsRepository.save({
      // 하나 하나 직접 나열 하는 방식
      //   name: '마우스',
      //   description: '좋은 마우스!',
      //   price: 3000,

      ...createProductInput,
    });

    // result 안에는 무엇이 있을까?
    // result = {
    //  id: 'eld19238hashjhd',
    //  name: "마우스",
    //  desriptions: "좋은 마우스!"
    //  price: 3000
    // }
    //
    return result;
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
}
