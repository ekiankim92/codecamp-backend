import { Module } from '@nestjs/common';
import { ProductsResolver } from './product.resolver';
import { ProductsService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductsSaleslocationsService } from '../productsSaleslocations/productsSaleslocations.service';
import { ProductSalesLocation } from '../productsSaleslocations/entities/productSaleslocation.entity';
import { ProductTag } from '../productsTags/entities/productTag.entity';
import { ProductsTagsService } from '../productsTags/productsTags.service';
import { ProductSubscriber } from './entities/product.subscriber';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product, //
      ProductSalesLocation,
      ProductTag,
    ]),
  ],
  providers: [
    ProductSubscriber,
    ProductsResolver,
    ProductsService,
    ProductsSaleslocationsService,
    ProductsTagsService,
  ],
})
export class ProductsModule {}
