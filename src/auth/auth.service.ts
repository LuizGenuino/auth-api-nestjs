import { Injectable } from '@nestjs/common';
import { SignInDTO, SignUpDTO } from './DTOs/auth';

// Service: responsavel pela regra de negocio do modulo
@Injectable()
export class AuthService {
    async signup(data: SignUpDTO){
        console.log("service", data)
        return "signup"
    }

    async signin (data: SignInDTO){
        console.log("service", data)
        return "signin"
    }
}
