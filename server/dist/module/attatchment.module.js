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
const attatchment_controller_1 = require("../web/rest/attatchment.controller");
const attatchment_repository_1 = require("../repository/attatchment.repository");
const attatchment_service_1 = require("../service/attatchment.service");
let AttatchmentModule = class AttatchmentModule {
};
AttatchmentModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([attatchment_repository_1.AttatchmentRepository])],
        controllers: [attatchment_controller_1.AttatchmentController],
        providers: [attatchment_service_1.AttatchmentService],
        exports: [attatchment_service_1.AttatchmentService],
    })
], AttatchmentModule);
exports.AttatchmentModule = AttatchmentModule;
//# sourceMappingURL=attatchment.module.js.map