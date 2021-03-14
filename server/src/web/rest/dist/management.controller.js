"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ManagementController = void 0;
var common_1 = require("@nestjs/common");
var logging_interceptor_1 = require("../../client/interceptors/logging.interceptor");
var swagger_1 = require("@nestjs/swagger");
var ManagementController = /** @class */ (function () {
    function ManagementController() {
        this.logger = new common_1.Logger('ManagementController');
    }
    ManagementController.prototype.info = function () {
        return {
            'activeProfiles': 'no',
            'display-ribbon-on-profiles': 'no'
        };
    };
    __decorate([
        swagger_1.ApiExcludeEndpoint(),
        common_1.Get('/info'),
        swagger_1.ApiOperation({ title: 'Microservice Info' }),
        swagger_1.ApiResponse({
            status: 200,
            description: 'Check if the microservice is up'
        })
    ], ManagementController.prototype, "info");
    ManagementController = __decorate([
        common_1.Controller('management'),
        common_1.UseInterceptors(logging_interceptor_1.LoggingInterceptor),
        swagger_1.ApiUseTags('management-controller')
    ], ManagementController);
    return ManagementController;
}());
exports.ManagementController = ManagementController;
