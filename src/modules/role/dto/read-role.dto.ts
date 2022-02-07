import { IsNumber, IsString, MaxLength } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { RoleMessages } from '../../../core/constants/role.enum';

@Exclude()
export class ReadRoleDto {
  @Expose() // Shows this property publicly
  @IsNumber()
  readonly id: number;

  @Expose()
  @IsString()
  @MaxLength(50, { message: RoleMessages.ROLE_NAME_LONG })
  readonly name: string;

  @Expose()
  @IsString()
  @MaxLength(80, { message: RoleMessages.ROLE_LABEL_LONG })
  readonly label: string;

  @IsString()
  @MaxLength(150, { message: RoleMessages.ROLE_DESCRIPTION_LONG })
  readonly description: string;
}