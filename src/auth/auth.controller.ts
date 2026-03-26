import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import type { SignInDTO, SignUpDTO } from './DTOs/auth';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

// Controller: define os end points do modulo e recebe os atributos da requisição
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('signup')
    async signup(@Body() body: SignUpDTO) {
        return this.authService.signup(body)
    }

    @Post('signin')
    async signin(@Body() body: SignInDTO) {
        return this.authService.signin(body)
    }

    @UseGuards(AuthGuard)
    @Get('me')
    async me(@Request() request){
        return request.user
    }
}
