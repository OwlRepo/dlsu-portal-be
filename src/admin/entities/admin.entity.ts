import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  adminId: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;
}
