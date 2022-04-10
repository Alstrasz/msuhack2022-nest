import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';


@Exclude()
export class ButtonInfoDto {
    @ApiProperty()
    @Expose()
        id: string;

    @ApiProperty()
    @Expose()
        externalId: string;

    @ApiProperty()
    @Expose()
        label: string;

    @ApiProperty()
    @Expose()
        decription: string;

    @ApiProperty()
    @Expose()
        press_counter: number;

    @ApiProperty()
    @Expose()
        owner: string;
}
