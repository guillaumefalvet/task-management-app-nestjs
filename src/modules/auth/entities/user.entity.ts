import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

// - Entities - //
import { Task } from 'src/modules/tasks/entities/task.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, type: 'varchar', length: 30 })
  username: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  refreshToken: string;

  @OneToMany((_type) => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}
