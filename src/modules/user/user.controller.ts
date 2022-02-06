import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, ReadUserDto, UpdateUserDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async user(@Req() req) {
    const { email } = req.user;
    return await this.userService.getUser(email);
  }

  @Get('list/:page/:limit?')
  async getAll(@Param('page') page, @Param('limit') limit) {
    return await this.userService.getAllUsers({ limit, page });
  }
  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id) {
    return await this.userService.getUserById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createUser(@Body() user: CreateUserDto) {
    return await this.userService.create(user);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  updateUser(
    @Param('id', ParseIntPipe) id,
    @Body() userData: Partial<UpdateUserDto>,
  ): Promise<ReadUserDto> {
    return this.userService.update(id, userData);
  }

  @Delete(':id')
  deleteUser(@Param('id') id) {
    return this.userService.delete(id);
  }
}
