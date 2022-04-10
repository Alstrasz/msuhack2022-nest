import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class SetButtonInfoDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsOptional()
        label?: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsOptional()
        description?: string;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
        press_counter?: number;
}
