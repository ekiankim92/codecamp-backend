import { CreateProductInput } from '../dto/create-product.input';
import { Product } from '../entities/product.entity';
import { UpdateProductInput } from '../dto/update-product.input';

export interface IProductsServicesCreate {
  createProductInput: CreateProductInput;
}

export interface IProductsServiceFindOne {
  productId: string;
}

export interface IProductsServiceCheckSoldout {
  product: Product;
}

export interface IProductsServiceUpdate {
  productId: string;
  updateProductInput: UpdateProductInput;
}
