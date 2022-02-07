import { IsString } from 'class-validator';
import { TranslatorEnum } from '../../../core/constants/translator.enum';
import { Role } from '../../role/role.entity';

export class CreateUserDto {
  @IsString({ message: TranslatorEnum.VALIDATOR_STRING_FIRST_NAME })
  readonly first_name: string;

  @IsString({ message: TranslatorEnum.VALIDATOR_STRING_LAST_NAME })
  readonly last_name: string;

  @IsString({ message: TranslatorEnum.VALIDATOR_STRING_USERNAME })
  readonly username: string;

  @IsString({ message: TranslatorEnum.VALIDATOR_STRING_NUMID })
  readonly numid: string;

  @IsString({ message: TranslatorEnum.VALIDATOR_STRING_EMAIL })
  readonly email: string;

  @IsString({ message: TranslatorEnum.VALIDATOR_STRING_PASSWORD })
  readonly password: string;

  @IsString({ message: TranslatorEnum.VALIDATOR_STRING_BIRTHDATE })
  readonly birthdate: Date;

  readonly role: Role;
}
