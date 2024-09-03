import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({ example: 1, description: 'ID of event' })
  id: number;
  name: string;
  location: string;
}
