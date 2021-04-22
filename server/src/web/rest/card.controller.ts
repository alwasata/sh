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
import { SettingService } from '../../service/setting.service';
import { TransactionAction } from '../../domain/enumeration/transaction-action';
import { CompanyService } from '../../service/company.service';

@Controller('api/cards')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('cards')
export class CardController {
  logger = new Logger('CardController');

  constructor(
    private readonly cardService: CardService,
    private readonly cardTransactionService: CardTransactionService,
    private readonly settingService: SettingService,
    private readonly companyService: CompanyService,
    ) {}

    @Get('/:search')
    @Roles(RoleType.ADMIN,RoleType.COMPANY_ADMIN)
    @ApiResponse({
      status: 200,
      description: 'List all records',
      type: CardDTO,
    })
    async getAll(@Req() req: Request, @Param('search') search: string): Promise<CardDTO[]> {
      var company;
      if(req.user["authorities"].includes('ROLE_ADMIN') == true) {
        company = "all";
      } else {
        company = await this.companyService.getCompanyIdForUser(req.user["id"]);
        company = company["company_id"];
      }
      const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
      const [results, count] = await this.cardService.findAndCount(search,company,{
        skip: +pageRequest.page * pageRequest.size,
        take: +pageRequest.size,
        order: pageRequest.sort.asOrder(),
      });
      HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
      return results;
    }

    @Get('/find/:id')
    @Roles(RoleType.USER)
    @ApiResponse({
      status: 200,
      description: 'The found record',
      type: CardDTO,
    })
    async getOne(@Param('id') id: string): Promise<any> {
      const results = await this.cardTransactionService.findAndCount(id,{
        where: { card : id },
      });
      var points = 0;
      var pointsPlus = 0;
      var pointsMinus = 0;
      results[0].forEach(element => {
        console.log(points);

        if (element.action == 'PLUS') {
          pointsPlus = pointsPlus + element.amount;
        } else {
          pointsMinus = pointsMinus + element.amount;
          if (pointsMinus < 0) {
            pointsMinus = pointsMinus * -1;
          }
        }
      });
      points = pointsPlus - pointsMinus;
      if (points < 0) {
        points = points * -1;
      }
      console.log(points)
      var card = await this.cardService.findById(id);
      var data = {
        'points' : points,
        'card' : card
      };
      return data;
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN,RoleType.COMPANY_ADMIN)
    @ApiOperation({ title: 'Create card' })
    @ApiResponse({
      status: 201,
      description: 'The record has been successfully created.',
      type: CardDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() cardDTO: CardDTO): Promise<any> {
      try{
        cardDTO.createdBy =req.user["id"];
        const created = await this.cardService.save(cardDTO);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Card', created.id);
        return created;
      } catch(error){
        return error
      }
    }

    @Put('/')
    @Roles(RoleType.ADMIN,RoleType.COMPANY_ADMIN)
    @ApiOperation({ title: 'Update card' })
    @ApiResponse({
      status: 200,
      description: 'The record has been successfully updated.',
      type: CardDTO,
    })
    async put(@Req() req: Request, @Body() cardDTO: CardDTO): Promise<any> {
      try{
        cardDTO.lastModifiedBy =req.user["id"];
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Card', cardDTO.id);
        return await this.cardService.update(cardDTO);
      }catch(error){
        return error
      }
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

    @Put('chargecard')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create card' })
    @ApiResponse({
      status: 201,
      description: 'The record has been successfully created.',
      type: CardDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async chargeCard(@Req() req: Request, @Body() data: any): Promise<CardDTO> {
      const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
      var resualtSettings =  await this.settingService.findAndCount({
        skip: +pageRequest.page * pageRequest.size,
        take: +pageRequest.size,
        order: pageRequest.sort.asOrder(),
      });
      var cardTransactionDTO = new CardTransactionDTO ();
      cardTransactionDTO.amount = data.points;
      cardTransactionDTO.card = data.card.id;
      cardTransactionDTO.action = TransactionAction.PLUS;
      cardTransactionDTO.notes = "اضافة نقاط الى البطاقة ( شحن البطاقة )";
      cardTransactionDTO.createdBy = req.user["id"];
      const created = await this.cardTransactionService.save(cardTransactionDTO);
      return data.card;
    }

  }
