import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { Request } from 'express';
import { SettingDTO } from '../../service/dto/setting.dto';
import { SettingService } from '../../service/setting.service';
import { Page, PageRequest } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/settings')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('settings')
export class SettingController {
  logger = new Logger('SettingController');

  constructor(private readonly settingService: SettingService) {
  }

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: SettingDTO
  })
  async getAll(@Req() req: Request): Promise<SettingDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.settingService.findAndCount({
      skip: +pageRequest.page * pageRequest.size,
      take: +pageRequest.size,
      order: pageRequest.sort.asOrder()
    });
    HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
    return results;
  }

  @Get('/:id')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: SettingDTO
  })
  async getOne(@Param('id') id: string): Promise<SettingDTO> {
    return await this.settingService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create setting' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: SettingDTO
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() settingDTO: SettingDTO): Promise<SettingDTO> {
    const created = await this.settingService.save(settingDTO);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Setting', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update setting' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: SettingDTO
  })
  async put(@Req() req: Request, @Body() settingDTO: SettingDTO): Promise<SettingDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Setting', settingDTO.id);
    return await this.settingService.update(settingDTO);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete setting' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async deleteById(@Req() req: Request, @Param('id') id: string): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Setting', id);
    return await this.settingService.deleteById(id);
  }
}
