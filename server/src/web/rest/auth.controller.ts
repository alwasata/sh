import { Controller, Get, Logger, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { AuthService } from '../../service/auth.service';

@Controller('api/users')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('auth-controller')
export class AuthController {
    logger = new Logger('AuthController');

    constructor(private readonly authService: AuthService) {}

  @Get('/authorities')
  @ApiOperation({ title: 'Get the list of user roles' })
  @ApiResponse({
    status: 200,
    description: 'List all user roles',
    type: 'string',
    isArray: true
  })
  @Roles(RoleType.ADMIN)
  async getAuthorities(@Req() req: any): Promise<any> {
    const auths = await this.authService.getAuthorities();
    return auths.map(auth => auth.name);
  }
}
