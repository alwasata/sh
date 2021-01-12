import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { BenefitRequestDTO } from '../../service/dto/benefit-request.dto';
import { BenefitRequestService } from '../../service/benefit-request.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/benefit-requests')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('benefit-requests')
export class BenefitRequestController {
    logger = new Logger('BenefitRequestController');

    constructor(private readonly benefitRequestService: BenefitRequestService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: BenefitRequestDTO,
    })
    async getAll(@Req() req: Request): Promise<BenefitRequestDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.benefitRequestService.findAndCount({
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
        type: BenefitRequestDTO,
    })
    async getOne(@Param('id') id: string): Promise<BenefitRequestDTO> {
        return await this.benefitRequestService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create benefitRequest' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: BenefitRequestDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() benefitRequestDTO: BenefitRequestDTO): Promise<BenefitRequestDTO> {
        const created = await this.benefitRequestService.save(benefitRequestDTO);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'BenefitRequest', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update benefitRequest' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: BenefitRequestDTO,
    })
    async put(@Req() req: Request, @Body() benefitRequestDTO: BenefitRequestDTO): Promise<BenefitRequestDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'BenefitRequest', benefitRequestDTO.id);
        return await this.benefitRequestService.update(benefitRequestDTO);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete benefitRequest' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: string): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'BenefitRequest', id);
        return await this.benefitRequestService.deleteById(id);
    }
}
