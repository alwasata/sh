import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { CardDTO } from '../../service/dto/card.dto';
import { CardService } from '../../service/card.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { CardTransactionService } from '../../service/card-transaction.service';
import { CardTransactionDTO } from '../../service/dto/card-transaction.dto';

@Controller('api/cards')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('cards')
export class CardController {
    logger = new Logger('CardController');

    constructor(
      private readonly cardService: CardService,
      private readonly cardTransactionService: CardTransactionService
      ) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: CardDTO,
    })
    async getAll(@Req() req: Request): Promise<CardDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.cardService.findAndCount({
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
        type: CardDTO,
    })
    async getOne(@Param('id') id: string): Promise<CardDTO> {
        return await this.cardService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.USER)
    @ApiOperation({ title: 'Create card' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: CardDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() cardDTO: CardDTO): Promise<CardDTO> {
        const created = await this.cardService.save(cardDTO);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Card', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update card' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: CardDTO,
    })
    async put(@Req() req: Request, @Body() cardDTO: CardDTO): Promise<CardDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Card', cardDTO.id);
        return await this.cardService.update(cardDTO);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete card' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: string): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'Card', id);
        return await this.cardService.deleteById(id);
    }

    // @PostMethod('chargecard')
    // @Roles(RoleType.ADMIN)
    // @ApiOperation({ title: 'save charge' })
    // @ApiResponse({
    //     status: 204,
    //     description: 'The record has been successfully deleted.',
    //     type: CardDTO,
    // })
    // async chargeCard(@Req() req: Request, @Body() cardDTO: CardDTO): Promise<CardDTO> {
    //     // HeaderUtil.addEntityDeletedHeaders(req.res, 'Card', id);
    //     return cardDTO;
    // }

    @Put('chargecard')
    @Roles(RoleType.USER)
    @ApiOperation({ title: 'Create card' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: CardDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async chargeCard(@Req() req: Request, @Body() data: object): Promise<CardDTO> {
      var cardTransactionDTO = new CardTransactionDTO ();
      cardTransactionDTO.amount = data.points / 1.1;
      cardTransactionDTO.pointsAmount = data.points;
      cardTransactionDTO.card = data.card.id;
      cardTransactionDTO.action = "PLUS";
      cardTransactionDTO.notes = "اضافة نقاط الى البطاقة";
      cardTransactionDTO.createdBy = req.user.id;
      const created = await this.cardTransactionService.save(cardTransactionDTO);
      return data.card;
    }

}
