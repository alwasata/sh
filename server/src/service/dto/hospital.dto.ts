/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { UserDTO } from './user.dto';

/**
 * A Hospital DTO object.
 */
export class HospitalDTO extends BaseDTO {
    @IsNotEmpty()
    @ApiModelProperty({ description: 'nameAr field' })
    nameAr: string;

    @ApiModelProperty({ description: 'nameEn field', required: false })
    nameEn: string;

    @ApiModelProperty({ description: 'email field', required: false })
    email: string;

    @ApiModelProperty({ description: 'phone field', required: false })
    phone: string;

    @ApiModelProperty({ description: 'address field', required: false })
    address: string;

    @ApiModelProperty({ type: UserDTO, isArray: true, description: 'users relationship' })
    users: UserDTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
