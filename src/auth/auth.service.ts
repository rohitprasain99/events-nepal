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
    /*
    check if user is authentic 
    ->check username and password 
    -> this done using guards
    */

    // generate access and refresh token

    const accessToken: string = this.generateAccessToken(
      user.id,
      user.username,
      user.role,
    );

    // generate and save refresh token in db
    const refreshToken: string = this.generateRefreshToken(user.id);

    try {
      await this.userService.saveRefreshToken(user.id, refreshToken);
    } catch (e) {
      console.warn(e);
      throw new HttpException(
        'Error saving refresh token',
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      role: user.role,
      accessToken,
      refreshToken: refreshToken,
    };
  }

  async logout(userId: string) {
    // check if the user exists
    // remove refresh token of the user
    // clear cookies

    try {
      await this.userService.findUserAndClearRefreshToken(userId);
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'Error logging out',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async generateNewAccessToken(previousRefreshToken: string) {
    try {
      // check if previous refresh token is expired
      const decodedToken: {
        id: string;
        iat: number;
        exp: number;
      } = this.jwtService.verify(previousRefreshToken, {
        secret: process.env.REFRESH_TOKEN_SECRET,
      });
      // check if the user exists and refresh token matches
      const user: Users = await this.userService.findUserAndCheckRefreshToken(
        decodedToken.id,
        previousRefreshToken,
      );
      if (!!user) {
        // generate new access and refresh token
        const accessToken = this.generateAccessToken(
          user.id,
          user.username,
          user.role,
        );
        const newRefreshToken = this.generateRefreshToken(user.id);
        //save new refresh token to db
        await this.userService.saveRefreshToken(user.id, newRefreshToken);
        return {
          accessToken,
          refreshToken: newRefreshToken,
        };
      }
    } catch (e) {
      console.warn(e);
      throw new HttpException('Token Invalid', HttpStatus.UNAUTHORIZED);
    }
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

  public generateAccessToken(
    id: string,
    username: string,
    role: RoleEnum,
  ): string {
    return this.jwtService.sign(
      {
        id: id,
        username: username,
        role: role,
      },
      {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: process.env.ACCESS_EXPIRY,
      },
    );
  }

  public generateRefreshToken(id: string): string {
    return this.jwtService.sign(
      {
        id: id,
      },
      {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: process.env.REFRESH_EXPIRY,
      },
    );
  }
}
