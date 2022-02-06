import { IsDate, IsNumber, IsString, MaxLength } from 'class-validator';
import { Role } from '../../role/role.entity';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ReadUserDto {
  @Expose() // Shows this property publicly
  @IsNumber()
  readonly id: number;

  @Expose()
  @IsString()
  @MaxLength(100, { message: 'the first_name is too long' })
  readonly first_name: string;

  @Expose()
  @IsString()
  @MaxLength(150, { message: 'the last_name is too long' })
  readonly last_name: string;

  @Expose()
  @IsString()
  @MaxLength(25, { message: 'the numid is too long' })
  readonly username: string;

  @Expose()
  @IsString()
  @MaxLength(20, { message: 'the numid is too long' })
  readonly numid: string;

  @Expose()
  @IsString()
  @MaxLength(80, { message: 'the email is too long' })
  readonly email: string;

  @IsString()
  @MaxLength(250, { message: 'the password is too long' })
  readonly password: string;

  @Expose()
  @IsDate()
  @MaxLength(90, { message: 'the birthdate is too long' })
  readonly birthdate: string;

  @Expose()
  readonly roles: Role[];

  @IsNumber()
  @MaxLength(1, { message: 'status is too long' })
  @Expose()
  readonly status: number;

  @Expose()
  readonly deletedAt: Date;
}
