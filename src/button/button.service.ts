import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Button, ButtonDocument } from 'src/schemas/button.schema';
import { Model } from 'mongoose';

@Injectable()
export class ButtonService {
    constructor (
        @InjectModel( Button.name ) private button_model: Model<ButtonDocument>,
    ) {}

    async button_create ( externalId: string, username: string ): Promise<void> {
        await this.button_model.updateOne( { id: externalId, owner_username: username }, { $inc: { press_counter: 1 } }, { upsert: true } );
    }
}
