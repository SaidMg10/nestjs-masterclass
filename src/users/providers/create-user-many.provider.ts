/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ConflictException,
  Injectable,
  Logger,
  RequestTimeoutException,
} from '@nestjs/common';
import { User } from '../user.entity';
import { DataSource } from 'typeorm';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';

@Injectable()
export class CreateUserManyProvider {
  constructor(
    private readonly logger: Logger,

    private readonly dataSource: DataSource,
  ) {
    this.logger = new Logger(CreateUserManyProvider.name);
  }
  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    const newUsers: User[] = [];

    // Create Query Runner Instance
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      // Connect the query ryunner to the datasource
      await queryRunner.connect();
      // Start the transaction
      await queryRunner.startTransaction();
    } catch (error) {
      throw new RequestTimeoutException('Could not connect to the database');
    }

    try {
      for (const user of createManyUsersDto.users) {
        const newUser = queryRunner.manager.create(User, user);
        const result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw new ConflictException('Could not complete the transaction', {
        description: String(error),
      });
    } finally {
      try {
        // you need to release a queryRunner which was manually instantiated
        await queryRunner.release();
      } catch (error) {
        throw new RequestTimeoutException(
          'Could not release the query runner connection',
        );
      }
    }

    return newUsers;
  }
}
