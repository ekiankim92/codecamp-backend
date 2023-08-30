// import { Field, InputType, Int } from '@nestjs/graphql';
// import { Min } from 'class-validator';

import { InputType, OmitType, PartialType, PickType } from '@nestjs/graphql';
import { CreateProductInput } from './create-product.input';

// 이미 create-product-inputs.ts 에서 타입을 가지고 있음
// 그래서 굳이 밑에처럼 하나하나 다 안만들어줘도 괜찮음

// @InputType()
// export class UpdateProductInput {
//   @Field(() => String, { nullable: true })
//   name?: string;

//   @Field(() => String, { nullable: true })
//   description?: string;

//   @Min(0)
//   @Field(() => Int, { nullable: true })
//   price?: number;
// }

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
  // 아래 내용들을 상속 받음
  // name?: string
  // description?: string;
  // price?: number;
}

PickType(CreateProductInput, ['name', 'description']); // 뽑기
OmitType(CreateProductInput, ['description']); // 빼기
PartialType(CreateProductInput); // 물음표 있어도 되고 없어도 되고
