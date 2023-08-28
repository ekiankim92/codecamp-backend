import { Module } from '@nestjs/common';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductsSaleslocationsService } from '../productsSalesLocations/productsSaleslocations.service';
import { ProductSalesLocation } from '../productsSalesLocations/entities/productSaleLocation.entity';
import { ProductsTagsService } from '../productsTags/productsTags.service';
import { ProductTag } from '../productsTags/entities/productTag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product, //
      ProductSalesLocation,
      ProductTag,
    ]),
  ],
  providers: [
    ProductsResolver, //
    ProductsService, //
    ProductsSaleslocationsService,
    ProductsTagsService,
  ],
})
export class ProductsModule {}
