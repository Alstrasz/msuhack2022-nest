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
            const button = await this.button_model.findOne( { externalId: externalId }, { session } ).lean();
            if ( !button ) {
                const id = await this.counter_model.findOneAndUpdate( { name: counter_name.button }, { $inc: { count: 1 } }, { upsert: true, returnOriginal: false, session } );
                await ( new this.button_model( {
                    id: id,
                    externalId: externalId,
                    owner: user_id,
                } ) ).save( { session } );
            } else {
                await this.button_model.findOneAndUpdate( { externalId: externalId }, { $inc: { count: 1 } }, { upsert: true, returnOriginal: false, session } );
            }
        }, { readConcern: { level: 'local' }, writeConcern: { w: 'majority' } } )
            .finally( () => {
                session.endSession();
            } );
        // await this.button_model.findOneAndUpdate( { id: externalId, owner: user_id }, { $inc: { press_counter: 1 } }, { upsert: true } );
    }

    async get_button_by_id ( externalId: string ) {
        return ( await this.button_model.findOne( { id: externalId } ) as any )._doc;
    }

    async set_label ( externalId: string, new_label: string ): Promise<Button> {
        return await this.button_model.findOneAndUpdate( { id: externalId }, { $set: { label: new_label } }, { returnOriginal: false } ).lean();
    }

    async set_description ( externalId: string, new_description: string ): Promise<Button> {
        return ( await this.button_model.findOneAndUpdate( { id: externalId }, { $set: { description: new_description } }, { returnOriginal: false } ) as any )._doc;
    }

    async set_counter ( externalId: string, new_counter: number ): Promise<Button> {
        return ( await this.button_model.findOneAndUpdate( { id: externalId }, { $set: { press_counter: new_counter } }, { returnOriginal: false } ) as any )._doc;
    }
}
