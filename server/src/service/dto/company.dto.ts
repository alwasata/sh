/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { UserDTO } from './user.dto';

/**
 * A Company DTO object.
 */
export class CompanyDTO extends BaseDTO {
    @IsNotEmpty()
    @ApiModelProperty({ description: 'nameAr field' , uniqueItems: true})
    nameAr: string;

    @ApiModelProperty({ description: 'nameEn field', required: false, uniqueItems: true })
    nameEn: string;

    @ApiModelProperty({ description: 'email field', required: false, uniqueItems: true })
    email: string;

    @ApiModelProperty({ description: 'phone field', required: false, uniqueItems: true })
    phone: string;

    @ApiModelProperty({ description: 'address field', required: false })
    address: string;

    @ApiModelProperty({ description: 'discount field', required: false })
    discount: number;

    @ApiModelProperty({ description: 'fixed discount field', required: false })
    fixedDiscount: boolean;

    @ApiModelProperty({ type: UserDTO, isArray: true, description: 'users relationship' })
    users: UserDTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
