import { CardTransaction } from '../../domain/card-transaction.entity';
import { CardTransactionDTO } from '../dto/card-transaction.dto';

/**
 * A CardTransaction mapper object.
 */
export class CardTransactionMapper {
    static fromDTOtoEntity(entityDTO: CardTransactionDTO): CardTransaction {
        if (!entityDTO) {
            return;
        }
        const entity = new CardTransaction();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach(field => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: CardTransaction): CardTransactionDTO {
        if (!entity) {
            return;
        }
        const entityDTO = new CardTransactionDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
