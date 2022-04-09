import { Test, TestingModule } from '@nestjs/testing';
import { MtsIntegrationController } from './mts_integration.controller';

describe( 'MtsIntegrationController', () => {
    let controller: MtsIntegrationController;

    beforeEach( async () => {
        const module: TestingModule = await Test.createTestingModule( {
            controllers: [MtsIntegrationController],
        } ).compile();

        controller = module.get<MtsIntegrationController>( MtsIntegrationController );
    } );

    it( 'should be defined', () => {
        expect( controller ).toBeDefined();
    } );
} );
