import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Put, Req, UnauthorizedException, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RequestWithUser } from 'src/users/interfaces/request_with_user.interface';
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
    @UseGuards( JwtAuthGuard )
    @ApiBearerAuth( )
    @HttpCode( 200 )
    @Get( ':id' )
    async get ( @Param( 'id' ) id: string, @Req() req: RequestWithUser ): Promise<ButtonInfoDto> {
        const button = await this.button_service.get_button_by_id( id );
        if ( button == null ) {
            throw new NotFoundException( `No button with ${id} found` );
        }
        if ( button.owner != req.user.uuid ) {
            throw new UnauthorizedException( `Your id dosnt match needed` );
        }
        return new ButtonInfoDto( button );
    }

    @ApiOperation( { summary: 'Get all buttons by owner' } )
    @UsePipes( new ValidationPipe( { whitelist: true } ) )
    @ApiOkResponse( { status: 200, type: [ButtonInfoDto] } )
    @UseGuards( JwtAuthGuard )
    @ApiBearerAuth( )
    @HttpCode( 200 )
    @Get( 'all/:owner' )
    async get_all ( @Param( 'owner' ) owner: string, @Req() req: RequestWithUser ): Promise<Array<ButtonInfoDto>> {
        if ( owner != req.user.uuid ) {
            throw new UnauthorizedException( `Your id dosnt match needed` );
        }
        return ( await this.button_service.get_buttons_by_owner( owner ) ).map( ( elem ) => {
            return new ButtonInfoDto( elem );
        } );
    }

    @ApiOperation( { summary: 'Set label' } )
    @UsePipes( new ValidationPipe( { whitelist: true } ) )
    @ApiOkResponse( { status: 200, type: ButtonInfoDto } )
    @UseGuards( JwtAuthGuard )
    @ApiBearerAuth( )
    @HttpCode( 200 )
    @Put( ':id' )
    async set_label ( @Body() set_button_info_dto: SetButtonInfoDto, @Param( 'id' ) id: string, @Req() req: RequestWithUser ): Promise<ButtonInfoDto> {
        const button = await this.button_service.get_button_by_id( id );
        if ( button == null ) {
            throw new NotFoundException( `No button with ${id} found` );
        }
        if ( button.owner != req.user.uuid ) {
            throw new UnauthorizedException( `Your id dosnt match needed` );
        }
        return new ButtonInfoDto( await this.button_service.set_info( id, set_button_info_dto.label, set_button_info_dto.description, set_button_info_dto.press_counter ) );
    }

    @ApiOperation( { summary: 'Deletes button' } )
    @UsePipes( new ValidationPipe( { whitelist: true } ) )
    @ApiOkResponse( { status: 200 } )
    @UseGuards( JwtAuthGuard )
    @ApiBearerAuth( )
    @HttpCode( 200 )
    @Delete( ':id' )
    async delete ( @Param( 'id' ) id: string, @Req() req: RequestWithUser ): Promise<void> {
        const button = await this.button_service.get_button_by_id( id );
        if ( button == null ) {
            throw new NotFoundException( `No button with ${id} found` );
        }
        if ( button.owner != req.user.uuid ) {
            throw new UnauthorizedException( `Your id dosnt match needed` );
        }
        this.button_service.delete_button( id );
    }
}
