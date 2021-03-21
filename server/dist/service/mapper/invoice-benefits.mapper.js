"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const invoice_benefits_entity_1 = require("../../domain/invoice-benefits.entity");
const invoice_benefits_dto_1 = require("../dto/invoice-benefits.dto");
/**
 * A InvoiceBenefits mapper object.
 */
class InvoiceBenefitsMapper {
    static fromDTOtoEntity(entityDTO) {
        if (!entityDTO) {
            return;
        }
        const entity = new invoice_benefits_entity_1.InvoiceBenefits();
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
        const entityDTO = new invoice_benefits_dto_1.InvoiceBenefitsDTO();
        const fields = Object.getOwnPropertyNames(entity);
        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });
        return entityDTO;
    }
}
exports.InvoiceBenefitsMapper = InvoiceBenefitsMapper;
//# sourceMappingURL=invoice-benefits.mapper.js.map