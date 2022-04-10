import { describe_with_db, TestContext } from 'src/abstract_spec';
import { MtsIntegrationController } from './mts_integration.controller';
import { MtsIntegrationModule } from './mts_integration.module';

let mts_integration_controller: MtsIntegrationController;

describe_with_db(
    'ButtonService',
    [MtsIntegrationModule],
    ( context: TestContext ) => {
        mts_integration_controller = context.module.get<MtsIntegrationController>( MtsIntegrationController );
    },
    () => {
        it( 'should be defined', () => {
            expect( mts_integration_controller ).toBeDefined();
        } );
    },
);
