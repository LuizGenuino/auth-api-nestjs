import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDTO, SignUpDTO } from './DTOs/auth';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
// Service: responsavel pela regra de negocio do modulo
@Injectable()
export class AuthService {

    constructor(private prismaService: PrismaService, private jwtService: JwtService) { }

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
        const user = await this.prismaService.user.findUnique({
            where: { email: data.email }
        })

        if (!user) {
            throw new UnauthorizedException('Credenciais Invalidas')
        }

        const passwordMatch = await bcrypt.compare(data.password, user.password)

        if (!passwordMatch) {
            throw new UnauthorizedException('Credenciais Invalidas')
        }

        const accessToken = await this.jwtService.signAsync({
            id: user.id,
            name: user.name,
            email: user.email
        })

        return {
            data: {
                id: user.id,
                name: user.name,
                email: user.email
            }, 
            token: accessToken
        }
    }
}
