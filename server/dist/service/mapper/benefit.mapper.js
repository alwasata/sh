"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const benefit_entity_1 = require("../../domain/benefit.entity");
const benefit_dto_1 = require("../dto/benefit.dto");
/**
 * A Benefit mapper object.
 */
class BenefitMapper {
    static fromDTOtoEntity(entityDTO) {
        if (!entityDTO) {
            return;
        }
        const entity = new benefit_entity_1.Benefit();
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
        const entityDTO = new benefit_dto_1.BenefitDTO();
        const fields = Object.getOwnPropertyNames(entity);
        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });
        return entityDTO;
    }
}
exports.BenefitMapper = BenefitMapper;
//# sourceMappingURL=benefit.mapper.js.map