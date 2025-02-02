import {
  Injectable,
  Logger,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';

@Injectable()
export class FindOneUserByEmailProvider {
  constructor(
    private readonly logger: Logger,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {
    this.logger = new Logger(FindOneUserByEmailProvider.name);
  }

  async findOneByEmail(email: string) {
    let user: User | undefined = undefined;

    try {
      user = await this.usersRepository.findOneBy({
        email,
      });
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'Could not Fetch the user',
      });
    }
    if (!user) throw new UnauthorizedException('User does not exist');

    return user;
  }
}
