# EasyGen Authentication Backend

A production-ready authentication API built with NestJS, MongoDB, and JWT. This backend provides secure user registration, login, and protected endpoints with comprehensive validation and logging.

## 🚀 Features

- **User Authentication**: Secure signup and signin with JWT tokens
- **Password Security**: BCrypt hashing with salt rounds
- **Input Validation**: Comprehensive validation with class-validator
- **API Documentation**: Interactive Swagger/OpenAPI documentation
- **Database**: MongoDB with Mongoose ODM
- **Security**: CORS configuration, input sanitization
- **Logging**: Structured logging for monitoring and debugging
- **Production Ready**: Environment-based configuration

## 📋 Prerequisites

- Node.js (v18 or higher)
- pnpm (package manager)
- MongoDB (local or cloud instance)

## 🛠️ Installation

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Environment Setup:**
   Create a `.env` file in the root directory:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/easygen-auth
   
   # JWT
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=7d
   
   # App
   PORT=3001
   NODE_ENV=development
   
   # CORS
   FRONTEND_URL=http://localhost:5173
   ```

## 🚀 Running the Application

```bash
# Development mode with hot-reload
pnpm run start:dev

# Production mode
pnpm run start:prod

# Debug mode
pnpm run start:debug
```

The API will be available at:
- **API Base URL**: `http://localhost:3001`
- **API Documentation**: `http://localhost:3001/api/docs`

## 📚 API Endpoints

### Authentication
- `POST /auth/signup` - User registration with name, email, and password
- `POST /auth/signin` - User login with email and password
- `GET /auth/profile` - Get authenticated user profile (JWT protected)

### Application
- `GET /` - Welcome message and API status

## 📋 API Usage Examples

### User Registration
```bash
curl -X POST http://localhost:3001/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "SecurePass123!"
  }'
```

**Response:**
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john.doe@example.com"
  },
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### User Login
```bash
curl -X POST http://localhost:3001/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "SecurePass123!"
  }'
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Access Protected Endpoint
```bash
curl -X GET http://localhost:3001/auth/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response:**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john.doe@example.com"
}
```

## 🔒 Password Requirements

Our password validation enforces strong security standards:

- **Minimum Length**: 8 characters
- **Uppercase Letter**: At least one (A-Z)
- **Lowercase Letter**: At least one (a-z)
- **Number**: At least one digit (0-9)
- **Special Character**: At least one (@$!%*#?&)
- **Maximum Length**: 128 characters

**Example Valid Passwords:**
- `SecurePass123!`
- `MyStrong@Pass1`
- `Complex#Password2024`

**Regex Pattern Used:**
```javascript
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/
```

## 🧪 Testing

```bash
# Unit tests
pnpm run test

# End-to-end tests
pnpm run test:e2e

# Test coverage
pnpm run test:cov

# Watch mode
pnpm run test:watch
```

## 📁 Project Structure

```
src/
├── auth/                 # Authentication module
│   ├── dto/             # Data transfer objects
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   ├── jwt.strategy.ts
│   └── jwt-auth.guard.ts
├── users/               # Users module
│   ├── dto/
│   ├── user.schema.ts
│   ├── users.service.ts
│   └── users.module.ts
├── config/              # Configuration
│   └── configuration.ts
├── app.module.ts        # Root module
└── main.ts             # Application entry point
```

## 🔧 Configuration

The application uses environment variables for configuration. Key settings:

- **MONGODB_URI**: MongoDB connection string
- **JWT_SECRET**: Secret key for JWT token signing
- **JWT_EXPIRES_IN**: Token expiration time
- **PORT**: Application port (default: 3001)
- **FRONTEND_URL**: Frontend URL for CORS

## 🛡️ Security Features

- **Password Hashing**: BCrypt with salt rounds for secure password storage
- **JWT Tokens**: Stateless authentication with configurable expiration
- **Input Validation**: Comprehensive validation using class-validator
- **CORS Protection**: Configurable CORS settings
- **Rate Limiting**: Ready for implementation with @nestjs/throttler

## 📝 Logging

The application includes structured logging for:
- Authentication attempts (success/failure)
- API endpoint access
- Error tracking and debugging
- Performance monitoring

## 🚀 Production Deployment

For production deployment:

1. Set secure environment variables
2. Use a production-grade MongoDB instance
3. Configure proper CORS settings
4. Set up SSL/TLS termination
5. Implement rate limiting
6. Use PM2 or similar for process management
7. Set up monitoring and logging aggregation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
