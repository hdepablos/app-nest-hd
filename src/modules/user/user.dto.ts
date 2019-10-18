import { IsNotEmpty } from 'class-validator';
import { RoleType } from '../role/roletype.enum';

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
