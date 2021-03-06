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
exports.AccountController = void 0;
var common_1 = require("@nestjs/common");
var security_1 = require("../../security");
var password_change_dto_1 = require("../../service/dto/password-change.dto");
var user_dto_1 = require("../../service/dto/user.dto");
var logging_interceptor_1 = require("../../client/interceptors/logging.interceptor");
var swagger_1 = require("@nestjs/swagger");
var AccountController = /** @class */ (function () {
    function AccountController(authService) {
        this.authService = authService;
        this.logger = new common_1.Logger('AccountController');
    }
    AccountController.prototype.registerAccount = function (req, userDTO) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.authService.registerNewUser(userDTO)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AccountController.prototype.activateAccount = function (key, res) {
        return res.sendStatus(500);
    };
    AccountController.prototype.isAuthenticated = function (req) {
        var user = req.user;
        return user.login;
    };
    AccountController.prototype.getAccount = function (req) {
        return __awaiter(this, void 0, Promise, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = req.user;
                        return [4 /*yield*/, this.authService.getAccount(user.id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AccountController.prototype.saveAccount = function (req, newUserInfo) {
        return __awaiter(this, void 0, Promise, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = req.user;
                        return [4 /*yield*/, this.authService.updateUserSettings(user.login, newUserInfo)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AccountController.prototype.changePassword = function (req, passwordChange) {
        return __awaiter(this, void 0, Promise, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = req.user;
                        return [4 /*yield*/, this.authService.changePassword(user.login, passwordChange.currentPassword, passwordChange.newPassword)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AccountController.prototype.requestPasswordReset = function (req, email, res) {
        return res.sendStatus(500);
    };
    AccountController.prototype.finishPasswordReset = function (req, keyAndPassword, res) {
        return res.sendStatus(500);
    };
    __decorate([
        common_1.Post('/register'),
        swagger_1.ApiOperation({ title: 'Register user' }),
        swagger_1.ApiResponse({
            status: 201,
            description: 'Registered user',
            type: user_dto_1.UserDTO
        }),
        __param(0, common_1.Req()), __param(1, common_1.Body())
    ], AccountController.prototype, "registerAccount");
    __decorate([
        common_1.Get('/activate'),
        swagger_1.ApiBearerAuth(),
        common_1.UseGuards(security_1.AuthGuard, security_1.RolesGuard),
        security_1.Roles(security_1.RoleType.ADMIN),
        swagger_1.ApiOperation({ title: 'Activate an account' }),
        swagger_1.ApiResponse({
            status: 200,
            description: 'activated'
        }),
        __param(0, common_1.Param()), __param(1, common_1.Res())
    ], AccountController.prototype, "activateAccount");
    __decorate([
        common_1.Get('/authenticate'),
        swagger_1.ApiBearerAuth(),
        common_1.UseGuards(security_1.AuthGuard),
        swagger_1.ApiOperation({ title: 'Check if the user is authenticated' }),
        swagger_1.ApiResponse({
            status: 200,
            description: 'login authenticated'
        }),
        __param(0, common_1.Req())
    ], AccountController.prototype, "isAuthenticated");
    __decorate([
        common_1.Get('/account'),
        swagger_1.ApiBearerAuth(),
        common_1.UseGuards(security_1.AuthGuard),
        swagger_1.ApiOperation({ title: 'Get the current user.' }),
        swagger_1.ApiResponse({
            status: 200,
            description: 'user retrieved'
        }),
        __param(0, common_1.Req())
    ], AccountController.prototype, "getAccount");
    __decorate([
        common_1.Post('/account'),
        swagger_1.ApiBearerAuth(),
        common_1.UseGuards(security_1.AuthGuard),
        swagger_1.ApiOperation({ title: 'Update the current user information' }),
        swagger_1.ApiResponse({
            status: 201,
            description: 'user info updated',
            type: user_dto_1.UserDTO
        }),
        __param(0, common_1.Req()), __param(1, common_1.Body())
    ], AccountController.prototype, "saveAccount");
    __decorate([
        common_1.Post('/account/change-password'),
        swagger_1.ApiBearerAuth(),
        common_1.UseGuards(security_1.AuthGuard),
        swagger_1.ApiOperation({ title: 'Change current password' }),
        swagger_1.ApiResponse({
            status: 201,
            description: 'user password changed',
            type: password_change_dto_1.PasswordChangeDTO
        }),
        __param(0, common_1.Req()), __param(1, common_1.Body())
    ], AccountController.prototype, "changePassword");
    __decorate([
        common_1.Post('/account/reset-password/init'),
        swagger_1.ApiBearerAuth(),
        common_1.UseGuards(security_1.AuthGuard),
        swagger_1.ApiOperation({ title: 'Send an email to reset the password of the user' }),
        swagger_1.ApiResponse({
            status: 201,
            description: 'mail to reset password sent',
            type: 'string'
        }),
        __param(0, common_1.Req()), __param(1, common_1.Body()), __param(2, common_1.Res())
    ], AccountController.prototype, "requestPasswordReset");
    __decorate([
        common_1.Post('/account/reset-password/finish'),
        swagger_1.ApiBearerAuth(),
        common_1.UseGuards(security_1.AuthGuard),
        swagger_1.ApiOperation({ title: 'Finish to reset the password of the user' }),
        swagger_1.ApiResponse({
            status: 201,
            description: 'password reset',
            type: 'string'
        }),
        __param(0, common_1.Req()), __param(1, common_1.Body()), __param(2, common_1.Res())
    ], AccountController.prototype, "finishPasswordReset");
    AccountController = __decorate([
        common_1.Controller('api'),
        common_1.UseInterceptors(logging_interceptor_1.LoggingInterceptor),
        swagger_1.ApiUseTags('account-resource')
    ], AccountController);
    return AccountController;
}());
exports.AccountController = AccountController;
