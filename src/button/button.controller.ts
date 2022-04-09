import { Controller } from '@nestjs/common';
import { ButtonService } from './button.service';

@Controller( 'button' )
export class ButtonController {
    constructor ( private button_service: ButtonService ) {}
}
