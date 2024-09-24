import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    //TODO : if user is admin make pending status `ACTIVE`
    try {
      await this.userRepository
        .createQueryBuilder()
        .insert()
        .into(Users)
        .values(createUserDto)
        .execute();
    } catch (e) {
      throw e;
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(userId: string) {
    try {
      return await this.userRepository.findOne({ where: { id: userId } });
    } catch (e) {
      console.warn(e);
      throw e;
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return updateUserDto;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  //helpers
  async isDuplicateUser(username: string): Promise<boolean> {
    try {
      const user = await this.userRepository
        .createQueryBuilder('users')
        .where('username = :user', { user: username })
        .getOne();
      return !!user;
    } catch (e) {
      console.error('errrr', e);
      throw new HttpException('Error fetching user', HttpStatus.BAD_REQUEST);
    }
  }

  async isAuthenticatedUser(username: string) {
    try {
      const user = await this.userRepository
        .createQueryBuilder('users')
        .where('users.username = :email', { email: username })
        // .orWhere('users.phone_number = :phone_number', { phone_number: username })
        .getOne();

      return user;
    } catch (e) {
      console.error(e);
      throw new HttpException('Error fetching user', HttpStatus.BAD_REQUEST);
    }
  }

  async saveRefreshToken(id: string, refreshToken: string) {
    try {
      const formattedData = {
        refresh_token: refreshToken,
        updated_by: id,
      };
      await this.userRepository
        .createQueryBuilder()
        .update(Users)
        .set(formattedData)
        .where('id =:userId', { userId: id })
        .execute();
    } catch (e) {
      throw e;
    }
  }

  async findUserAndClearRefreshToken(id: string) {
    try {
      const formattedData = {
        refresh_token: '',
        updated_by: id,
      };
      await this.userRepository
        .createQueryBuilder()
        .update(Users)
        .set(formattedData)
        .where('id =:userId', { userId: id })
        .execute();
    } catch (e) {
      throw e;
    }
  }

  async findUserAndCheckRefreshToken(userId, previousRefreshToken) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
        refresh_token: previousRefreshToken,
      },
    });
    return user;
  }
}
