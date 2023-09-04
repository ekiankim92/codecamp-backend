import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductSalesLocation } from './entities/productSaleslocation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsSaleslocationsService {
  constructor(
    @InjectRepository(ProductSalesLocation)
    private readonly productsSaleslocationsRepository: Repository<ProductSalesLocation>,
  ) {}

  create({ productSalesLocation }) {
    return this.productsSaleslocationsRepository.save({
      ...productSalesLocation,
    });
  }
}
