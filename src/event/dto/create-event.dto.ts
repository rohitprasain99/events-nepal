import { ApiProperty } from '@nestjs/swagger';
import 

export class CreateEventDto {
  @ApiProperty({ example: 1, description: 'ID of event' })
  @IsString()
  id: number;
  name: string;
  location: string;
}
