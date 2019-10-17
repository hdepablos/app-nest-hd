import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, JoinColumn, JoinTable, ManyToOne } from "typeorm";
import { UserEntity } from "../user/user.entity";

@Entity('roles')
export class RoleEntity extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ type: 'varchar', length: 20, nullable: false})
    name: string;

    @Column({ type: 'text' })
    description: string

    @Column({ type: 'boolean', default: true, name: 'is_active' })
    isActive: boolean;

    @ManyToMany(type => UserEntity, user => user.roles, { onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    users: UserEntity[]
 
}