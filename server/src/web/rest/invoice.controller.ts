import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { InvoiceDTO } from '../../service/dto/invoice.dto';
import { InvoiceService } from '../../service/invoice.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/invoices')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('invoices')
export class InvoiceController {
    logger = new Logger('InvoiceController');

    constructor(private readonly invoiceService: InvoiceService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: InvoiceDTO,
    })
    async getAll(@Req() req: Request): Promise<InvoiceDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.invoiceService.findAndCount({
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
        type: InvoiceDTO,
    })
    async getOne(@Param('id') id: string): Promise<InvoiceDTO> {
        return await this.invoiceService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create invoice' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: InvoiceDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() invoiceDTO: InvoiceDTO): Promise<InvoiceDTO> {
        const created = await this.invoiceService.save(invoiceDTO);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Invoice', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update invoice' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: InvoiceDTO,
    })
    async put(@Req() req: Request, @Body() invoiceDTO: InvoiceDTO): Promise<InvoiceDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Invoice', invoiceDTO.id);
        return await this.invoiceService.update(invoiceDTO);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete invoice' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: string): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'Invoice', id);
        return await this.invoiceService.deleteById(id);
    }
}
