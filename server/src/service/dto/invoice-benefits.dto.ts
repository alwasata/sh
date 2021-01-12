/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { BenefitDTO } from './benefit.dto';
import { InvoiceDTO } from './invoice.dto';

/**
 * A InvoiceBenefits DTO object.
 */
export class InvoiceBenefitsDTO extends BaseDTO {
    @ApiModelProperty({ description: 'pointsCost field', required: false })
    pointsCost: number;

    @ApiModelProperty({ description: 'cost field', required: false })
    cost: number;

    @ApiModelProperty({ description: 'quantity field', required: false })
    quantity: number;

    @ApiModelProperty({ description: 'total field', required: false })
    total: number;

    @ApiModelProperty({ type: BenefitDTO, description: 'benefit relationship' })
    benefit: BenefitDTO;

    @ApiModelProperty({ type: InvoiceDTO, description: 'invoice relationship' })
    invoice: InvoiceDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
