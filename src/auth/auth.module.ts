import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwt_constants } from 'src/constatns';
import { JwtStrategy } from './jwt.strategy';

@Module( {
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register( {
            secret: jwt_constants.secret,
            signOptions: { expiresIn: '1d' },
        } ),
    ],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
    ],
    controllers: [AuthController],
} )
export class AuthModule {}
