import { InvoiceBenefits } from '../../domain/invoice-benefits.entity';
import { InvoiceBenefitsDTO } from '../dto/invoice-benefits.dto';

/**
 * A InvoiceBenefits mapper object.
 */
export class InvoiceBenefitsMapper {
    static fromDTOtoEntity(entityDTO: InvoiceBenefitsDTO): InvoiceBenefits {
        if (!entityDTO) {
            return;
        }
        const entity = new InvoiceBenefits();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach(field => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: InvoiceBenefits): InvoiceBenefitsDTO {
        if (!entity) {
            return;
        }
        const entityDTO = new InvoiceBenefitsDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
