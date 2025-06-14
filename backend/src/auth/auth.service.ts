import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { SignInDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    this.logger.log(`Sign up attempt for email: ${createUserDto.email}`);
    
    try {
      const user = await this.usersService.create(createUserDto);
      
      const payload = { email: user.email, sub: user._id, name: user.name };
      const accessToken = this.jwtService.sign(payload);

      this.logger.log(`User successfully signed up: ${user.email}`);
      
      return {
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
        accessToken,
      };
    } catch (error) {
      this.logger.error(`Sign up failed for email: ${createUserDto.email}`, error.stack);
      throw error;
    }
  }
  async signIn(signInDto: SignInDto) {
    this.logger.log(`Sign in attempt for email: ${signInDto.email}`);
    
    try {
      const user = await this.usersService.findByEmailWithPassword(signInDto.email);
      
      if (!user) {
        this.logger.warn(`Sign in failed - user not found: ${signInDto.email}`);
        throw new UnauthorizedException('Invalid credentials');
      }

      const isPasswordValid = await this.usersService.validatePassword(
        signInDto.password,
        user.password,
      );

      if (!isPasswordValid) {
        this.logger.warn(`Sign in failed - invalid password: ${signInDto.email}`);
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = { email: user.email, sub: user._id, name: user.name };
      const accessToken = this.jwtService.sign(payload);

      this.logger.log(`User successfully signed in: ${user.email}`);
      
      return {
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
        accessToken,
      };
    } catch (error) {
      this.logger.error(`Sign in failed for email: ${signInDto.email}`, error.stack);
      throw error;
    }
  }
}
