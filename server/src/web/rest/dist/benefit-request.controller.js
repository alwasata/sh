"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.BenefitRequestController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var benefit_request_dto_1 = require("../../service/dto/benefit-request.dto");
var pagination_entity_1 = require("../../domain/base/pagination.entity");
var security_1 = require("../../security");
var header_util_1 = require("../../client/header-util");
var logging_interceptor_1 = require("../../client/interceptors/logging.interceptor");
var benefit_status_1 = require("../../domain/enumeration/benefit-status");
var BenefitRequestController = /** @class */ (function () {
    function BenefitRequestController(benefitRequestService, hospitalService) {
        this.benefitRequestService = benefitRequestService;
        this.hospitalService = hospitalService;
        this.logger = new common_1.Logger('BenefitRequestController');
    }
    BenefitRequestController.prototype.getAll = function (req) {
        return __awaiter(this, void 0, Promise, function () {
            var pageRequest, hospital, _a, results, count;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        pageRequest = new pagination_entity_1.PageRequest(req.query.page, req.query.size, req.query.sort);
                        hospital = "";
                        if (!(req.user["authorities"].includes('ROLE_ADMIN') == true)) return [3 /*break*/, 1];
                        hospital = "all";
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.hospitalService.getHosbitalIdForUser(req.user["id"])];
                    case 2:
                        hospital = _b.sent();
                        _b.label = 3;
                    case 3: return [4 /*yield*/, this.benefitRequestService.findAndCount(hospital, {
                            skip: +pageRequest.page * pageRequest.size,
                            take: +pageRequest.size,
                            order: pageRequest.sort.asOrder()
                        })];
                    case 4:
                        _a = _b.sent(), results = _a[0], count = _a[1];
                        header_util_1.HeaderUtil.addPaginationHeaders(req.res, new pagination_entity_1.Page(results, count, pageRequest));
                        return [2 /*return*/, results];
                }
            });
        });
    };
    BenefitRequestController.prototype.getOne = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.benefitRequestService.findById(id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BenefitRequestController.prototype.post = function (req, benefitRequestDTO) {
        return __awaiter(this, void 0, Promise, function () {
            var value, hospital_id, created;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        value = process.env.POINT_COST;
                        // benefitRequestDTO.pointsCost = (benefitRequestDTO.cost * value);
                        benefitRequestDTO.benefitStatus = benefit_status_1.BenefitStatus.PENDING;
                        if (!(req.user["authorities"].includes('ROLE_HOSPITAL_ADMIN') == true)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.hospitalService.getHosbitalIdForUser(req.user["id"])];
                    case 1:
                        hospital_id = _a.sent();
                        benefitRequestDTO.hospital = hospital_id;
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.benefitRequestService.save(benefitRequestDTO)];
                    case 3:
                        created = _a.sent();
                        header_util_1.HeaderUtil.addEntityCreatedHeaders(req.res, 'BenefitRequest', created.id);
                        return [2 /*return*/, created];
                }
            });
        });
    };
    BenefitRequestController.prototype.put = function (req, benefitRequestDTO) {
        return __awaiter(this, void 0, Promise, function () {
            var value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // you can't modify Benefit Request if its not in PENDING status
                        // if (benefitRequestDTO.benefitStatus == BenefitStatus.PENDING) {
                        header_util_1.HeaderUtil.addEntityCreatedHeaders(req.res, 'BenefitRequest', benefitRequestDTO.id);
                        value = process.env.POINT_COST;
                        // benefitRequestDTO.pointsCost = (benefitRequestDTO.cost * value);
                        return [4 /*yield*/, this.benefitRequestService.update(benefitRequestDTO)];
                    case 1:
                    // benefitRequestDTO.benefitStatus = BenefitStatus.PENDING;
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BenefitRequestController.prototype.deleteById = function (req, id) {
        return __awaiter(this, void 0, Promise, function () {
            var benefitRequestDTO;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.benefitRequestService.findById(id)];
                    case 1:
                        benefitRequestDTO = _a.sent();
                        if (!(benefitRequestDTO.benefitStatus == benefit_status_1.BenefitStatus.PENDING)) return [3 /*break*/, 3];
                        header_util_1.HeaderUtil.addEntityDeletedHeaders(req.res, 'BenefitRequest', id);
                        return [4 /*yield*/, this.benefitRequestService.deleteById(id)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: throw new common_1.HttpException("Benefit Request Can't be deleted.", common_1.HttpStatus.FORBIDDEN);
                }
            });
        });
    };
    __decorate([
        common_1.Get('/'),
        security_1.Roles(security_1.RoleType.ADMIN),
        swagger_1.ApiResponse({
            status: 200,
            description: 'List all records',
            type: benefit_request_dto_1.BenefitRequestDTO
        }),
        __param(0, common_1.Req())
    ], BenefitRequestController.prototype, "getAll");
    __decorate([
        common_1.Get('/:id'),
        security_1.Roles(security_1.RoleType.ADMIN),
        swagger_1.ApiResponse({
            status: 200,
            description: 'The found record',
            type: benefit_request_dto_1.BenefitRequestDTO
        }),
        __param(0, common_1.Param('id'))
    ], BenefitRequestController.prototype, "getOne");
    __decorate([
        common_1.Post('/'),
        security_1.Roles(security_1.RoleType.ADMIN),
        swagger_1.ApiOperation({ title: 'Create benefitRequest' }),
        swagger_1.ApiResponse({
            status: 201,
            description: 'The record has been successfully created.',
            type: benefit_request_dto_1.BenefitRequestDTO
        }),
        swagger_1.ApiResponse({ status: 403, description: 'Forbidden.' }),
        __param(0, common_1.Req()), __param(1, common_1.Body())
    ], BenefitRequestController.prototype, "post");
    __decorate([
        common_1.Put('/'),
        security_1.Roles(security_1.RoleType.ADMIN),
        swagger_1.ApiOperation({ title: 'Update benefitRequest' }),
        swagger_1.ApiResponse({
            status: 200,
            description: 'The record has been successfully updated.',
            type: benefit_request_dto_1.BenefitRequestDTO
        }),
        swagger_1.ApiResponse({
            status: common_1.HttpStatus.FORBIDDEN,
            description: "Benefit Request Can't be modified.",
            type: {
                statusCode: common_1.HttpStatus.FORBIDDEN,
                Message: "Benefit Request Can't be modified."
            }
        }),
        __param(0, common_1.Req()), __param(1, common_1.Body())
    ], BenefitRequestController.prototype, "put");
    __decorate([
        common_1.Delete('/:id'),
        security_1.Roles(security_1.RoleType.ADMIN),
        swagger_1.ApiOperation({ title: 'Delete benefitRequest' }),
        swagger_1.ApiResponse({
            status: 204,
            description: 'The record has been successfully deleted.'
        }),
        swagger_1.ApiResponse({
            status: common_1.HttpStatus.FORBIDDEN,
            description: "Benefit Request Can't be deleted.",
            type: {
                statusCode: common_1.HttpStatus.FORBIDDEN,
                Message: "Benefit Request Can't be deleted."
            }
        }),
        __param(0, common_1.Req()), __param(1, common_1.Param('id'))
    ], BenefitRequestController.prototype, "deleteById");
    BenefitRequestController = __decorate([
        common_1.Controller('api/benefit-requests'),
        common_1.UseGuards(security_1.AuthGuard, security_1.RolesGuard),
        common_1.UseInterceptors(logging_interceptor_1.LoggingInterceptor),
        swagger_1.ApiBearerAuth(),
        swagger_1.ApiUseTags('benefit-requests')
    ], BenefitRequestController);
    return BenefitRequestController;
}());
exports.BenefitRequestController = BenefitRequestController;
