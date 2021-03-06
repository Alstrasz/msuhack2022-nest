import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { c_error_codes } from 'src/constatns';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@ApiTags( 'Users' )
@Controller( 'users' )
export class UsersController {
    constructor ( private users_service: UsersService ) {}

    @Get( ':username' )
    @ApiOperation( { summary: 'Get user data by username' } )
    @ApiOkResponse( { status: 200, type: UserDto } )
    @ApiBearerAuth( )
    async get_user ( @Param( 'username' ) username: string ): Promise<UserDto> {
        const user = await this.users_service.get_user_by_username( username );
        if ( user == null ) {
            throw new NotFoundException( {
                fields: { username: username },
                description: 'No user with such username found',
                code: c_error_codes.not_found,
            } );
        }
        const new_user: any = user;
        new_user.id = user.uuid;
        return new UserDto( new_user );
    }
}
