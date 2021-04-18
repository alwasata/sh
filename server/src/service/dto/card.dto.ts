/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { EmployeeDTO } from './employee.dto';

/**
 * A Card DTO object.
 */
export class CardDTO extends BaseDTO {
    @ApiModelProperty({ description: 'cardNo field', required: false })
    cardNo: string;

    @ApiModelProperty({ description: 'expiryDate field', required: false })
    expiryDate: Date;

    @ApiModelProperty({ description: 'isActive field', required: false })
    isActive: boolean;

    @ApiModelProperty({ type: EmployeeDTO, description: 'employee relationship' })
    employee: EmployeeDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
