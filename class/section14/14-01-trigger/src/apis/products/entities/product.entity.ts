import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductCategory } from 'src/apis/productsCategories/entities/productCategory.entity';
import { ProductSalesLocation } from 'src/apis/productsSaleslocations/entities/productSaleslocation.entity';
import { ProductTag } from 'src/apis/productsTags/entities/productTag.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
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

  @Column({ default: false })
  @Field(() => Boolean)
  isSoldout: boolean;

  @JoinColumn() // JoinColumn은 OneToOne 관계에서만 사용
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
  @ManyToMany(() => ProductTag, (qqq) => qqq.products)
  @Field(() => [ProductTag])
  productTags: ProductTag[];

  // @CreateDateColumn() // 데이터 등록 시 등록시간 추가
  // createdAt: Date;

  // @UpdateDateColumn() // 데이터 수정 시 수정시간 추가
  // updatedAt: Date;

  @DeleteDateColumn() // 소프트삭제 시간 기록을 위함
  deletedAt: Date;
}
