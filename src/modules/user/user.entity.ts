import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { RoleEntity } from "../role/role.entity";
import { UserAccesoEntity } from "../user-acceso/user-acceso.entity";

@Entity('users')
export class UserEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        unique: true,
        length: 25,
        nullable: false
    })
    username: string;

    @Column({
        type: 'varchar',
        length: 20,
        nullable: false
    })
    password: string;

    @Column({
        type: 'varchar',
        length: 75,
        nullable: false
    })
    email: string;

    @Column({ type: 'boolean', default: true, name: 'is_active' })
    isActive: boolean;

    @ManyToMany(type => RoleEntity, role => role.users, { onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinTable({
        name: "user_roles", // table name for the junction table of this relation
        joinColumn: {
            name: "user_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "role_id",
            referencedColumnName: "id"
        }
    })
    roles: RoleEntity[];

    @OneToMany(type => UserAccesoEntity, userAcceso => userAcceso.user_id)
    user_id: UserAccesoEntity[];
    
    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

    // @UpdateDateColumn()
    // updated: Date;
}