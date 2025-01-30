import {
  Controller,
  Get,
  Post,
  Param,
  Logger,
  Query,
  Body,
  Headers,
  Ip,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly logger: Logger) {
    this.logger = new Logger(UsersController.name);
  }

  @Get('/:id/:optional?')
  getUsers(@Param('id') id: any, @Query('limit') limit: any) {
    this.logger.debug(id);
    this.logger.debug(limit);
    return 'You sent a get request to users endpoint';
  }

  @Post()
  createUser(@Body() body: any, @Headers() headers: any, @Ip() ip: any) {
    this.logger.debug(body);
    this.logger.debug(headers);
    this.logger.debug(ip);
    return 'You sent a post request to users endpoint';
  }
}
