import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('super_admins')
export class SuperAdmin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  superAdminId: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  name: string;

  @Column()
  role: string;
}
