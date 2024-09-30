import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { GenericEntity } from 'src/core/common/generic.entity';
import { StatusEnum } from 'src/utils/enums/status.enum';

export class CreateOrganizerDto extends GenericEntity {
  @IsString()
  @IsNotEmpty()
  organizer_name: string;

  @IsNumber()
  @IsNotEmpty()
  contact_number: number;

  @IsString()
  @IsNotEmpty()
  ceo_name: string;

  @IsNumber()
  @IsNotEmpty()
  pan_number: string;

  @IsNotEmpty()
  @IsEnum(StatusEnum)
  status: StatusEnum;
}
