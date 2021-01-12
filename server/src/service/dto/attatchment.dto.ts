/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { EmployeeDTO } from './employee.dto';

/**
 * A Attatchment DTO object.
 */
export class AttatchmentDTO extends BaseDTO {
    @ApiModelProperty({ description: 'name field', required: false })
    name: string;

    @ApiModelProperty({ description: 'file field', required: false })
    file: any;

    fileContentType: string;
    @ApiModelProperty({ description: 'fileUrl field', required: false })
    fileUrl: string;

    @ApiModelProperty({ type: EmployeeDTO, description: 'employee relationship' })
    employee: EmployeeDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
