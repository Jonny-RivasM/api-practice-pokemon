import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleRepository } from './role.repository';
import { ReadRoleDto } from './dto/read-role.dto';
import { plainToClass } from 'class-transformer';
import { RoleMessagesError } from '../../core/constants/role.enum';
import { GeneralStatus } from '../../core/constants/app-constants.enum';
import { TranslatorEnum } from '../../core/constants/translator.enum';
import { Role } from './role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { I18nService } from 'nestjs-i18n';

const globalAny: any = global;

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleRepository)
    private readonly roleRepository: RoleRepository,
    private readonly i18n: I18nService,
  ) {}

  async get(id: number): Promise<ReadRoleDto> {
    if (!id) {
      throw new BadRequestException(RoleMessagesError.ROLE_USER_ID);
    }
    const role: Role = await this.roleRepository.findOne(id, {
      where: { status: GeneralStatus.ACTIVATE },
    });
    if (!role) {
      throw new NotFoundException(TranslatorEnum.ROLE_NOT_FOUND);
    }
    return plainToClass(ReadRoleDto, role);
  }
  async getAll(): Promise<ReadRoleDto[]> {
    const role: Role[] = await this.roleRepository.find({
      where: { status: GeneralStatus.ACTIVATE },
      order: { id: 'DESC' },
    });
    return role.map((role: Role) => plainToClass(ReadRoleDto, role));
  }

  async create(roleData: Partial<CreateRoleDto>): Promise<ReadRoleDto> {
    const role: Role = await this.roleRepository.findOne({
      where: { name: roleData.name },
    });
    if (role) {
      throw new ConflictException(
        await this.i18n.translate(TranslatorEnum.ROLE_ALREADY_EXISTS,{
          lang: globalAny.lang,
        }),
      );
    }
    const roleCreated = await this.roleRepository.save(roleData);
    return plainToClass(ReadRoleDto, roleCreated);
  }

  async update(id, role: Partial<UpdateRoleDto>): Promise<ReadRoleDto> {
    const foundRole: Role = await this.roleRepository.findOne(id, {
      where: { status: GeneralStatus.ACTIVATE },
    });
    if (!foundRole) {
      throw new NotFoundException(TranslatorEnum.ROLE_NOT_FOUND);
    }
    if (role.name) {
      foundRole.name = role.name;
    }
    if (role.description) {
      foundRole.description = role.description;
    }
    if (role.label) {
      foundRole.label = role.label;
    }
    if (role.status) {
      foundRole.status = parseInt(role.status);
    }

    foundRole.update_on = new Date();
    const roleUpdate = await this.roleRepository.save(foundRole);
    return plainToClass(ReadRoleDto, roleUpdate);
  }

  async delete(id: number) {
    const roleExists = await this.roleRepository.findOne(id, {
      where: { status: GeneralStatus.ACTIVATE },
    });
    if (!roleExists) {
      throw new NotFoundException(TranslatorEnum.ROLE_NOT_FOUND);
    }
    return await this.roleRepository.update(id, { status: 0 });
  }
}
