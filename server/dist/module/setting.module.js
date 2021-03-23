"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const setting_controller_1 = require("../web/rest/setting.controller");
const setting_repository_1 = require("../repository/setting.repository");
const setting_service_1 = require("../service/setting.service");
let SettingModule = class SettingModule {
};
SettingModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([setting_repository_1.SettingRepository])],
        controllers: [setting_controller_1.SettingController],
        providers: [setting_service_1.SettingService],
        exports: [setting_service_1.SettingService]
    })
], SettingModule);
exports.SettingModule = SettingModule;
//# sourceMappingURL=setting.module.js.map