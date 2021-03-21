"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attatchment_entity_1 = require("../../domain/attatchment.entity");
const attatchment_dto_1 = require("../dto/attatchment.dto");
/**
 * A Attatchment mapper object.
 */
class AttatchmentMapper {
    static fromDTOtoEntity(entityDTO) {
        if (!entityDTO) {
            return;
        }
        const entity = new attatchment_entity_1.Attatchment();
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
        const entityDTO = new attatchment_dto_1.AttatchmentDTO();
        const fields = Object.getOwnPropertyNames(entity);
        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });
        return entityDTO;
    }
}
exports.AttatchmentMapper = AttatchmentMapper;
//# sourceMappingURL=attatchment.mapper.js.map