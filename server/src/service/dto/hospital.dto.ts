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
    @ApiModelProperty({ description: 'nameAr field', uniqueItems: true  })
    nameAr: string;

    @ApiModelProperty({ description: 'nameEn field', uniqueItems: true })
    nameEn: string;

    @ApiModelProperty({ description: 'email field', uniqueItems: true })
    email: string;

    @ApiModelProperty({ description: 'phone field', uniqueItems: true })
    phone: string;

    @ApiModelProperty({ description: 'city field', required: false })
    city: string;

    @ApiModelProperty({ description: 'lat field', required: false })
    lat: string;

    @ApiModelProperty({ description: 'lng field', required: false })
    lng: string;

    @ApiModelProperty({ description: 'phoneSecond field', required: false })
    phoneSecond: string;

    @ApiModelProperty({ description: 'phoneThird field', required: false })
    phoneThird: string;

    @ApiModelProperty({ description: 'address field', required: false })
    address: string;

    @ApiModelProperty({ description: 'lng field', required: false , default: 1})
    active: boolean;

    @ApiModelProperty({ description: 'type field', required: false})
    type: string;

    @ApiModelProperty({ description: 'notes field', required: false})
    notes: string;

    @ApiModelProperty({ type: UserDTO, isArray: true, description: 'users relationship' })
    users: UserDTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
