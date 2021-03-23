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
const card_controller_1 = require("../web/rest/card.controller");
const card_repository_1 = require("../repository/card.repository");
const card_service_1 = require("../service/card.service");
const card_transaction_module_1 = require("./card-transaction.module");
const setting_module_1 = require("./setting.module");
let CardModule = class CardModule {
};
CardModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([card_repository_1.CardRepository]), card_transaction_module_1.CardTransactionModule, setting_module_1.SettingModule],
        controllers: [card_controller_1.CardController],
        providers: [card_service_1.CardService],
        exports: [card_service_1.CardService],
    })
], CardModule);
exports.CardModule = CardModule;
//# sourceMappingURL=card.module.js.map