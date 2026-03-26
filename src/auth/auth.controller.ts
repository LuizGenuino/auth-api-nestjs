import { Body, Controller, Post } from '@nestjs/common';
import type { SignInDTO, SignUpDTO } from './DTOs/auth';

// Controller: define os end points do modulo e recebe os atributos da requisição
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthController) { }

    @Post('signup')
    async signup(@Body() body: SignUpDTO) {
        return this.authService.signup(body)
    }

    @Post('signin')
    async signin(@Body() body: SignInDTO) {
        this.authService.signin(body)

        return body
    }
}
