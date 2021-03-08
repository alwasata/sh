/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { CardTransactionDTO } from './card-transaction.dto';
import { HospitalDTO } from './hospital.dto';
import { InvoiceStatus } from '../../domain/enumeration/invoice-status';

/**
 * A Invoice DTO object.
 */
export class InvoiceDTO extends BaseDTO {
    @ApiModelProperty({ description: 'invoiceNo field', required: false })
    invoiceNo: string;

    @ApiModelProperty({ description: 'invoiceDate field', required: false })
    invoiceDate: any;

    @ApiModelProperty({ description: 'payDate field', required: false })
    payDate: any;

    @ApiModelProperty({ description: 'total field', required: false })
    total: number;

    @ApiModelProperty({ description: 'total points', required: false , default:null})
    totalPoints: number;

    @ApiModelProperty({ enum: InvoiceStatus, description: 'invoiceStatus enum field', required: false })
    invoiceStatus: InvoiceStatus;

    @ApiModelProperty({ description: 'notes field', required: false })
    notes: string;

    @ApiModelProperty({ type: CardTransactionDTO, description: 'cardTransaction relationship' })
    cardTransaction: CardTransactionDTO;

    @ApiModelProperty({ type: HospitalDTO, description: 'Hospital relationship' })
    hospital : HospitalDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
