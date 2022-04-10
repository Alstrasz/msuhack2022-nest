import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Button, ButtonDocument } from 'src/schemas/button.schema';
import { Model } from 'mongoose';
import { Counter, CounterDocument } from 'src/schemas/counter.schema';
import mongoose from 'mongoose';
import { counter_name } from 'src/constatns';

@Injectable()
export class ButtonService {
    constructor (
        @InjectModel( Button.name ) private button_model: Model<ButtonDocument>,
        @InjectModel( Counter.name ) private counter_model: Model<CounterDocument>,
        @InjectConnection() private connection: mongoose.Connection,
    ) {}

    async button_create ( externalId: string, user_id: string ): Promise<void> {
        const session = await this.connection.startSession();
        await session.withTransaction( async () => {
            console.log( 'starting session ' );
            const data = await this.button_model.findOne( { externalId: externalId }, null, { session } );
            console.log( 'data', data );
            if ( data ) {
                await this.button_model.findOneAndUpdate( { externalId: externalId }, { $inc: { press_counter: 1 } }, { upsert: true, returnOriginal: false, session } );
            } else {
                const id = ( await this.counter_model.findOneAndUpdate( { name: counter_name.button }, { $inc: { count: 1 } }, { upsert: true, returnOriginal: false, session } ) ).count;
                await( new this.button_model( {
                    id: id,
                    externalId: externalId,
                    owner: user_id,
                } ) ).save( { session } );
            }
        }, { readConcern: { level: 'local' }, writeConcern: { w: 'majority' } } )
            .finally( () => {
                session.endSession();
            } );
        // await this.button_model.findOneAndUpdate( { id: externalId, owner: user_id }, { $inc: { press_counter: 1 } }, { upsert: true } );
    }

    async get_button_by_id ( externalId: string ) {
        return await this.button_model.findOne( { id: externalId } ).lean();
    }

    async get_buttons_by_owner ( owner: string ) {
        const ret: Array<Button> = [];
        ( await this.button_model.find( { owner: owner } ) ).forEach( ( elem ) => {
            ret.push( ( elem as any )._doc );
        } );
        return ret;
    }

    async set_info ( externalId: string, new_label?: string, new_description?: string, new_counter?: number ): Promise<Button> {
        return await this.button_model.findOneAndUpdate(
            { id: externalId },
            { $set: { label: new_label, description: new_description, press_counter: new_counter } },
            { returnOriginal: false },
        ).lean();
    }
}
