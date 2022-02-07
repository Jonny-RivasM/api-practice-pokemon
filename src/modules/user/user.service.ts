import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, ReadUserDto } from './dto';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nService } from 'nestjs-i18n';
import { TranslatorEnum } from '../../core/constants/translator.enum';
import { plainToClass } from 'class-transformer';
import { User } from './user.entity';

import { genSalt, hash } from 'bcryptjs';

const globalAny: any = global;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly i18n: I18nService,
  ) {}

  async create(userData: CreateUserDto): Promise<ReadUserDto> {
    const user: User = await this.userRepository.findOne({
      where: [{ email: userData.email }, { username: userData.username }],
      withDeleted: true,
    });
    if (user) {
      throw new ConflictException(
        await this.i18n.translate(TranslatorEnum.USER_ALREADY_EXISTS, {
          lang: globalAny.lang,
        }),
      );
    }
    const userCreated = await this.userRepository.save(userData);
    return plainToClass(ReadUserDto, userCreated);
  }

  async getUserById(id): Promise<ReadUserDto> {
    const user = await this.userRepository.findOne({
      where: { id },
      withDeleted: true,
    });
    if (!user) {
      throw new NotFoundException(
        await this.i18n.translate(TranslatorEnum.USER_EMAIL_NOT_FOUND, {
          lang: globalAny.lang,
        }),
      );
    }
    return plainToClass(ReadUserDto, user);
  }

  async getUser(email): Promise<ReadUserDto> {
    const user = await this.userRepository.findOne({
      where: { email },
      withDeleted: true,
    });
    if (!email || !user) {
      throw new NotFoundException(
        await this.i18n.translate(TranslatorEnum.USER_EMAIL_NOT_FOUND, {
          lang: globalAny.lang,
        }),
      );
    }
    return plainToClass(ReadUserDto, user);
  }

  async getAllUsers({
    limit,
    page,
  }): Promise<{ result: ReadUserDto[]; quantity: number }> {
    const take = limit || 15;
    const skip = page || 0;
    let [users, total] = await this.userRepository.findAndCount({
      take,
      skip,
      order: { id: 'DESC' },
      withDeleted: true,
    });
    if (!users) {
      users = [];
    }
    return {
      result: users.map((user) => plainToClass(ReadUserDto, user)),
      quantity: total,
    };
  }

  async update(id, userData: Partial<UpdateUserDto>): Promise<ReadUserDto> {
    const user = await this.userRepository.findOne({
      where: { id },
      withDeleted: true,
    });
    if (!user) {
      throw new NotFoundException(TranslatorEnum.USER_EMAIL_NOT_FOUND);
    }
    await Promise.all(
      Object.keys(userData).map(async (key) => {
        if (key in user) {
          if (!!userData[key]) {
            if (key === 'password') {
              const salt = await genSalt(10);
              user.password = await hash(userData.password, salt);
            } else {
              user[key] = userData[key];
            }
          }
        }
      }),
    );
    user.update_on = new Date();
    user.save();
    return plainToClass(ReadUserDto, user);
  }

  async delete(id: number) {
    const user = await this.userRepository.findOne(id, {
      withDeleted: true,
    });
    if (!user) {
      throw new NotFoundException(TranslatorEnum.USER_EMAIL_NOT_FOUND);
    }
    await this.userRepository.softDelete(id);
    return {
      message: await this.i18n.translate(TranslatorEnum.USER_SUCCESS_DELETE, {
        lang: globalAny.lang,
      }),
    };
  }
}
