import { IsNotEmpty, IsEmail, ArrayNotEmpty, IsBoolean } from 'class-validator';
import { RoleEntity } from '../role/role.entity';

export class UserDTO {

  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
  
  // @IsNotEmpty()
  // roles?: RoleType[];

  // @IsBoolean()
  is_active?: boolean;

  @ArrayNotEmpty()
  roles?: number[];
}


export class UserRO{
  id: string;
  username: string;
  email: string;
  roles?: RoleEntity[];
  token?: string;
  // is_active?: boolean;
}