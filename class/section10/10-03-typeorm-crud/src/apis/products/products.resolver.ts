import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { CreateProductInput } from './dto/create-product.input';
import { Product } from './entities/product.entity';

@Resolver()
export class ProductsResolver {
  // products.module.ts 에서 productsService 를 이 컴포넌트로 주입을 해주는거임. 주입을 해주려면 constructor 가 필요
  // 주입을 받으려면 constructor 사용
  constructor(private readonly productService: ProductsService) {}

  @Query(() => [Product])
  fetchProducts(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Query(() => Product)
  fetchProduct(@Args('productId') productId: string): Promise<Product> {
    return this.productService.findOne({ productId });
  }

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ): Promise<Product> {
    // << 브라우저에 결과 보내주는 2가지 방법

    // 1. 등록된 내용이 담긴 객체를 그대로 브라우저에 돌려보내주기

    return this.productService.create({ createProductInput });

    // 2. 결과 메세지만 간단히 보내주기
    // return "정상적으로 상품이 등록되었습니다"
  }
}
