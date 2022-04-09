import { Test, TestingModule } from '@nestjs/testing';
import { ButtonController } from './button.controller';

describe( 'ButtonController', () => {
    let controller: ButtonController;

    beforeEach( async () => {
        const module: TestingModule = await Test.createTestingModule( {
            controllers: [ButtonController],
        } ).compile();

        controller = module.get<ButtonController>( ButtonController );
    } );

    it( 'should be defined', () => {
        expect( controller ).toBeDefined();
    } );
} );
