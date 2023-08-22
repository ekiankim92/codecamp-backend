import { Injectable } from '@nestjs/common';
import {
  IProductsServiceCreate,
  IProductsServiceFindOne,
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
}
