import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity('user')
export class UserEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({unique: true})
  userId: number;

  @Column({default: false})
  deleted: boolean;
}
