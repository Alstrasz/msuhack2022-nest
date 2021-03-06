import {
    Controller,
    Post,
    UseGuards,
    Get,
    UsePipes,
    ValidationPipe,
    Body,
    Req,
    HttpCode,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/users/dto/user.dto';
import { RequestWithUser } from 'src/users/interfaces/request_with_user.interface';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { AccessTokenDto } from './dto/access_tocken.dto';
import { CreateUserDto } from './dto/create_user.dto';
import { ROLE } from './enums/role.enum';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';

@ApiTags( 'Auth' )
@Controller( 'auth' )
export class AuthController {
    constructor (
        private auth_service: AuthService,
        private users_service: UsersService,
    ) {}

    @ApiOperation( { summary: 'Issues JWT token for existing user' } )
    @ApiOkResponse( { status: 200, type: AccessTokenDto } )
    @HttpCode( 200 )
    @UseGuards( LocalAuthGuard )
    @Post( 'login' )
    async login ( @Req() req: RequestWithUser, @Body() _create_user_dto: CreateUserDto ): Promise<AccessTokenDto> {
        console.log( req.user );
        return new AccessTokenDto( await this.auth_service.login( req.user ) );
    }

    @ApiOperation( { summary: 'Returns user dto. (Currently used to check JWT and roles)' } )
    @ApiOkResponse( { status: 200, type: UserDto } )
    @UseGuards( RolesGuard )
    @UseGuards( JwtAuthGuard )
    @Roles( ROLE.USER )
    @ApiBearerAuth( )
    @Get( 'profile' )
    async get_profile ( @Req() req: RequestWithUser ): Promise<UserDto> {
        const new_user: any = req.user;
        new_user.id = req.user.uuid;
        return new UserDto( new_user );
    }

    @ApiOperation( { summary: 'Creates user and issues JWT token' } )
    @ApiOkResponse( { status: 201, type: AccessTokenDto } )
    @UsePipes( new ValidationPipe( { whitelist: true } ) )
    @Post( 'register' )
    async register ( @Body() create_user_dto: CreateUserDto ): Promise<AccessTokenDto> {
        return this.auth_service.register( create_user_dto );
    }
}
