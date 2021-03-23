"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const invoice_dto_1 = require("../../service/dto/invoice.dto");
const invoice_service_1 = require("../../service/invoice.service");
const card_transaction_service_1 = require("../../service/card-transaction.service");
const pagination_entity_1 = require("../../domain/base/pagination.entity");
const security_1 = require("../../security");
const header_util_1 = require("../../client/header-util");
const logging_interceptor_1 = require("../../client/interceptors/logging.interceptor");
const card_transaction_dto_1 = require("../../service/dto/card-transaction.dto");
const benefit_dto_1 = require("../../service/dto/benefit.dto");
const benefit_request_service_1 = require("../../service/benefit-request.service");
const hospital_service_1 = require("../../service/hospital.service");
const benefit_service_1 = require("../../service/benefit.service");
const invoice_benefits_service_1 = require("../../service/invoice-benefits.service");
const invoice_benefits_dto_1 = require("../../service/dto/invoice-benefits.dto");
const card_service_1 = require("../../service/card.service");
const setting_service_1 = require("../../service/setting.service");
const transaction_action_1 = require("../../domain/enumeration/transaction-action");
const invoice_status_1 = require("../../domain/enumeration/invoice-status");
let InvoiceController = class InvoiceController {
    constructor(invoiceService, benefitService, cardTransactionService, cardService, benefitRequestService, hospitalService, invoiceBenefitsService, settingService) {
        this.invoiceService = invoiceService;
        this.benefitService = benefitService;
        this.cardTransactionService = cardTransactionService;
        this.cardService = cardService;
        this.benefitRequestService = benefitRequestService;
        this.hospitalService = hospitalService;
        this.invoiceBenefitsService = invoiceBenefitsService;
        this.settingService = settingService;
        this.logger = new common_1.Logger('InvoiceController');
    }
    async getAll(req, search) {
        const pageRequest = new pagination_entity_1.PageRequest(req.query.page, req.query.size, req.query.sort);
        var hospital;
        if (req.user["authorities"].includes('ROLE_ADMIN') == true) {
            hospital = "all";
        }
        else {
            hospital = await this.hospitalService.getHosbitalIdForUser(req.user["id"]);
            hospital = hospital["hospital_id"];
        }
        const [results, count] = await this.invoiceService.findAndCount(search, hospital, {
            skip: +pageRequest.page * pageRequest.size,
            take: +pageRequest.size,
            order: pageRequest.sort.asOrder(),
        });
        header_util_1.HeaderUtil.addPaginationHeaders(req.res, new pagination_entity_1.Page(results, count, pageRequest));
        return results;
        // console.log(results);
    }
    async getAllByStatus(req) {
        const pageRequest = new pagination_entity_1.PageRequest(req.query.page, req.query.size, req.query.sort);
        var hospital;
        if (req.user["authorities"].includes('ROLE_ADMIN') == true) {
            hospital = "all";
        }
        else {
            hospital = await this.hospitalService.getHosbitalIdForUser(req.user["id"]);
            hospital = hospital["hospital_id"];
        }
        const [results, count] = await this.invoiceService.getAll();
        header_util_1.HeaderUtil.addPaginationHeaders(req.res, new pagination_entity_1.Page(results, count, pageRequest));
        return results;
    }
    async getOne(id) {
        return await this.invoiceService.findById(id);
    }
    async post(req, invoiceDTO) {
        const created = await this.invoiceService.save(invoiceDTO);
        header_util_1.HeaderUtil.addEntityCreatedHeaders(req.res, 'Invoice', created.id);
        return created;
    }
    async put(req, invoiceDTO) {
        header_util_1.HeaderUtil.addEntityCreatedHeaders(req.res, 'Invoice', invoiceDTO.id);
        return await this.invoiceService.update(invoiceDTO);
    }
    async deleteById(req, id) {
        var invoice = await this.invoiceService.findById(id);
        var cardTransaction = await this.cardTransactionService.findById(invoice.cardTransaction.id);
        var cardTransactionDTO = new card_transaction_dto_1.CardTransactionDTO();
        cardTransactionDTO.createdBy = req.user["id"];
        cardTransactionDTO.card = cardTransaction.card;
        cardTransactionDTO.amount = cardTransaction.amount;
        cardTransactionDTO.pointsAmount = cardTransaction.pointsAmount;
        cardTransactionDTO.notes = "فاتورة رقم :" + invoice.invoiceNo + "تم الغائها";
        cardTransactionDTO.action = transaction_action_1.TransactionAction.PLUS;
        await this.cardTransactionService.save(cardTransactionDTO);
        var invoiceDTO = new invoice_dto_1.InvoiceDTO();
        invoiceDTO.id = id;
        invoiceDTO.invoiceStatus = invoice_status_1.InvoiceStatus.CANCELLED;
        invoiceDTO.notes = "فاتورة رقم :" + invoice.invoiceNo + "تم الغائها";
        header_util_1.HeaderUtil.addEntityCreatedHeaders(req.res, 'Invoice', invoiceDTO.id);
        return await this.invoiceService.update(invoiceDTO);
    }
    async search(req, id) {
        var cardInfo = await this.cardTransactionService.findByCardNo(id);
        const pageRequest = new pagination_entity_1.PageRequest(req.query.page, req.query.size, req.query.sort);
        var hospital;
        if (req.user["authorities"].includes('ROLE_ADMIN') == true) {
            hospital = "all";
        }
        else {
            hospital = await this.hospitalService.getHosbitalIdForUser(req.user["id"]);
            hospital = hospital["hospital_id"];
        }
        const [benefit, count] = await this.benefitRequestService.findAndCount(hospital, {
            where: { benefitStatus: "APPROVED" },
            skip: +pageRequest.page * pageRequest.size,
            take: +pageRequest.size,
            order: pageRequest.sort.asOrder(),
        });
        header_util_1.HeaderUtil.addPaginationHeaders(req.res, new pagination_entity_1.Page(benefit, count, pageRequest));
        var data = {};
        if (cardInfo[0] == []) {
            data = "";
        }
        else {
            data = {
                "benefit": benefit,
                "cardInfo": cardInfo
            };
        }
        return data;
    }
    async getBenefit(req, id) {
        var resualt = await this.benefitService.findById(id);
        const pageRequest = new pagination_entity_1.PageRequest(req.query.page, req.query.size, req.query.sort);
        var resualtSettings = await this.settingService.findAndCount({
            skip: +pageRequest.page * pageRequest.size,
            take: +pageRequest.size,
            order: pageRequest.sort.asOrder(),
        });
        var data = {
            'benefit': resualt,
            'setting': resualtSettings
        };
        return data;
    }
    async saveInvoice(req, data) {
        var e_1, _a;
        var cardTransactionDTO = new card_transaction_dto_1.CardTransactionDTO();
        cardTransactionDTO.pointsAmount = data.cardTransaction.pointsAmount;
        cardTransactionDTO.amount = data.cardTransaction.amount;
        cardTransactionDTO.card = data.cardTransaction.card;
        cardTransactionDTO.action = data.cardTransaction.action;
        cardTransactionDTO.createdBy = req.user["id"];
        const created = await this.cardTransactionService.save(cardTransactionDTO);
        var hospital_id = await this.hospitalService.getHosbitalIdForUser(req.user["id"]);
        var hospital = await this.hospitalService.findById(hospital_id["hospital_id"]);
        data.invoice.hospital = hospital;
        data.invoice.createdBy = req.user["id"];
        data.invoice.cardTransaction = created.id;
        const createdInvoice = await this.invoiceService.save(data.invoice);
        try {
            for (var _b = __asyncValues(data.invoiceBenefit), _c; _c = await _b.next(), !_c.done;) {
                const element = _c.value;
                const benefit = await this.benefitService.findById(element.id);
                var invoiceBenefitDTO = new invoice_benefits_dto_1.InvoiceBenefitsDTO();
                invoiceBenefitDTO.invoice = createdInvoice;
                invoiceBenefitDTO.benefit = benefit;
                invoiceBenefitDTO.quantity = element.quantity;
                invoiceBenefitDTO.cost = element.price;
                invoiceBenefitDTO.total = element.totalPrice;
                invoiceBenefitDTO.pointsCost = element.points;
                console.log(invoiceBenefitDTO);
                await this.invoiceBenefitsService.save(invoiceBenefitDTO);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) await _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return createdInvoice;
    }
    async checkBenefit(req, data) {
        var e_2, _a;
        const pageRequest = new pagination_entity_1.PageRequest(req.query.page, req.query.size, req.query.sort);
        const results = await this.invoiceService.findByInvoice({
            where: { mainInvoice: data.invoice },
            order: pageRequest.sort.asOrder(),
        });
        var count = 0;
        try {
            for (var _b = __asyncValues(results[0]), _c; _c = await _b.next(), !_c.done;) {
                const element = _c.value;
                const invoiceBenefit = await this.invoiceBenefitsService.findAndCount({
                    where: {
                        benefit: data.benefits.id,
                        invoice: element.id,
                    },
                    skip: +pageRequest.page * pageRequest.size,
                    take: +pageRequest.size,
                    order: pageRequest.sort.asOrder(),
                });
                if (invoiceBenefit != []) {
                    count = count + invoiceBenefit[0][0].quantity;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) await _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        var checkQuantity = true;
        if (data.benefits.returnQuantity + count > data.benefits.quantity) {
            checkQuantity = false;
        }
        return checkQuantity;
    }
};
__decorate([
    common_1.Get('/:search'),
    security_1.Roles(security_1.RoleType.USER),
    swagger_1.ApiResponse({
        status: 200,
        description: 'List all records',
        type: invoice_dto_1.InvoiceDTO,
    }),
    __param(0, common_1.Req()), __param(1, common_1.Param('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], InvoiceController.prototype, "getAll", null);
__decorate([
    common_1.Get('/getinvoices/staus'),
    security_1.Roles(security_1.RoleType.USER),
    swagger_1.ApiResponse({
        status: 200,
        description: 'List all records',
        type: invoice_dto_1.InvoiceDTO,
    }),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InvoiceController.prototype, "getAllByStatus", null);
__decorate([
    common_1.Get('/find/:id'),
    security_1.Roles(security_1.RoleType.USER),
    swagger_1.ApiResponse({
        status: 200,
        description: 'The found record',
        type: invoice_dto_1.InvoiceDTO,
    }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvoiceController.prototype, "getOne", null);
__decorate([
    common_1.Post('/'),
    security_1.Roles(security_1.RoleType.ADMIN),
    swagger_1.ApiOperation({ title: 'Create invoice' }),
    swagger_1.ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: invoice_dto_1.InvoiceDTO,
    }),
    swagger_1.ApiResponse({ status: 403, description: 'Forbidden.' }),
    __param(0, common_1.Req()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, invoice_dto_1.InvoiceDTO]),
    __metadata("design:returntype", Promise)
], InvoiceController.prototype, "post", null);
__decorate([
    common_1.Put('/'),
    security_1.Roles(security_1.RoleType.ADMIN),
    swagger_1.ApiOperation({ title: 'Update invoice' }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: invoice_dto_1.InvoiceDTO,
    }),
    __param(0, common_1.Req()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, invoice_dto_1.InvoiceDTO]),
    __metadata("design:returntype", Promise)
], InvoiceController.prototype, "put", null);
__decorate([
    common_1.Delete('/:id'),
    security_1.Roles(security_1.RoleType.USER),
    swagger_1.ApiOperation({ title: 'Delete invoice' }),
    swagger_1.ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    }),
    __param(0, common_1.Req()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], InvoiceController.prototype, "deleteById", null);
__decorate([
    common_1.Get('search/:id'),
    security_1.Roles(security_1.RoleType.USER),
    swagger_1.ApiResponse({
        status: 200,
        description: 'The found record',
    }),
    __param(0, common_1.Req()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], InvoiceController.prototype, "search", null);
__decorate([
    common_1.Get('getbenefit/:id'),
    security_1.Roles(security_1.RoleType.USER),
    swagger_1.ApiResponse({
        status: 200,
        description: 'The found record',
        type: benefit_dto_1.BenefitDTO,
    }),
    __param(0, common_1.Req()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], InvoiceController.prototype, "getBenefit", null);
__decorate([
    common_1.Post('saveinvoice'),
    security_1.Roles(security_1.RoleType.USER),
    swagger_1.ApiOperation({ title: 'Create invoice' }),
    swagger_1.ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: invoice_dto_1.InvoiceDTO,
    }),
    swagger_1.ApiResponse({ status: 403, description: 'Forbidden.' }),
    __param(0, common_1.Req()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], InvoiceController.prototype, "saveInvoice", null);
__decorate([
    common_1.Post('checkbenefit'),
    security_1.Roles(security_1.RoleType.USER),
    swagger_1.ApiOperation({ title: 'Create invoice' }),
    swagger_1.ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: invoice_dto_1.InvoiceDTO,
    }),
    swagger_1.ApiResponse({ status: 403, description: 'Forbidden.' }),
    __param(0, common_1.Req()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], InvoiceController.prototype, "checkBenefit", null);
InvoiceController = __decorate([
    common_1.Controller('api/invoices'),
    common_1.UseGuards(security_1.AuthGuard, security_1.RolesGuard),
    common_1.UseInterceptors(logging_interceptor_1.LoggingInterceptor),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiUseTags('invoices'),
    __metadata("design:paramtypes", [invoice_service_1.InvoiceService,
        benefit_service_1.BenefitService,
        card_transaction_service_1.CardTransactionService,
        card_service_1.CardService,
        benefit_request_service_1.BenefitRequestService,
        hospital_service_1.HospitalService,
        invoice_benefits_service_1.InvoiceBenefitsService,
        setting_service_1.SettingService])
], InvoiceController);
exports.InvoiceController = InvoiceController;
//# sourceMappingURL=invoice.controller.js.map