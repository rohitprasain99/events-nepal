import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import { BcryptService } from 'src/core/bcryptjs/bcrypt.service';
import { Users } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import 'dotenv/config';
import { RoleEnum } from 'src/utils/enums/role.enum';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
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

  async login(user: Users) {
    // check if user is authentic - check username and password -> this done using guards
    // generate access and refresh token

    const accessToken: string = await this.generateToken(
      user.id,
      user.username,
      user.role,
    );

    // save refresh token in db
    return {
      role: user.role,
      accessToken,
      refreshToken: '', // TODO: implement later
    };
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return updateAuthDto;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  //helper functions
  async validateUser(username: string, password: string): Promise<any> {
    const user: Users = await this.userService.isAuthenticatedUser(username);

    if (
      !!user &&
      (await this.bcryptService.comparePassword(password, user.password))
    ) {
      return user;
    }
    return null;
  }

  public generateToken(id: string, username: string, role: RoleEnum): string {
    return this.jwtService.sign(
      {
        id: id,
        username: username,
        role: role,
      },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '123456789days',
      },
    );
  }
}
