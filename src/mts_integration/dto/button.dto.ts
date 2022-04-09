import { ApiProperty } from '@nestjs/swagger';
import { IsBase64, IsNotEmpty, IsString } from 'class-validator';

export class AddButtonDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
        externalId: string;

    @ApiProperty()
    @IsBase64()
    @IsNotEmpty()
        data: string;
}
