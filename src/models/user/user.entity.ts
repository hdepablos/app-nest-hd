import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User extends BaseEntity {

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

    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
    status: string;

    @CreateDateColumn({
        type: 'timestamp', name: 'created_at'
    })
    createdAt: Date;

    @CreateDateColumn({
        type: 'timestamp', name: 'updated_at'
    })
    updatedAt: Date;

    // @UpdateDateColumn()
    // updated: Date;
}