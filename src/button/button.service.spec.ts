import { describe_with_db, TestContext } from 'src/abstract_spec';
import { ButtonModule } from './button.module';
import { ButtonService } from './button.service';

let button_service: ButtonService;

describe_with_db(
    'ButtonService',
    [ButtonModule],
    ( context: TestContext ) => {
        button_service = context.module.get<ButtonService>( ButtonService );
    },
    () => {
        it( 'should be defined', () => {
            expect( button_service ).toBeDefined();
        } );
    },
);
