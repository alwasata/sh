"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_entity_1 = require("../../domain/category.entity");
const category_dto_1 = require("../dto/category.dto");
/**
 * A Category mapper object.
 */
class CategoryMapper {
    static fromDTOtoEntity(entityDTO) {
        if (!entityDTO) {
            return;
        }
        const entity = new category_entity_1.Category();
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
        const entityDTO = new category_dto_1.CategoryDTO();
        const fields = Object.getOwnPropertyNames(entity);
        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });
        return entityDTO;
    }
}
exports.CategoryMapper = CategoryMapper;
//# sourceMappingURL=category.mapper.js.map