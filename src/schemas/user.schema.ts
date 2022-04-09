import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ROLE } from 'src/auth/enums/role.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop( { required: true, unique: true } )
        uuid: string;

    @Prop( { required: true, unique: true } )
        username: string;

    @Prop( { required: true } )
        password_hash: string;

    @Prop( { required: true } )
        registration_date_in_seconds: number;

    @Prop( { required: true, default: [ROLE.USER], type: [String] } )
        roles: ROLE[];
}

export const UserSchema = SchemaFactory.createForClass( User );
