import { InputType, OmitType } from '@nestjs/graphql';
import { ProductSalesLocation } from 'src/apis/productsSalesLocations/entities/productSaleLocation.entity';

@InputType()
export class ProductSaleslocationInput extends OmitType(
  ProductSalesLocation,
  ['id'],
  InputType,
) {}
