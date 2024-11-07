import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDocs, UpdateUserDocs } from 'src/docs/user.docs';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { HttpStatus } from 'src/common/constants/http-status';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @CreateUserDocs()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put(':user_id')
  @UpdateUserDocs()
  async update(
    @Param('user_id') user_id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(user_id, updateUserDto);
  }

  @Get(':user_id')
  @HttpCode(HttpStatus.OK)
  async get(@Param('user_id') user_id: number) {
    return this.userService.findOne(user_id);
  }

  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.userService.findAll(paginationDto);
  }
}
