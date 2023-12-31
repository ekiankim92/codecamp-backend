import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { ProductSaleslocationInput } from './product-saleslocation.input';

@InputType()
export class CreateProductInput {
  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => String)
  description: string;

  @Min(0)
  @Field(() => Int)
  price: number;

  @Field(() => ProductSaleslocationInput)
  productSalesLocation: ProductSaleslocationInput;

  @Field(() => String)
  productCategoryId: string;
}
