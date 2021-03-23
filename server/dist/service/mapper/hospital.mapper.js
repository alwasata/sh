"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hospital_entity_1 = require("../../domain/hospital.entity");
const hospital_dto_1 = require("../dto/hospital.dto");
/**
 * A Hospital mapper object.
 */
class HospitalMapper {
    static fromDTOtoEntity(entityDTO) {
        if (!entityDTO) {
            return;
        }
        const entity = new hospital_entity_1.Hospital();
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
        const entityDTO = new hospital_dto_1.HospitalDTO();
        const fields = Object.getOwnPropertyNames(entity);
        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });
        return entityDTO;
    }
}
exports.HospitalMapper = HospitalMapper;
//# sourceMappingURL=hospital.mapper.js.map