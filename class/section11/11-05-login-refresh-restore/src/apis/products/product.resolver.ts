import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductsService } from './product.service';
import { CreateProductInput } from './dto/create-product.input';
import { Product } from './entities/product.entity';
import { UpdateProductInput } from './dto/update-product.input';

@Resolver()
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService, //
  ) {}

  @Query(() => [Product])
  fetchProducts(): Promise<Product[]> {
    return this.productsService.findall();
  }

  @Query(() => Product)
  fetchProduct(
    @Args('productId') productId: string, //
  ): Promise<Product> {
    return this.productsService.findone({ productId });
  }

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ): Promise<Product> {
    // << 브라우저에 결과를 보내주는 두 가지 방법 >>

    // 1. 등록된 내용이 담긴 객체를 그대로 돌려보내주기
    return this.productsService.create({ createProductInput });

    // 2. 결과 메세지만 간단히 보내주기
    // return "정상적으로 상품이 등록되었습니다.";
  }

  @Mutation(() => Product)
  updateProduct(
    @Args('productId') productId: string, //
    @Args('updateProductInput') updateProductInput: UpdateProductInput, //
  ): Promise<void> {
    return this.productsService.update({ productId, updateProductInput });
  }

  @Mutation(() => Boolean)
  deleteProduct(
    @Args('productId') productId: string, //
  ): Promise<boolean> {
    return this.productsService.delete({ productId });
  }
}
