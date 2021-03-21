"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const benefit_request_entity_1 = require("../../domain/benefit-request.entity");
const benefit_request_dto_1 = require("../dto/benefit-request.dto");
/**
 * A BenefitRequest mapper object.
 */
class BenefitRequestMapper {
    static fromDTOtoEntity(entityDTO) {
        if (!entityDTO) {
            return;
        }
        const entity = new benefit_request_entity_1.BenefitRequest();
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
        const entityDTO = new benefit_request_dto_1.BenefitRequestDTO();
        const fields = Object.getOwnPropertyNames(entity);
        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });
        return entityDTO;
    }
}
exports.BenefitRequestMapper = BenefitRequestMapper;
//# sourceMappingURL=benefit-request.mapper.js.map