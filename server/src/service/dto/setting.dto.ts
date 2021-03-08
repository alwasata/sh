/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

/**
 * A Setting DTO object.
 */
export class SettingDTO extends BaseDTO {
  @ApiModelProperty({ description: 'key field', required: false })
  key: string;

  @ApiModelProperty({ description: 'value field', required: false })
  value: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
