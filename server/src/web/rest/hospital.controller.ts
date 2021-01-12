import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { HospitalDTO } from '../../service/dto/hospital.dto';
import { HospitalService } from '../../service/hospital.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/hospitals')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('hospitals')
export class HospitalController {
    logger = new Logger('HospitalController');

    constructor(private readonly hospitalService: HospitalService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: HospitalDTO,
    })
    async getAll(@Req() req: Request): Promise<HospitalDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.hospitalService.findAndCount({
            skip: +pageRequest.page * pageRequest.size,
            take: +pageRequest.size,
            order: pageRequest.sort.asOrder(),
        });
        HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
        return results;
    }

    @Get('/:id')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: HospitalDTO,
    })
    async getOne(@Param('id') id: string): Promise<HospitalDTO> {
        return await this.hospitalService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create hospital' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: HospitalDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() hospitalDTO: HospitalDTO): Promise<HospitalDTO> {
        const created = await this.hospitalService.save(hospitalDTO);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Hospital', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update hospital' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: HospitalDTO,
    })
    async put(@Req() req: Request, @Body() hospitalDTO: HospitalDTO): Promise<HospitalDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Hospital', hospitalDTO.id);
        return await this.hospitalService.update(hospitalDTO);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete hospital' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: string): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'Hospital', id);
        return await this.hospitalService.deleteById(id);
    }
}
