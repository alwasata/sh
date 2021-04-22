import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { CardTransactionDTO } from '../../service/dto/card-transaction.dto';
import { CardTransactionService } from '../../service/card-transaction.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/card-transactions')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('card-transactions')
export class CardTransactionController {
    logger = new Logger('CardTransactionController');

    constructor(private readonly cardTransactionService: CardTransactionService) {}

    @Get('/')
    @Roles(RoleType.COMPANY_ADMIN, RoleType.HOSPITAL_ADMIN)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: CardTransactionDTO,
    })
    async getAll(@Req() req: Request): Promise<CardTransactionDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.cardTransactionService.findAndCount("",{
            skip: +pageRequest.page * pageRequest.size,
            take: +pageRequest.size,
            order: pageRequest.sort.asOrder(),
        });
        HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
        return results;
    }

    @Get('gettransactionbyid/:id')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: CardTransactionDTO,
    })
    async getAllById(@Req() req: Request, @Param('id') id: string): Promise<CardTransactionDTO[]> {
      console.log("hi");
      console.log(id);
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.cardTransactionService.findAndCount(id,{
            where: {card :  id},
            skip: +pageRequest.page * pageRequest.size,
            take: +pageRequest.size,
            order: pageRequest.sort.asOrder(),
        });
        HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
        return results;
    }

    @Get('getwhere/:id')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: CardTransactionDTO,
    })
    async getWhere(@Req() req: Request, @Param('id') id: string): Promise<CardTransactionDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.cardTransactionService.findAndCount(id,{
            where: {card :  id},
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
        type: CardTransactionDTO,
    })
    async getOne(@Param('id') id: string): Promise<CardTransactionDTO> {
        return await this.cardTransactionService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN,RoleType.USER)
    @ApiOperation({ title: 'Create cardTransaction' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: CardTransactionDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() cardTransactionDTO: CardTransactionDTO): Promise<CardTransactionDTO> {
        const created = await this.cardTransactionService.save(cardTransactionDTO);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'CardTransaction', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update cardTransaction' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: CardTransactionDTO,
    })
    async put(@Req() req: Request, @Body() cardTransactionDTO: CardTransactionDTO): Promise<CardTransactionDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'CardTransaction', cardTransactionDTO.id);
        return await this.cardTransactionService.update(cardTransactionDTO);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete cardTransaction' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: string): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'CardTransaction', id);
        return await this.cardTransactionService.deleteById(id);
    }
}
