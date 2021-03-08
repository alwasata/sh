import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { InvoiceDTO } from '../../service/dto/invoice.dto';
import { InvoiceService } from '../../service/invoice.service';
import { CardTransactionService } from '../../service/card-transaction.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { CardTransactionDTO } from '../../service/dto/card-transaction.dto';
import { BenefitDTO } from '../../service/dto/benefit.dto';
import { BenefitRequestService } from '../../service/benefit-request.service';
import { HospitalService } from '../../service/hospital.service';
import { BenefitService } from '../../service/benefit.service';
import { InvoiceBenefitsService} from '../../service/invoice-benefits.service';
import { InvoiceBenefitsDTO } from '../../service/dto/invoice-benefits.dto';
import { CardService } from '../../service/card.service';
// import { CardService } from '../../service/card.service';

@Controller('api/invoices')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('invoices')
export class InvoiceController {
  logger = new Logger('InvoiceController');

  constructor(
    private readonly invoiceService: InvoiceService,
    private readonly benefitService: BenefitService,
    private readonly cardTransactionService: CardTransactionService,
    private readonly cardService: CardService,
    private readonly benefitRequestService: BenefitRequestService,
    private readonly hospitalService: HospitalService,
    private readonly invoiceBenefitsService: InvoiceBenefitsService,
    ) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
      status: 200,
      description: 'List all records',
      type: InvoiceDTO,
    })
    async getAll(@Req() req: Request): Promise<InvoiceDTO[]> {
      const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
      var hospital = {};
      if(req.user.authorities.includes('ROLE_ADMIN') == true) {
        hospital = "all";
      } else {
        hospital = await this.hospitalService.getHosbitalIdForUser(req.user.id);
      }

      const [results, count] = await this.invoiceService.findAndCount(hospital,{
        skip: +pageRequest.page * pageRequest.size,
        take: +pageRequest.size,
        order: pageRequest.sort.asOrder(),
      });
      HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
      return results;
      // console.log(results);
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

    @Get('search/:id')
    @Roles(RoleType.USER)
    @ApiResponse({
      status: 200,
      description: 'The found record',
      type: [InvoiceDTO, CardTransactionDTO],
    })
    async search(@Req() req: Request, @Param('id') id: string): Promise<object> {
      var cardInfo = await this.cardTransactionService.findByCardNo(id);
      // console.log(cardInfo);

      const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
      var hospital = "";
      if(req.user.authorities.includes('ROLE_ADMIN') == true) {
        hospital = "all";
      } else {
        hospital = await this.hospitalService.getHosbitalIdForUser(req.user.id);
      }
      const [benefit, count] = await this.benefitRequestService.findAndCount(hospital,{
        where : { benefitStatus : "APPROVED" },
        skip: +pageRequest.page * pageRequest.size,
        take: +pageRequest.size,
        order: pageRequest.sort.asOrder(),
      });
      HeaderUtil.addPaginationHeaders(req.res, new Page(benefit, count, pageRequest));
      // console.log(cardInfo);
      var data = {}
      if(cardInfo[0] == 0) {
        data = "";
        console.log("hi");
      } else {
        data = {
          "benefit"  : benefit,
          "cardInfo" : cardInfo
        }
      }
      return data;
    }

    @Get('getbenefit/:id')
    @Roles(RoleType.USER)
    @ApiResponse({
      status: 200,
      description: 'The found record',
      type: BenefitDTO,
    })
    async getBenefit(@Req() req: Request, @Param('id') id: string): Promise<BenefitDTO> {
      var resualt = await this.benefitService.findById(id);
      return resualt;
    }

    @PostMethod('saveinvoice')
    @Roles(RoleType.USER)
    @ApiOperation({ title: 'Create invoice' })
    @ApiResponse({
      status: 201,
      description: 'The record has been successfully created.',
      type: InvoiceDTO,
    })

    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async saveInvoice(@Req() req: Request, @Body() data): Promise<InvoiceDTO> {
      var cardTransactionDTO = new CardTransactionDTO ();
      cardTransactionDTO.pointsAmount = data.cardTransaction.pointsAmount;
      cardTransactionDTO.amount = data.cardTransaction.amount;
      cardTransactionDTO.card   = data.cardTransaction.card;
      cardTransactionDTO.action = data.cardTransaction.action;
      cardTransactionDTO.createdBy = req.user.id;
      const created = await this.cardTransactionService.save(cardTransactionDTO);
      var hospital = await this.hospitalService.getHosbitalIdForUser(req.user.id);
      data.invoice.hospital = hospital;
      data.invoice.createdBy = req.user.id;
      data.invoice.cardTransaction = created.id;
      const createdInvoice = await this.invoiceService.save(data.invoice);
      data.invoiceBenefit.forEach(element => {
        var invoiceBenefitDTO = new InvoiceBenefitsDTO();
        invoiceBenefitDTO.invoice  = createdInvoice;
        invoiceBenefitDTO.benefit  = element.id;
        invoiceBenefitDTO.quantity = element.quantity;
        invoiceBenefitDTO.cost   = element.price;
        invoiceBenefitDTO.total  = element.totalPrice;
        invoiceBenefitDTO.pointsCost  = element.points;
        this.invoiceBenefitsService.save(invoiceBenefitDTO);
      });
      return createdInvoice;
    }


    @PostMethod('checkbenefit')
    @Roles(RoleType.USER)
    @ApiOperation({ title: 'Create invoice' })
    @ApiResponse({
      status: 201,
      description: 'The record has been successfully created.',
      type: InvoiceDTO,
    })

    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async checkBenefit(@Req() req: Request, @Body() data): Promise<InvoiceDTO> {
      // console.log(data);
      const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
      const results = await this.invoiceService.findByInvoice({
        where : { mainInvoice : data.invoice},
        // skip: +pageRequest.page * pageRequest.size,
        // take: +pageRequest.size,
        order: pageRequest.sort.asOrder(),
      });
      // console.log(data.benefits);
      var count = 0;
      for await (const element of results[0]) {
        console.log(element.id);
        // console.log(data.benefits)
        const benefit = await this.invoiceBenefitsService.findAndCount({
          where : {
            // benefit : data.benefits.id,
            invoice : "305928e3-ec51-4120-96b6-191a577366e5",
          },
          skip: +pageRequest.page * pageRequest.size,
          take: +pageRequest.size,
          order: pageRequest.sort.asOrder(),
        });
        count = count + benefit.quantity;
        console.log(benefit);
      }
      // results[0].forEach(element => {
      //   console.log(element);

      //   // console.log(benefit);
      //   // count = count + benefit.quantity;
      // });
      console.log(count);
      return data;
    }
  }
