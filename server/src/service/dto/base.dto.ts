import { User } from "../../domain/user.entity";

/**
 * A DTO base objct.
 */
export class BaseDTO {
    id?: string;

    createdBy?: User;

    createdDate?: Date;

    lastModifiedBy?: string;

    lastModifiedDate?: Date;

}
