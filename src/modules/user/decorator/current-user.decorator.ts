import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { UserDetailsResponseDto } from '../dto/response';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UserDetailsResponseDto;
  },
);
