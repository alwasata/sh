"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const card_transaction_entity_1 = require("../../domain/card-transaction.entity");
const card_transaction_dto_1 = require("../dto/card-transaction.dto");
/**
 * A CardTransaction mapper object.
 */
class CardTransactionMapper {
    static fromDTOtoEntity(entityDTO) {
        if (!entityDTO) {
            return;
        }
        const entity = new card_transaction_entity_1.CardTransaction();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach(field => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }
    static fromEntityToDTO(entity) {
        if (!entity) {
            return;
        }
        const entityDTO = new card_transaction_dto_1.CardTransactionDTO();
        const fields = Object.getOwnPropertyNames(entity);
        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });
        return entityDTO;
    }
}
exports.CardTransactionMapper = CardTransactionMapper;
//# sourceMappingURL=card-transaction.mapper.js.map