import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { AttatchmentDTO } from '../../service/dto/attatchment.dto';
import { AttatchmentService } from '../../service/attatchment.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/attatchments')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('attatchments')
export class AttatchmentController {
    logger = new Logger('AttatchmentController');

    constructor(private readonly attatchmentService: AttatchmentService) {}

    @Get('/')
    @Roles(RoleType.COMPANY_ADMIN, RoleType.ADMIN)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: AttatchmentDTO,
    })
    async getAll(@Req() req: Request): Promise<AttatchmentDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.attatchmentService.findAndCount({
            skip: +pageRequest.page * pageRequest.size,
            take: +pageRequest.size,
            order: pageRequest.sort.asOrder(),
        });
        HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
        return results;
    }


    @Get('/employee/:employeeId')
    @Roles(RoleType.COMPANY_ADMIN, RoleType.ADMIN)
    @ApiResponse({
      status: 200,
      description: 'List all records',
      type: AttatchmentDTO,
    })
    async findByEmployee(@Param('employeeId') employeeId : string): Promise<AttatchmentDTO> {
      return await this.attatchmentService.findByEmplyee(employeeId);
    }

    @Get('/:id')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: AttatchmentDTO,
    })
    async getOne(@Param('id') id: string): Promise<AttatchmentDTO> {
        return await this.attatchmentService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.COMPANY_ADMIN, RoleType.ADMIN)
    @ApiOperation({ title: 'Create attatchment' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: AttatchmentDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() attatchmentDTO: AttatchmentDTO): Promise<AttatchmentDTO> {
        const created = await this.attatchmentService.save(attatchmentDTO);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Attatchment', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.COMPANY_ADMIN, RoleType.ADMIN)
    @ApiOperation({ title: 'Update attatchment' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: AttatchmentDTO,
    })
    async put(@Req() req: Request, @Body() attatchmentDTO: AttatchmentDTO): Promise<AttatchmentDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Attatchment', attatchmentDTO.id);
        return await this.attatchmentService.update(attatchmentDTO);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete attatchment' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: string): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'Attatchment', id);
        return await this.attatchmentService.deleteById(id);
    }
}
