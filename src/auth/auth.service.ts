import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDTO, SignUpDTO } from './DTOs/auth';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'
// Service: responsavel pela regra de negocio do modulo
@Injectable()
export class AuthService {

    constructor(private prismaService: PrismaService) { }

    async signup(data: SignUpDTO) {

        const userAlreadyExits = await this.prismaService.user.findUnique({
            where: { email: data.email }
        })

        if (userAlreadyExits) {
            throw new UnauthorizedException('Este Email já esta Cadastrado')
        }

        const hashedPassword = await bcrypt.hash(data.password, 10)

        const user = await this.prismaService.user.create({
            data: {
                ...data, password: hashedPassword
            }
        })

        return {
            id: user.id,
            name: user.name,
            email: user.email
        }

    }

    async signin(data: SignInDTO) {
        console.log("service", data)
        return "signin"
    }
}
