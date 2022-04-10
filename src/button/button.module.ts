import { Module } from '@nestjs/common';
import { ButtonService } from './button.service';
import { ButtonController } from './button.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Button, ButtonSchema } from 'src/schemas/button.schema';
import { Counter, CounterSchema } from 'src/schemas/counter.schema';

@Module( {
    imports: [MongooseModule.forFeature( [{ name: Button.name, schema: ButtonSchema }, { name: Counter.name, schema: CounterSchema }] )],
    providers: [ButtonService],
    controllers: [ButtonController],
    exports: [ButtonService],
} )
export class ButtonModule {}
