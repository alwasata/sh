import { BenefitRequest } from '../../domain/benefit-request.entity';
import { BenefitRequestDTO } from '../dto/benefit-request.dto';

/**
 * A BenefitRequest mapper object.
 */
export class BenefitRequestMapper {
    static fromDTOtoEntity(entityDTO: BenefitRequestDTO): BenefitRequest {
        if (!entityDTO) {
            return;
        }
        const entity = new BenefitRequest();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach(field => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: BenefitRequest): BenefitRequestDTO {
        if (!entity) {
            return;
        }
        const entityDTO = new BenefitRequestDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
