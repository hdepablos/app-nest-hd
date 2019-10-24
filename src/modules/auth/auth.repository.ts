import { Repository, EntityRepository, getConnection, In } from "typeorm";
import { UserEntity } from "../user/user.entity";
import { SignupDto } from "./dto";
import { RoleRepository } from "../role/role.repository";
import { RoleEntity } from "../role/role.entity";
import { RoleType } from "../role/roletype.enum";
import { HttpException, HttpStatus } from "@nestjs/common";

@EntityRepository(UserEntity)
export class AuthRepository extends Repository<UserEntity>{

    async signup(signupDto: SignupDto){
        const {username, password, email} = signupDto;

        // validar que el usuario no exista por medio del username y email
        const usuario = await getConnection().getRepository(UserEntity);

        const userExist = await usuario.findOne({
                where: [{ username }, { email }]
                // where: [{ username: username.toLocaleLowerCase() }, { email }]
            });

        if (userExist) throw new HttpException('username o email already exists', HttpStatus.CONFLICT);

        const user = new UserEntity();
        user.username = username.toLocaleLowerCase();
        user.password = password;
        user.email = email;

        const roleRepository: RoleRepository = await getConnection().getRepository(RoleEntity);

        const arrRoles: RoleEntity[] = await roleRepository.find({
            where: { isActive: true, id: In([3]) }
        });

        if (!arrRoles.length) throw new HttpException(`Not Found role id: [] o están inactivos`, HttpStatus.NOT_FOUND);

        const newUser = await usuario.create({ ...user, roles: arrRoles }).save();
        return newUser.toResponseObject();
    }
}