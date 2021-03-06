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
exports.__esModule = true;
exports.AuthController = void 0;
var common_1 = require("@nestjs/common");
var security_1 = require("../../security");
var logging_interceptor_1 = require("../../client/interceptors/logging.interceptor");
var swagger_1 = require("@nestjs/swagger");
var AuthController = /** @class */ (function () {
    function AuthController(authService) {
        this.authService = authService;
        this.logger = new common_1.Logger('AuthController');
    }
    AuthController.prototype.getAuthorities = function (req) {
        var user = req.user;
        return user.authorities;
    };
    __decorate([
        common_1.Get('/authorities'),
        swagger_1.ApiOperation({ title: 'Get the list of user roles' }),
        swagger_1.ApiResponse({
            status: 200,
            description: 'List all user roles',
            type: 'string',
            isArray: true
        }),
        security_1.Roles(security_1.RoleType.ADMIN),
        __param(0, common_1.Req())
    ], AuthController.prototype, "getAuthorities");
    AuthController = __decorate([
        common_1.Controller('api/users'),
        common_1.UseGuards(security_1.AuthGuard, security_1.RolesGuard),
        common_1.UseInterceptors(logging_interceptor_1.LoggingInterceptor),
        swagger_1.ApiBearerAuth(),
        swagger_1.ApiUseTags('auth-controller')
    ], AuthController);
    return AuthController;
}());
exports.AuthController = AuthController;
