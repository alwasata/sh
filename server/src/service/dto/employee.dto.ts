/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { CompanyDTO } from './company.dto';
import { EmployeeStatus } from '../../domain/enumeration/employee-status';

/**
 * A Employee DTO object.
 */
export class EmployeeDTO extends BaseDTO {
    @ApiModelProperty({ description: 'name field', required: false })
    name: string;

    @ApiModelProperty({ description: 'phone field', required: false })
    phone: string;

    @ApiModelProperty({ description: 'identityNo field', required: false })
    identityNo: string;

    @ApiModelProperty({ enum: EmployeeStatus, description: 'employeeStatus enum field', required: false })
    employeeStatus: EmployeeStatus;

    @ApiModelProperty({ description: 'notes field', required: false })
    notes: string;

    @ApiModelProperty({ type: CompanyDTO, description: 'company relationship' })
    company: CompanyDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
