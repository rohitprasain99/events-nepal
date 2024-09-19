import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { RoleEnum } from 'src/utils/enums/role.enum';

export class CreateAuthDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(RoleEnum)
  role: RoleEnum;
}
