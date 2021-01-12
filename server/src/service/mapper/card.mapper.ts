import { Card } from '../../domain/card.entity';
import { CardDTO } from '../dto/card.dto';

/**
 * A Card mapper object.
 */
export class CardMapper {
    static fromDTOtoEntity(entityDTO: CardDTO): Card {
        if (!entityDTO) {
            return;
        }
        const entity = new Card();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach(field => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: Card): CardDTO {
        if (!entity) {
            return;
        }
        const entityDTO = new CardDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
