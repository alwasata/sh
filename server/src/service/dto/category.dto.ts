/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

/**
 * A Category DTO object.
 */
export class CategoryDTO extends BaseDTO {
    @IsNotEmpty()
    @ApiModelProperty({ description: 'nameAr field' })
    nameAr: string;

    @ApiModelProperty({ description: 'nameEn field', required: false })
    nameEn: string;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
