import { NumericLiteral } from "@babel/types";
import { RoleType } from "../role/roletype.enum";

export interface IJwtPayload {
    id: string;
    username: string;
    email: string;
    roles: RoleType[],
    expire?: Date;
}