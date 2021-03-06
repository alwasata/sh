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
import { SettingDTO } from '../../service/dto/setting.dto';
import { SettingService } from '../../service/setting.service';
import { TransactionAction } from '../../domain/enumeration/transaction-action';
import { InvoiceStatus } from '../../domain/enumeration/invoice-status';

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
    private readonly settingService: SettingService,
    ) {}

    @Get(`/getInvoicesWithStatus/:status/:dateFrom/:dateTo`)
    @Roles(RoleType.HOSPITAL_ADMIN)
    @ApiResponse({
      status: 200,
      type: InvoiceDTO
    })
    async getInvoicesWithStatus(@Req() req: Request, @Param('status') status: string, @Param('dateFrom') dateFrom: Date, @Param('dateTo') dateTo: Date): Promise<InvoiceDTO[]>{
      
      const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
      var hospital;
        console.log("Params = " + status + "Dateform = " + dateFrom + "Dateto" + dateTo);
        hospital = await this.hospitalService.getHosbitalIdForUser(req.user["id"]);
        hospital = hospital["hospital_id"];
        console.log("Hospital user = " + hospital);
        const [results, count] = await this.invoiceService.invoicesReport(status, hospital, dateFrom, dateTo,{
          skip: +pageRequest.page * pageRequest.size,
          take: +pageRequest.size,
          order: pageRequest.sort.asOrder(),
        });
        HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
        return results;
        return null;
      }


      @Get(`/getInvoicesWithStatusAdmin/:status/:hospital/:dateFrom/:dateTo`)
      @Roles(RoleType.ADMIN, RoleType.HOSPITAL_ADMIN)
      @ApiResponse({
        status: 200,
        type: InvoiceDTO
      })
      async getInvoicesWithStatusAdmin(@Req() req: Request, @Param('status') status: string, @Param('hospital') hospital: string, @Param('dateFrom') dateFrom: Date, @Param('dateTo') dateTo: Date): Promise<InvoiceDTO[]>{
        
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
          console.log("Params = " + status + "Dateform = " + dateFrom + "Dateto" + dateTo);
          console.log("Hospital user = " + hospital);
          const [results, count] = await this.invoiceService.invoicesReport(status, hospital, dateFrom, dateTo,{
            skip: +pageRequest.page * pageRequest.size,
            take: +pageRequest.size,
            order: pageRequest.sort.asOrder(),
          });
          HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
          return results;
          return null;
        }

    @Get('/:search')
    @Roles(RoleType.HOSPITAL_ADMIN,RoleType.ADMIN)
    @ApiResponse({
      status: 200,
      description: 'List all records',
      type: InvoiceDTO,
    })
    async getAll(@Req() req: Request, @Param('search') search: string): Promise<InvoiceDTO[]> {
      const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
      var hospital;
      if(req.user["authorities"].includes('ROLE_ADMIN') == true) {
        hospital = "all";
      } else {
        hospital = await this.hospitalService.getHosbitalIdForUser(req.user["id"]);
        hospital = hospital["hospital_id"];
      }

      const [results, count] = await this.invoiceService.findAndCount(search,hospital,{
        skip: +pageRequest.page * pageRequest.size,
        take: +pageRequest.size,
        order: pageRequest.sort.asOrder(),
      });
      HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
      return results;
      // console.log(results);
    }

    @Get('/getinvoices/staus')
    @Roles(RoleType.HOSPITAL_ADMIN,RoleType.ADMIN)
    @ApiResponse({
      status: 200,
      description: 'List all records',
      type: InvoiceDTO,
    })
    async getAllByStatus(@Req() req: Request): Promise<InvoiceDTO[]> {
      const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
      var hospital;
      if(req.user["authorities"].includes('ROLE_ADMIN') == true) {
        hospital = "all";
      } else {
        hospital = await this.hospitalService.getHosbitalIdForUser(req.user["id"]);
        hospital = hospital["hospital_id"];
      }
      const [results, count] = await this.invoiceService.getAll();
      HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
      return results;
    }

    @Get('/find/:id')
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
    @Roles(RoleType.HOSPITAL_ADMIN)
    @ApiOperation({ title: 'Create invoice' })
    @ApiResponse({
      status: 201,
      description: 'The record has been successfully created.',
      type: InvoiceDTO,
    })

    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() invoiceDTO: InvoiceDTO): Promise<InvoiceDTO> {
      try{
      const created = await this.invoiceService.save(invoiceDTO);
      HeaderUtil.addEntityCreatedHeaders(req.res, 'Invoice', created.id);
      return created;
      }catch(error){
        return error;
      }
    }

    @Put('/')
    @Roles(RoleType.HOSPITAL_ADMIN, RoleType.ADMIN)
    @ApiOperation({ title: 'Update invoice' })
    @ApiResponse({
      status: 200,
      description: 'The record has been successfully updated.',
      type: InvoiceDTO,
    })
    async put(@Req() req: Request, @Body() invoiceDTO: InvoiceDTO): Promise<InvoiceDTO> {
      HeaderUtil.addEntityCreatedHeaders(req.res, 'Invoice', invoiceDTO.id);
      invoiceDTO.lastModifiedBy = req.user["id"];
      return await this.invoiceService.update(invoiceDTO);
    }

    @Delete('/:id')
    @Roles(RoleType.HOSPITAL_ADMIN)
    @ApiOperation({ title: 'Delete invoice' })
    @ApiResponse({
      status: 204,
      description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: string): Promise<any> {
      var invoice = await this.invoiceService.findById(id);
      var cardTransaction = await this.cardTransactionService.findById(invoice.cardTransaction.id);

      const results = await this.invoiceService.findByInvoice(id);
      var total = invoice.total;
      var checkQuantity;
      checkQuantity = true;
      if(results.length != 0){
        for await (const element of results) {
          total = total - element.total;
        }
        if(total == 0) {
          return "error";
        }
        var cardTransactionDTO = new CardTransactionDTO();
        cardTransactionDTO.createdBy = req.user["id"];
        cardTransactionDTO.card = cardTransaction.card;
        cardTransactionDTO.amount = total;
        cardTransactionDTO.notes = "???????????? ?????? :"+invoice.invoiceNo+ "???? ?????????????? "+"???????? ?????? ?????? ???????????????? ?????????? ?????? ???????????? ????????????";
        cardTransactionDTO.action = TransactionAction.PLUS;
        await this.cardTransactionService.save(cardTransactionDTO);
      } else {
        var cardTransactionDTO = new CardTransactionDTO();
        cardTransactionDTO.createdBy = req.user["id"];
        cardTransactionDTO.card = cardTransaction.card;
        cardTransactionDTO.amount = cardTransaction.amount;
        cardTransactionDTO.notes = "???????????? ?????? :"+invoice.invoiceNo+ "???? ??????????????";
        cardTransactionDTO.action = TransactionAction.PLUS;
        await this.cardTransactionService.save(cardTransactionDTO);
      }
      var invoiceDTO = new InvoiceDTO();
      invoiceDTO.id = id;
      invoiceDTO.invoiceStatus = InvoiceStatus.CANCELLED;
      invoiceDTO.notes = "???????????? ?????? :"+invoice.invoiceNo+ "???? ??????????????";
      HeaderUtil.addEntityCreatedHeaders(req.res, 'Invoice', invoiceDTO.id);
      return await this.invoiceService.update(invoiceDTO);
    }

    @Get('search/:id')
    @Roles(RoleType.HOSPITAL_ADMIN)
    @ApiResponse({
      status: 200,
      description: 'The found record',
      // type: [InvoiceDTO, CardTransactionDTO],
    })
    async search(@Req() req: Request, @Param('id') id: string): Promise<any> {
      var cardInfo = await this.cardTransactionService.findByCardNo(id);
      const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
      var hospital;
      if(req.user["authorities"].includes('ROLE_ADMIN') == true) {
        hospital = "all";
      } else {
        hospital = await this.hospitalService.getHosbitalIdForUser(req.user["id"]);
        hospital = hospital["hospital_id"];
        console.log("the hospi =========== " + hospital);
      }
      const [benefit, count] = await this.benefitRequestService.findAndCount("false",hospital,{
        where : { benefitStatus : "APPROVED" },
        skip: +pageRequest.page * pageRequest.size,
        take: +pageRequest.size,
        order: pageRequest.sort.asOrder(),
      });
      HeaderUtil.addPaginationHeaders(req.res, new Page(benefit, count, pageRequest));
      var data = {}
      if(cardInfo[0] == []) {
        data = "";
      } else {
        data = {
          "benefit"  : benefit,
          "cardInfo" : cardInfo
        }
      }
      return data;
    }

    @Get('getbenefit/:id')
    @Roles(RoleType.HOSPITAL_ADMIN)
    @ApiResponse({
      status: 200,
      description: 'The found record',
      type: BenefitDTO,
    })
    async getBenefit(@Req() req: Request, @Param('id') id: string): Promise<any> {
      var resualt = await this.benefitService.findById(id);
      const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
      var resualtSettings =  await this.settingService.findAndCount({
        skip: +pageRequest.page * pageRequest.size,
        take: +pageRequest.size,
        order: pageRequest.sort.asOrder(),
      });
      var data = {
        'benefit' : resualt,
        'setting' : resualtSettings
      };
      return data;
    }

    @PostMethod('saveinvoice')
    @Roles(RoleType.HOSPITAL_ADMIN)
    @ApiOperation({ title: 'Create invoice' })
    @ApiResponse({
      status: 201,
      description: 'The record has been successfully created.',
      type: InvoiceDTO,
    })

    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async saveInvoice(@Req() req: Request, @Body() data): Promise<InvoiceDTO> {

      var cardTransactionDTO = new CardTransactionDTO ();
      cardTransactionDTO.amount = data.cardTransaction.amount;
      cardTransactionDTO.card   = data.cardTransaction.card;
      cardTransactionDTO.action = data.cardTransaction.action;
      cardTransactionDTO.notes = data.cardTransaction.notes;
      cardTransactionDTO.createdBy = req.user["id"];
      const created = await this.cardTransactionService.save(cardTransactionDTO);

      var hospital_id = await this.hospitalService.getHosbitalIdForUser(req.user["id"]);
      var hospital = await this.hospitalService.findById(hospital_id["hospital_id"]);
      data.invoice.invoiceStatus = InvoiceStatus.PENDING;
      data.invoice.hospital = hospital;
      data.invoice.createdBy = req.user["id"];
      data.invoice.cardTransaction = created.id;
      const createdInvoice = await this.invoiceService.save(data.invoice);

      for await (const element of data.invoiceBenefit) {
        const benefit = await this.benefitService.findById(element.id);
        var invoiceBenefitDTO = new InvoiceBenefitsDTO();
        invoiceBenefitDTO.invoice  = createdInvoice;
        invoiceBenefitDTO.benefit  = benefit;
        invoiceBenefitDTO.quantity = element.quantity;
        invoiceBenefitDTO.cost   = element.price;
        invoiceBenefitDTO.total  = element.totalPrice;
        invoiceBenefitDTO.pointsCost  = element.points;
        console.log(invoiceBenefitDTO);
        await this.invoiceBenefitsService.save(invoiceBenefitDTO);
      }
      return createdInvoice;
    }


    @PostMethod('checkbenefit')
    @Roles(RoleType.HOSPITAL_ADMIN)
    @ApiOperation({ title: 'Create invoice' })
    @ApiResponse({
      status: 201,
      description: 'The record has been successfully created.',
      type: InvoiceDTO,
    })

    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async checkBenefit(@Req() req: Request, @Body() data): Promise<any> {
      const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
      const results = await this.invoiceService.findByInvoice(data.invoice);
      var count = 0;

      var checkQuantity;
      checkQuantity = true;
      if(results[0] == 0){
        return checkQuantity;
      }

      for await (const element of results) {
        console.log(element.id);
        console.log(data.benefits.id);
        const invoiceBenefit = await this.invoiceBenefitsService.findAndCount({
          where : {
            benefit : data.benefits.id,
            invoice : element.id,
          },
          skip: +pageRequest.page * pageRequest.size,
          take: +pageRequest.size,
          order: pageRequest.sort.asOrder(),
        });
        if(invoiceBenefit[0] != 0){
          console.log(invoiceBenefit)
          count = count + invoiceBenefit[0][0].quantity;
        }
      }

      if(parseInt(data.benefits.returnQuantity)+count > data.benefits.quantity) {
        checkQuantity = " ???? ?????????? ?????? "+count+" ???? ????????????";
      }

      return checkQuantity;
    }
  }
