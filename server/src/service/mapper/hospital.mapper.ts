import { Hospital } from '../../domain/hospital.entity';
import { HospitalDTO } from '../dto/hospital.dto';

/**
 * A Hospital mapper object.
 */
export class HospitalMapper {
    static fromDTOtoEntity(entityDTO: HospitalDTO): Hospital {
        if (!entityDTO) {
            return;
        }
        const entity = new Hospital();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach(field => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: Hospital): HospitalDTO {
        if (!entity) {
            return;
        }
        const entityDTO = new HospitalDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
