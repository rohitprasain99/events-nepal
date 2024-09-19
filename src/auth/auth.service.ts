import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import { BcryptService } from 'src/core/bcryptjs/bcrypt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,

    private readonly bcryptService: BcryptService,
  ) {}

  async create({ username, password, role }: CreateAuthDto) {
    //check if user exits
    // if no, generate hash password
    // save to db
    try {
      if (await this.userService.isDuplicateUser(username)) {
        throw new HttpException('Duplicate user', HttpStatus.BAD_REQUEST);
      } else {
        // hash password
        const hashedPassword = await this.bcryptService.hashPassword(password);
        this.userService.create({ username, password: hashedPassword, role });
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
