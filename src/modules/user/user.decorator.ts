import { createParamDecorator } from '@nestjs/common';

export const Ope = createParamDecorator((data, req) => {
    return data ? req.user[data]: req.user;
});