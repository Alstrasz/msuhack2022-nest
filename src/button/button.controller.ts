import { Body, Controller, Get, HttpCode, Param, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ButtonService } from './button.service';
import { ButtonInfoDto } from './dto/button_info.dto';
import { SetButtonInfoDto } from './dto/set_button_info.dto';

@ApiTags( 'Button' )
@Controller( 'button' )
export class ButtonController {
    constructor ( private button_service: ButtonService ) {}

    @ApiOperation( { summary: 'Get button info' } )
    @UsePipes( new ValidationPipe( { whitelist: true } ) )
    @ApiOkResponse( { status: 200, type: ButtonInfoDto } )
    @HttpCode( 200 )
    @Get( ':id' )
    async get ( @Param( 'id' ) id: string ): Promise<ButtonInfoDto> {
        return new ButtonInfoDto( await this.button_service.get_button_by_id( id ) );
    }

    @ApiOperation( { summary: 'Get all buttons by owner' } )
    @UsePipes( new ValidationPipe( { whitelist: true } ) )
    @ApiOkResponse( { status: 200, type: [ButtonInfoDto] } )
    @HttpCode( 200 )
    @Get( 'all/:owner' )
    async get_all ( @Param( 'owner' ) owner: string ): Promise<Array<ButtonInfoDto>> {
        return ( await this.button_service.get_buttons_by_owner( owner ) ).map( ( elem ) => {
            return new ButtonInfoDto( elem );
        } );
    }

    @ApiOperation( { summary: 'Set label' } )
    @UsePipes( new ValidationPipe( { whitelist: true } ) )
    @ApiOkResponse( { status: 200, type: ButtonInfoDto } )
    @HttpCode( 200 )
    @Put( ':id' )
    async set_label ( @Body() set_button_info_dto: SetButtonInfoDto, @Param( 'id' ) id: string ): Promise<ButtonInfoDto> {
        return new ButtonInfoDto( await this.button_service.set_info( id, set_button_info_dto.label, set_button_info_dto.description, set_button_info_dto.press_counter ) );
    }
}
