import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from './logger.middleware';
import { ButtonModule } from './button/button.module';
import { MtsIntegrationModule } from './mts_integration/mts_integration.module';

@Module( {
    imports: [
        AuthModule,
        UsersModule,
        MongooseModule.forRootAsync( {
            imports: [ConfigModule],
            useFactory: async ( ) => ( {
                uri: process.env.MONGO_URI || 'mongodb://127.0.0.1:8087?replicaSet=rs',
            } ),
            inject: [ConfigService],
        } ),
        ButtonModule,
        MtsIntegrationModule,
    ],
    controllers: [AppController],
    providers: [AppService],
} )
export class AppModule {
    configure ( consumer: MiddlewareConsumer ) {
        consumer
            .apply( LoggerMiddleware )
            .forRoutes( '*' );
    }
}
