import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // 중복된 이름을 넣을수 없음
  @Column({ unique: true })
  name: string;
}
