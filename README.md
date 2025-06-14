# EasyGen Authentication System

A complete full-stack authentication solution built with modern technologies. This project provides a production-ready authentication system with a beautiful React frontend and a secure NestJS backend.

## 🚀 Project Overview

This is a monorepo containing both frontend and backend applications for a comprehensive authentication system:

- **Frontend**: Modern React application with TypeScript, Vite, and shadcn/ui components
- **Backend**: NestJS API with MongoDB, JWT authentication, and comprehensive security features

## 🏗️ Architecture

```
EasyGen-Task/
├── frontend/                 # React + TypeScript + Vite + shadcn/ui
│   ├── src/
│   │   ├── components/      # React components (UI + Pages)
│   │   ├── contexts/        # Authentication context
│   │   ├── services/        # API client
│   │   └── lib/            # Utilities
│   └── README.md           # Frontend documentation
├── backend/                 # NestJS + MongoDB + JWT
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── users/          # User management
│   │   ├── common/         # Shared utilities
│   │   └── config/         # Configuration
│   └── README.md           # Backend documentation
└── README.md               # This file
```

## ✨ Features

### 🎨 Frontend Features
- **Modern UI**: Beautiful interface built with shadcn/ui components
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Real-time Validation**: Form validation with react-hook-form and Zod
- **Toast Notifications**: User feedback with react-hot-toast
- **Protected Routes**: Route-based authentication
- **JWT Management**: Automatic token handling and refresh

### 🔐 Backend Features
- **JWT Authentication**: Secure token-based authentication
- **Password Security**: BCrypt hashing with salt rounds
- **MongoDB Integration**: Mongoose ODM with proper schemas
- **Input Validation**: Comprehensive validation with class-validator
- **Security Middleware**: Helmet, CORS, and rate limiting ready
- **Error Handling**: Global exception filters

### 🛡️ Security Features
- **Strong Password Policy**: Enforced password requirements
- **Secure Headers**: Security middleware implementation
- **Input Sanitization**: Protection against common attacks
- **JWT Security**: Proper token handling and validation
- **Environment Configuration**: Secure configuration management

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- pnpm (package manager)
- MongoDB (local or cloud instance)

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/EasyGen-Task.git
cd EasyGen-Task
```

### 2. Backend Setup
```bash
cd backend
pnpm install

# Create .env file
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Start the backend
pnpm run start:dev
```

### 3. Frontend Setup
```bash
cd frontend
pnpm install

# Start the frontend
pnpm dev
```

### 4. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **API Documentation**: http://localhost:3001/api/docs (when implemented)

## 🔧 Environment Configuration

### Backend Environment Variables
Create a `.env` file in the `backend` directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/easygen-auth

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Application
PORT=3001
NODE_ENV=development

# CORS
FRONTEND_URL=http://localhost:5173
```

### Frontend Configuration
The frontend is configured to connect to `http://localhost:3001` by default. To change this, update the `API_BASE_URL` in `frontend/src/services/api.ts`.

## 📚 API Endpoints

### Authentication
- `POST /auth/signup` - User registration
- `POST /auth/signin` - User login
- `GET /auth/profile` - Get user profile (protected)

### Application
- `GET /` - API welcome message and information

## 🎯 Password Requirements

The system enforces strong password security:
- Minimum 8 characters
- At least one uppercase letter (A-Z)
- At least one lowercase letter (a-z)
- At least one number (0-9)
- At least one special character (@$!%*#?&)
- Maximum 128 characters

## 🧪 Testing

### Backend Testing
```bash
cd backend
pnpm test          # Unit tests
pnpm test:e2e      # End-to-end tests
pnpm test:cov      # Coverage report
```

### Frontend Testing
```bash
cd frontend
pnpm test          # Unit tests (when implemented)
```

## 📱 Application Flow

### 1. User Registration
1. User visits `/signup`
2. Fills out registration form with validation
3. Backend creates user with hashed password
4. JWT token returned and stored
5. User redirected to dashboard

### 2. User Login
1. User visits `/signin`
2. Enters credentials with validation
3. Backend validates credentials
4. JWT token returned and stored
5. User redirected to dashboard

### 3. Protected Access
1. User navigates to protected routes
2. JWT token automatically attached to requests
3. Backend validates token
4. Access granted or redirected to login

## 🚀 Production Deployment

### Backend Deployment
1. Set production environment variables
2. Use production-grade MongoDB
3. Configure proper CORS settings
4. Set up SSL/TLS termination
5. Implement rate limiting
6. Use PM2 or similar for process management

### Frontend Deployment
1. Build the application: `pnpm build`
2. Deploy to Vercel, Netlify, or similar
3. Update API URL for production
4. Configure environment variables

## 🛠️ Development

### Project Structure
- **Monorepo Setup**: Both frontend and backend in one repository
- **Independent Packages**: Each has its own dependencies and scripts
- **Shared Documentation**: Comprehensive READMEs for each part

### Code Quality
- **TypeScript**: Full type safety across the stack
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting (when configured)
- **Git Hooks**: Pre-commit validation (when implemented)

## 📄 Documentation

- [Frontend Documentation](./frontend/README.md)
- [Backend Documentation](./backend/README.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

### Frontend Technologies
- [React](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev/) - Build tool
- [shadcn/ui](https://ui.shadcn.com/) - Component library
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [React Hook Form](https://react-hook-form.com/) - Form handling
- [Zod](https://zod.dev/) - Schema validation

### Backend Technologies
- [NestJS](https://nestjs.com/) - Node.js framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Mongoose](https://mongoosejs.com/) - ODM
- [JWT](https://jwt.io/) - Authentication
- [BCrypt](https://github.com/kelektiv/node.bcrypt.js) - Password hashing
- [Class Validator](https://github.com/typestack/class-validator) - Validation

## 📊 Project Stats

- **Languages**: TypeScript, JavaScript
- **Frontend Framework**: React 19
- **Backend Framework**: NestJS
- **Database**: MongoDB
- **Authentication**: JWT
- **UI Library**: shadcn/ui
- **Styling**: Tailwind CSS
- **Package Manager**: pnpm

---

Built with ❤️ for secure and modern authentication
