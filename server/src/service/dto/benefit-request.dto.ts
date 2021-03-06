/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { CategoryDTO } from './category.dto';
import { HospitalDTO } from './hospital.dto';
import { BenefitDTO } from './benefit.dto';
import { BenefitStatus } from '../../domain/enumeration/benefit-status';

/**
 * A BenefitRequest DTO object.
 */
export class BenefitRequestDTO extends BaseDTO {
    @IsNotEmpty()
    @ApiModelProperty({ description: 'nameAr field' })
    nameAr: string;

    @ApiModelProperty({ description: 'nameEn field', required: false })
    nameEn: string;

    // @ApiModelProperty({ description: 'pointsCost field', required: false })
    // pointsCost: number;

    @ApiModelProperty({ description: 'cost field', required: false })
    cost: number;

    @ApiModelProperty({ enum: BenefitStatus, description: 'benefitStatus enum field', required: false })
    benefitStatus: BenefitStatus;

    @ApiModelProperty({ description: 'notes field', required: false })
    notes: string;

    @ApiModelProperty({ type: CategoryDTO, description: 'category relationship' })
    category: CategoryDTO;

    @ApiModelProperty({ type: HospitalDTO, description: 'hospital relationship' })
    hospital: HospitalDTO;

    @ApiModelProperty({ type: BenefitDTO, description: 'benefit relationship' })
    benefit: BenefitDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
