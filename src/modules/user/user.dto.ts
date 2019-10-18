import { IsNotEmpty } from 'class-validator';
import { RoleType } from '../role/roletype.enum';
import { RoleEntity } from '../role/role.entity';

export class UserDTO {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  roles: RoleType[];
}

export class UserRO{
    id: string;
    username: string;
    email: string;
    roles?: RoleEntity[];
    token?: string;
}