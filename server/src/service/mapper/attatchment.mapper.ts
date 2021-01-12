import { Attatchment } from '../../domain/attatchment.entity';
import { AttatchmentDTO } from '../dto/attatchment.dto';

/**
 * A Attatchment mapper object.
 */
export class AttatchmentMapper {
    static fromDTOtoEntity(entityDTO: AttatchmentDTO): Attatchment {
        if (!entityDTO) {
            return;
        }
        const entity = new Attatchment();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach(field => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: Attatchment): AttatchmentDTO {
        if (!entity) {
            return;
        }
        const entityDTO = new AttatchmentDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
