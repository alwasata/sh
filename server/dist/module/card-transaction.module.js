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
const card_transaction_controller_1 = require("../web/rest/card-transaction.controller");
const card_transaction_repository_1 = require("../repository/card-transaction.repository");
const card_transaction_service_1 = require("../service/card-transaction.service");
// import { CardModule} from './card.module';
let CardTransactionModule = class CardTransactionModule {
};
CardTransactionModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([card_transaction_repository_1.CardTransactionRepository])],
        controllers: [card_transaction_controller_1.CardTransactionController],
        providers: [card_transaction_service_1.CardTransactionService],
        exports: [card_transaction_service_1.CardTransactionService],
    })
], CardTransactionModule);
exports.CardTransactionModule = CardTransactionModule;
//# sourceMappingURL=card-transaction.module.js.map