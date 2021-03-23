"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const card_entity_1 = require("../../domain/card.entity");
const card_dto_1 = require("../dto/card.dto");
/**
 * A Card mapper object.
 */
class CardMapper {
    static fromDTOtoEntity(entityDTO) {
        if (!entityDTO) {
            return;
        }
        const entity = new card_entity_1.Card();
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
        const entityDTO = new card_dto_1.CardDTO();
        const fields = Object.getOwnPropertyNames(entity);
        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });
        return entityDTO;
    }
}
exports.CardMapper = CardMapper;
//# sourceMappingURL=card.mapper.js.map