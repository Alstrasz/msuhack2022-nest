import { Body, Controller, Get, HttpCode, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ButtonService } from './button.service';
import { ButtonInfoDto } from './dto/button_info.dto';
import { SetLabelDto } from './dto/set_label.dto';


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
        this.button_service.get_button_by_id( id );
        return;
    }

    @ApiOperation( { summary: 'Set label' } )
    @UsePipes( new ValidationPipe( { whitelist: true } ) )
    @ApiOkResponse( { status: 200, type: ButtonInfoDto } )
    @HttpCode( 200 )
    @Post( ':id/label' )
    async set_label ( @Body() set_label_dto: SetLabelDto, @Param( 'id' ) id: string ): Promise<ButtonInfoDto> {
        this.button_service.set_label( id, set_label_dto.label );
        return;
    }
}
