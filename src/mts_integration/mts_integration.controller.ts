import { Body, Controller, HttpCode, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ButtonService } from 'src/button/button.service';
import { AddButtonDto } from './dto/add_button.dto';

@ApiTags( 'Mts integration' )
@Controller( 'mts-integration' )
export class MtsIntegrationController {
    constructor ( private button_service: ButtonService ) {}

    @ApiOperation( { summary: 'Registers button click' } )
    @UsePipes( new ValidationPipe( { whitelist: true } ) )
    @HttpCode( 200 )
    @Post( ':id' )
    async register ( @Body() add_button_dto: AddButtonDto, @Param( 'id' ) id: string ): Promise<void> {
        // const parsed = JSON.parse( Buffer.from( add_button_dto.data, 'base64' ).toString( 'utf-8' ) );
        // const button_status = parsed.telemetry.firstButton.status;
        console.log( 'ID at mts integration', id, typeof id );
        this.button_service.button_create( add_button_dto.externalId, id );
        return;
    }
}
