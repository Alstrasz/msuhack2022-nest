import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ButtonDocument = Button & Document;

@Schema()
export class Button {
    @Prop( { required: true, unique: true } )
        id: string;

    @Prop( { required: true, default: 'button_label' } )
        label: string;

    @Prop( { required: true, default: 'button_description' } )
        decription: string;

    @Prop( { required: true, default: 0 } )
        press_counter: number;

    @Prop( { required: true } )
        owner_username: string;
}

export const ButtonSchema = SchemaFactory.createForClass( Button );
