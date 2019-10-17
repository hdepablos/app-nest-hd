import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable, JoinColumn } from "typeorm";
import { UserEntity } from "../user/user.entity";

@Entity('user_acceso')
export class UserAccesoEntity extends BaseEntity{
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'integer', nullable: false })
    sede_id: boolean;

    @Column({ type: 'integer', nullable: false })
    perfil_id: boolean;

    @Column({ type: 'boolean', default: true, name: 'is_active' })
    isActive: boolean;

    @ManyToOne(type => UserEntity, user => user.user_id, { onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({ name: "user_id" })
    user_id: UserEntity;
}