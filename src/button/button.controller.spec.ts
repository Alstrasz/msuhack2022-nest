import { describe_with_db, TestContext } from 'src/abstract_spec';
import { ButtonController } from './button.controller';
import { ButtonModule } from './button.module';

let button_controller: ButtonController;

describe_with_db(
    'ButtonService',
    [ButtonModule],
    ( context: TestContext ) => {
        button_controller = context.module.get<ButtonController>( ButtonController );
    },
    () => {
        it( 'should be defined', () => {
            expect( button_controller ).toBeDefined();
        } );
    },
);
