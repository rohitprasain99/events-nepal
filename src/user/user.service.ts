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
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

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
}
