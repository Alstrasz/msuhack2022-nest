import { Module } from '@nestjs/common';
import { ButtonModule } from 'src/button/button.module';
import { MtsIntegrationController } from './mts_integration.controller';

@Module( {
    imports: [ButtonModule],
    controllers: [MtsIntegrationController],
} )
export class MtsIntegrationModule {}
