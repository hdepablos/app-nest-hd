import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn, OneToMany, Generated, BeforeInsert, BeforeUpdate, AfterLoad } from "typeorm";
import { RoleEntity } from "../role/role.entity";
import { UserAccesoEntity } from "../user-acceso/user-acceso.entity";
import { UserRO } from "./user.dto";
import { genSalt, hash } from "bcryptjs";

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
        length: 75,
        nullable: false
    })
    password: string;

    @Column({
        type: 'varchar',
        unique: true,
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

    toResponseObject(showToken: boolean = false): UserRO{
        const { id, username, email, created, isActive } = this;
        const responseOject: any = {
            id, 
            username,
            email,
            created,
            isActive
        }

        if (this.roles) responseOject.roles = this.roles;
        // if (showToken) responseOject.token = token;
        return responseOject;
    }

    // private get token():string {
    //     const{ id, username } = this;
        
    //     // Mientras tanto
    //     return 'jfhjgjgjghsjdfjdhfjdf';
    // }

    @BeforeInsert()
    async hashPassword() {
        const salt = await genSalt(10);
        this.password = await hash(this.password, salt);
        // this.password = await bcrypt.hash(this.password, 10);
    }

    // @BeforeInsert()
    // async lowerUserNameI() {
    //     this.username = this.username.toLocaleLowerCase();
    // }

    // @BeforeUpdate()
    // async lowerUserNameU(){
    //     this.username = this.username.toLocaleLowerCase();
    // }

    // private tempUserName: string;

    // @AfterLoad()
    // private loadTempPassword(): void {
    //     console.log('load ' + this.username);
        
    //     this.tempUserName = this.username;
    // }

    // @BeforeUpdate()
    // private encryptPassword(): void {
    //     console.log('before ' + this.username);
        
    //     if (this.tempUserName !== this.password) {
    //         this.tempUserName = this.username.toLocaleLowerCase();
    //     }
    // }

    // @BeforeInsert()
    // @BeforeUpdate()
    // hashPassword() {
    //     if (this.username) {
    //         this.username = this.username.toLocaleLowerCase();
    //     }
    // }
    
}