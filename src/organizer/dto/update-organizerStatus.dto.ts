import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { StatusEnum } from 'src/utils/enums/status.enum';

export class UpdateOrganizerStatus {
  @IsString()
  @IsNotEmpty()
  updated_by: string;

  @IsEnum(StatusEnum)
  @IsNotEmpty()
  status: StatusEnum;
}
