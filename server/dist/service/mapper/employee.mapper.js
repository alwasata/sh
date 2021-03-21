"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const employee_entity_1 = require("../../domain/employee.entity");
const employee_dto_1 = require("../dto/employee.dto");
/**
 * A Employee mapper object.
 */
class EmployeeMapper {
    static fromDTOtoEntity(entityDTO) {
        if (!entityDTO) {
            return;
        }
        const entity = new employee_entity_1.Employee();
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
        const entityDTO = new employee_dto_1.EmployeeDTO();
        const fields = Object.getOwnPropertyNames(entity);
        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });
        return entityDTO;
    }
}
exports.EmployeeMapper = EmployeeMapper;
//# sourceMappingURL=employee.mapper.js.map