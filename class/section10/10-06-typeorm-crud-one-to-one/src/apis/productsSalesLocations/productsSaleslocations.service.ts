import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductSalesLocation } from './entities/productSaleLocation.entity';
import { InjectRepository } from '@nestjs/typeorm';

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
