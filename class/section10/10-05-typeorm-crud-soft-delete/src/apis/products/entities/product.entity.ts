import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductCategory } from 'src/apis/productsCategories/entities/productCategory.entity';
import { ProductSalesLocation } from 'src/apis/productsSalesLocations/entities/productSaleLocation.entity';
import { ProductTag } from 'src/apis/productsTags/entities/productTag.entity';
import { User } from 'src/apis/users/entities/users.entity';
import {
  Column,
  // CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  // UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column()
  @Field(() => Int)
  price: number;

  // 상품을 넣자마자 팔리수 없으니 기본값을 false 로 넣어줌
  @Column({ default: false })
  @Field(() => Boolean)
  isSoldout: boolean;

  @JoinColumn()
  @OneToOne(() => ProductSalesLocation)
  @Field(() => ProductSalesLocation)
  productSaleslocation: ProductSalesLocation;

  @ManyToOne(() => ProductCategory)
  @Field(() => ProductCategory)
  productCategory: ProductCategory;

  @ManyToOne(() => User)
  @Field(() => User)
  users: User;

  @JoinTable()
  @ManyToMany(() => ProductTag, (productTags) => productTags.products)
  @Field(() => [ProductTag])
  productTags: ProductTag[];

  // @CreateDateColumn() // 데이터 등록시 등록시간 자동으로 추가
  // createdAt: Date;

  // @UpdateDateColumn() // 데이터 수정시 수정시간 자동으로 추가
  // updatedAt: Date;

  @DeleteDateColumn() // 소프트삭제 시간 기록을 위함
  deletedAt: Date;
}
