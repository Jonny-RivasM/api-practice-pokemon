import { IsNumber, IsString, MaxLength } from 'class-validator';
import { RoleMessages } from '../../../core/constants/role.enum';

export class UpdateRoleDto {
  @IsString()
  @MaxLength(50, { message: RoleMessages.ROLE_NAME_LONG })
  readonly name: string;

  @IsString()
  @MaxLength(80, { message: RoleMessages.ROLE_LABEL_LONG })
  readonly label: string;

  @IsString()
  @MaxLength(150, { message: RoleMessages.ROLE_DESCRIPTION_LONG })
  readonly description: string;

  @IsNumber()
  @MaxLength(1, { message: RoleMessages.ROLE_STATUS_LONG })
  readonly status: string;

  @IsNumber()
  @MaxLength(50, { message: RoleMessages.ROLE_STATUS_LONG })
  readonly update_on: string;
}
