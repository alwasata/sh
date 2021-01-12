import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { InvoiceBenefitsDTO } from '../../service/dto/invoice-benefits.dto';
import { InvoiceBenefitsService } from '../../service/invoice-benefits.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/invoice-benefits')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('invoice-benefits')
export class InvoiceBenefitsController {
    logger = new Logger('InvoiceBenefitsController');

    constructor(private readonly invoiceBenefitsService: InvoiceBenefitsService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: InvoiceBenefitsDTO,
    })
    async getAll(@Req() req: Request): Promise<InvoiceBenefitsDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.invoiceBenefitsService.findAndCount({
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
        type: InvoiceBenefitsDTO,
    })
    async getOne(@Param('id') id: string): Promise<InvoiceBenefitsDTO> {
        return await this.invoiceBenefitsService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create invoiceBenefits' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: InvoiceBenefitsDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() invoiceBenefitsDTO: InvoiceBenefitsDTO): Promise<InvoiceBenefitsDTO> {
        const created = await this.invoiceBenefitsService.save(invoiceBenefitsDTO);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'InvoiceBenefits', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update invoiceBenefits' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: InvoiceBenefitsDTO,
    })
    async put(@Req() req: Request, @Body() invoiceBenefitsDTO: InvoiceBenefitsDTO): Promise<InvoiceBenefitsDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'InvoiceBenefits', invoiceBenefitsDTO.id);
        return await this.invoiceBenefitsService.update(invoiceBenefitsDTO);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete invoiceBenefits' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: string): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'InvoiceBenefits', id);
        return await this.invoiceBenefitsService.deleteById(id);
    }
}
