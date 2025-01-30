import {
  Controller,
  Get,
  Post,
  Param,
  Logger,
  Query,
  Body,
  ParseIntPipe,
  DefaultValuePipe,
  Patch,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { PatchUserDto } from './dtos/patch-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly logger: Logger) {
    this.logger = new Logger(UsersController.name);
  }

  @Get('/:id?')
  getUsers(
    @Param() getUsersParamDto: GetUsersParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    this.logger.debug(getUsersParamDto instanceof GetUsersParamDto);
    this.logger.debug({ getUsersParamDto });
    this.logger.debug(typeof limit);
    this.logger.debug(limit);
    this.logger.debug(typeof page);
    this.logger.debug(page);
    return 'You sent a get request to users endpoint';
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    this.logger.debug(createUserDto instanceof CreateUserDto);

    return 'You sent a post request to users endpoint';
  }

  @Patch()
  patchUser(@Body() patchUserDto: PatchUserDto) {
    this.logger.debug(patchUserDto instanceof PatchUserDto);
    return 'You sent a patch request to users endpoint';
  }
}
