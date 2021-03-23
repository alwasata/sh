"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setting_entity_1 = require("../../domain/setting.entity");
const setting_dto_1 = require("../dto/setting.dto");
/**
 * A Setting mapper object.
 */
class SettingMapper {
    static fromDTOtoEntity(entityDTO) {
        if (!entityDTO) {
            return;
        }
        let entity = new setting_entity_1.Setting();
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
        let entityDTO = new setting_dto_1.SettingDTO();
        const fields = Object.getOwnPropertyNames(entity);
        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });
        return entityDTO;
    }
}
exports.SettingMapper = SettingMapper;
//# sourceMappingURL=setting.mapper.js.map