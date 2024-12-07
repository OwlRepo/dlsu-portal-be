import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  employeeId: string;

  @Column()
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  isActive: boolean;

  @Column()
  dateCreated: string;

  @Column()
  dateActivated: string;

  @Column({ nullable: true })
  dateDeactivated: string;

  @Column('simple-array')
  deviceId: string[];
}
