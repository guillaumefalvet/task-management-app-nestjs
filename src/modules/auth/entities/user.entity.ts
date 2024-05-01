import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

// - Entities - //
import { Task } from 'src/modules/tasks/entities/task.entity';
import { Role } from 'src/shared/models/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, type: 'varchar', length: 30 })
  username: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  refreshToken: string;

  @OneToMany((_type) => Task, (task) => task.user, { eager: true })
  tasks: Task[];

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;
}
