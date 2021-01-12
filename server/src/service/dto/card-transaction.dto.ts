/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { CardDTO } from './card.dto';
import { InvoiceDTO } from './invoice.dto';
import { TransactionAction } from '../../domain/enumeration/transaction-action';

/**
 * A CardTransaction DTO object.
 */
export class CardTransactionDTO extends BaseDTO {
    @ApiModelProperty({ description: 'transactionNo field', required: false })
    transactionNo: string;

    @ApiModelProperty({ description: 'amount field', required: false })
    amount: number;

    @ApiModelProperty({ description: 'pointsAmount field', required: false })
    pointsAmount: number;

    @ApiModelProperty({ enum: TransactionAction, description: 'action enum field', required: false })
    action: TransactionAction;

    @ApiModelProperty({ description: 'notes field', required: false })
    notes: string;

    @ApiModelProperty({ type: CardDTO, description: 'card relationship' })
    card: CardDTO;

    @ApiModelProperty({ type: InvoiceDTO, description: 'invoice relationship' })
    invoice: InvoiceDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
