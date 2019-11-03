import { BaseEntity, Entity, PrimaryColumn, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('sessions')
export class SessionEntity extends BaseEntity{
    
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({
        type: 'varchar',
        length: 300,
        nullable: false
    })
    token: string;

    // Ojo en el futuro esta se debe relacionar con la entidad usuario_acceso
    @Column({ type: 'integer', nullable: false, name: 'usuario_acceso' })
    usuarioAcceso: boolean;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    last_request: Date;

    @Column({ type: 'boolean', default: true, name: 'is_active' })
    isActive: boolean;


    // @CreateDateColumn()
    // created: Date;

    // @UpdateDateColumn()
    // updated: Date;

}