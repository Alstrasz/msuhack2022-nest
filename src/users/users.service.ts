import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/auth/dto/create_user.dto';
import { nanoid } from 'nanoid';

@Injectable()
export class UsersService {
    constructor ( @InjectModel( User.name ) private user_model: Model<UserDocument> ) {}

    async create ( create_user_dto: CreateUserDto ): Promise<User> {
        const created_user = new this.user_model( {
            uuid: nanoid(),
            username: create_user_dto.username,
            password_hash: create_user_dto.password_hash,
            registration_date_in_seconds: ( new Date() ).getTime(),
        } );
        return created_user.save();
    }

    async get_user_by_username ( username: string ): Promise<User> {
        return ( await this.user_model.findOne( { username: username } ) as any )?._doc || null;
    }
}
