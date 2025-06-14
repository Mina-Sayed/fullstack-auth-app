import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import * as compression from 'compression';
import * as express from 'express';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  // Global exception filter for consistent error handling
  app.useGlobalFilters(new AllExceptionsFilter());

  // Security middleware
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
  }));
  // Compression middleware
  app.use(compression());

  // Body parser configuration
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));

  // Global validation pipe with security settings
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties that don't have decorators
      forbidNonWhitelisted: true, // Throw error for non-whitelisted properties
      transform: true, // Auto-transform payloads to DTO instances
      disableErrorMessages: process.env.NODE_ENV === 'production', // Hide validation details in production
      forbidUnknownValues: true, // Prevent unknown object types
      transformOptions: {
        enableImplicitConversion: true, // Allow implicit type conversion
      },
    }),
  );  // CORS configuration with security best practices
  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        configService.get<string>('cors.origin'),
        'http://localhost:3000', // Allow common dev ports
        'http://localhost:5173',
        'http://localhost:5174',
        'http://127.0.0.1:5173', // localhost alternatives
        'http://127.0.0.1:3000',
      ];
      
      // In development, be more permissive
      if (process.env.NODE_ENV === 'development') {
        // Allow requests with no origin (mobile apps, Postman, etc.)
        if (!origin) {
          return callback(null, true);
        }
        
        // Allow any localhost/127.0.0.1 origin in development
        if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
          return callback(null, true);
        }
      }
      
      // Allow requests from allowed origins
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        logger.warn(`CORS blocked request from origin: ${origin}`);
        callback(new Error(`CORS policy violation: Origin ${origin} not allowed`));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true,
    maxAge: 86400, // 24 hours
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  // Swagger API Documentation with security schemes
  const config = new DocumentBuilder()
    .setTitle('EasyGen Authentication API')
    .setDescription('Production-ready authentication API with JWT, comprehensive validation, and security best practices')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addTag('Authentication', 'User authentication endpoints')
    .addTag('Application', 'General application endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
    customSiteTitle: 'EasyGen API Docs',
  });

  const port = configService.get<number>('port');
  await app.listen(port);
  
  logger.log(`🚀 Application is running on: http://localhost:${port}`);
  logger.log(`📚 API Documentation: http://localhost:${port}/api/docs`);
  logger.log(`🛡️  Security headers enabled with Helmet`);
  logger.log(`📦 Response compression enabled`);
  logger.log(`🔒 CORS configured for: ${configService.get<string>('cors.origin')}`);
  logger.log(`⚡ Rate limiting active - Multiple tiers configured`);
  logger.log(`🔍 Global exception filter active`);
}

bootstrap();
