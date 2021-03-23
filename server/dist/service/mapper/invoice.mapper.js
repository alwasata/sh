"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const invoice_entity_1 = require("../../domain/invoice.entity");
const invoice_dto_1 = require("../dto/invoice.dto");
/**
 * A Invoice mapper object.
 */
class InvoiceMapper {
    static fromDTOtoEntity(entityDTO) {
        if (!entityDTO) {
            return;
        }
        const entity = new invoice_entity_1.Invoice();
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
        const entityDTO = new invoice_dto_1.InvoiceDTO();
        const fields = Object.getOwnPropertyNames(entity);
        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });
        return entityDTO;
    }
}
exports.InvoiceMapper = InvoiceMapper;
//# sourceMappingURL=invoice.mapper.js.map