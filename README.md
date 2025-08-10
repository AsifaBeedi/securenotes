# Secure Notes Application

A full-stack secure notes application built with React, Node.js, Express, and MongoDB. Features user authentication, encrypted note storage, and a modern responsive UI.

## Features

- 🔐 **Secure Authentication**: JWT-based authentication with bcrypt password hashing
- 📝 **Note Management**: Create, read, update, and delete notes
- 🔒 **Client-side Encryption**: Notes are encrypted on the client side before storage
- 🎨 **Modern UI**: Responsive design with a clean, modern interface
- 🛡️ **Security**: Rate limiting, CORS protection, and security headers
- 📱 **Responsive**: Works on desktop, tablet, and mobile devices

## Tech Stack

### Frontend
- React 18+ with TypeScript
- React Router for navigation
- Axios for API calls
- CryptoJS for client-side encryption
- CSS3 with modern styling

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- Express-validator for input validation
- CORS and security middleware

## Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (local installation or MongoDB Atlas)
- [Git](https://git-scm.com/downloads)

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/AsifaBeedi/securenotes.git
cd securenotes
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
MONGODB_URI=mongodb://localhost:27017/securenotes
JWT_SECRET=your-super-secret-jwt-key-here
PORT=5001
```

**Important**: Change the `JWT_SECRET` to a secure random string in production.

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the frontend directory:

```bash
cp .env.example .env
```

The frontend `.env` should contain:

```env
REACT_APP_API_URL=http://localhost:5001/api
```

### 4. Database Setup

Make sure MongoDB is running on your system:

- **Local MongoDB**: Start MongoDB service
- **MongoDB Atlas**: Update the `MONGODB_URI` in backend/.env with your Atlas connection string

## Running the Application

### Start the Backend Server

```bash
cd backend
npm start
```

The backend server will start on `http://localhost:5001`

### Start the Frontend Development Server

```bash
cd frontend
npm start
```

The frontend will start on `http://localhost:3000` and automatically open in your browser.

## Usage

1. **Register**: Create a new account with username, email, and password
2. **Login**: Sign in with your credentials
3. **Create Notes**: Add new encrypted notes
4. **Manage Notes**: View, edit, or delete your notes
5. **Logout**: Securely log out of your account

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info

### Notes
- `GET /api/notes` - Get all user notes
- `POST /api/notes` - Create a new note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note

## Security Features

- **Password Hashing**: Uses bcrypt with salt rounds for secure password storage
- **JWT Authentication**: Stateless authentication with secure tokens
- **Client-side Encryption**: Notes are encrypted before being sent to the server
- **Input Validation**: Server-side validation for all inputs
- **Rate Limiting**: Protection against brute force attacks
- **CORS Protection**: Configured for specific origins
- **Security Headers**: Helmet.js for additional security headers

## Environment Variables

### Backend (.env)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token signing
- `PORT`: Server port (default: 5001)

### Frontend (.env)
- `REACT_APP_API_URL`: Backend API base URL

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Troubleshooting

### Common Issues

1. **Connection Refused**: Make sure MongoDB is running and the connection string is correct
2. **Port Already in Use**: Change the PORT in backend/.env if 5001 is occupied
3. **CORS Errors**: Verify the frontend URL is allowed in backend CORS configuration
4. **JWT Errors**: Ensure JWT_SECRET is set in backend/.env

### Development Tips

- Check browser console for frontend errors
- Check terminal output for backend errors
- Verify MongoDB connection in MongoDB Compass or CLI
- Test API endpoints with tools like Postman or curl

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

Built with ❤️ by [AsifaBeedi](https://github.com/AsifaBeedi) - Encrypted Note Taking Application

**Version:** 1.0.0  
**Release Date:** January 2025  
**Author:** Asifa Bandulal Beedi  
**License:** MIT

## Project Overview

Secure Notes is a full-stack web application that enables users to create, edit, and store notes with client-side AES-256 encryption. The application implements a zero-knowledge architecture where all encryption occurs on the client side before data transmission, ensuring complete privacy and security of user data.

## Architecture and Design Decisions

### Zero-Knowledge Architecture
The application follows a zero-knowledge security model where the server never has access to unencrypted user data. All note content is encrypted using AES-256 encryption in the browser before being transmitted to the server. This approach ensures that even if the server is compromised, user data remains secure.

### Client-Side Encryption Implementation
- **Algorithm**: AES-256-CBC with PBKDF2 key derivation
- **Process**: User password generates encryption keys using PBKDF2 with salt
- **Security**: Each note is encrypted with a unique initialization vector (IV)
- **Storage**: Only encrypted data is stored in the database

### Authentication System
- **Method**: JSON Web Tokens (JWT) for stateless authentication
- **Security**: Passwords are hashed using bcrypt with 12 salt rounds
- **Session Management**: Tokens expire after 7 days and are stored in localStorage
- **Protection**: Rate limiting prevents brute force attacks

## Technology Stack and Justifications

### Backend Technologies

**Node.js with Express.js**
- **Rationale**: JavaScript ecosystem consistency across frontend and backend
- **Benefits**: Non-blocking I/O for handling concurrent connections, extensive npm ecosystem
- **Performance**: Event-driven architecture handles multiple users efficiently

**MongoDB**
- **Rationale**: Document-based storage naturally fits encrypted note data structure
- **Flexibility**: Schema-less design allows easy feature expansion
- **Scalability**: Built-in sharding capabilities for horizontal scaling
- **Integration**: JSON-like documents integrate seamlessly with JavaScript

**JWT Authentication**
- **Stateless**: No server-side session storage required
- **Scalable**: Works well in distributed systems and microservices
- **Standard**: Industry-standard with broad library support
- **Security**: Configurable expiration and secure signing

### Frontend Technologies

**React with TypeScript**
- **Type Safety**: TypeScript catches errors at compile-time, reducing runtime bugs
- **Component Architecture**: Reusable components promote maintainable code
- **Developer Experience**: Enhanced IDE support with autocomplete and refactoring
- **Ecosystem**: Large community and extensive library support

**Crypto-js Library**
- **Client-Side Encryption**: Reliable cryptographic operations in the browser
- **AES-256 Support**: Industry-standard encryption algorithm
- **Key Derivation**: PBKDF2 support for secure key generation
- **Battle-Tested**: Well-established library with security audits

## Features Implementation

### Core Security Features

**Client-Side Encryption Process**
1. User enters master password on dashboard access
2. Password is used to derive encryption keys using PBKDF2
3. Note content is encrypted with AES-256-CBC before API calls
4. Server stores only encrypted data with metadata
5. Decryption occurs only in the browser when notes are retrieved

**Authentication Flow**
1. User registration with username, email, and password validation
2. Password hashing with bcrypt (12 salt rounds) before database storage
3. JWT token generation upon successful authentication
4. Token-based API authentication for protected routes
5. Automatic token refresh and logout on expiration

### Application Features

**Note Management**
- Create, read, update, and delete encrypted notes
- Rich text editing with Markdown support and live preview
- Tag-based organization system for note categorization
- Search functionality across note titles and tags
- Note sharing with expirable share links

**User Interface**
- Responsive design for desktop and mobile devices
- Master password prompt for encryption key derivation
- Real-time Markdown preview in note editor
- Tag management with add/remove functionality
- Search and filtering capabilities

**Security Measures**
- Rate limiting on API endpoints (100 requests per 15 minutes)
- Input validation using express-validator
- CORS configuration for cross-origin request protection
- Helmet.js for security headers implementation
- MongoDB injection prevention through parameterized queries

## Database Schema Design

### User Model
```javascript
{
  username: String (3-20 characters, alphanumeric + underscore)
  email: String (unique, validated)
  password: String (bcrypt hashed)
  timestamps: CreatedAt, UpdatedAt
}
```

### Note Model
```javascript
{
  title: String (max 200 characters)
  encryptedContent: String (AES-256 encrypted)
  author: ObjectId (reference to User)
  tags: Array of Strings (max 10 tags, 50 chars each)
  isShared: Boolean
  shareToken: String (for shared notes)
  shareExpiresAt: Date (expiration for shared notes)
  timestamps: CreatedAt, UpdatedAt
}
```

## API Endpoints

### Authentication Routes
- `POST /api/auth/register` - User registration with validation
- `POST /api/auth/login` - User authentication and token generation
- `GET /api/auth/me` - Get current user information (protected)

### Notes Routes
- `GET /api/notes` - Retrieve user notes with pagination and search
- `GET /api/notes/:id` - Get specific note with encrypted content
- `POST /api/notes` - Create new encrypted note
- `PUT /api/notes/:id` - Update existing note
- `DELETE /api/notes/:id` - Delete note
- `POST /api/notes/:id/share` - Generate shareable link for note
- `GET /api/notes/shared/:token` - Access shared note via token

## Security Considerations

### Encryption Security
- **Key Derivation**: PBKDF2 with 1000 iterations and random salt
- **Algorithm**: AES-256-CBC with random initialization vectors
- **Key Management**: Encryption keys never transmitted to server
- **Data Protection**: Server cannot decrypt user content

### Authentication Security
- **Password Storage**: bcrypt hashing with 12 salt rounds
- **Token Security**: JWT tokens with configurable expiration
- **Session Management**: Automatic logout on token expiration
- **Brute Force Protection**: Rate limiting on authentication endpoints

### Application Security
- **Input Validation**: Comprehensive validation using express-validator
- **XSS Prevention**: Content Security Policy headers via Helmet.js
- **CSRF Protection**: JWT tokens and secure cookie handling
- **SQL Injection Prevention**: MongoDB parameterized queries

## Installation and Setup

### Prerequisites
- Node.js (version 16 or higher)
- MongoDB (local installation or Atlas cloud service)
- Git for version control

### Backend Setup
```bash
cd backend
npm install
```

Create `.env` file in backend directory:
```env
PORT=5001
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/secure-notes
JWT_SECRET=your-super-secure-jwt-secret-key-at-least-32-characters-long
CLIENT_URL=http://localhost:3001
```

### Frontend Setup
```bash
cd frontend
npm install
```

Create `.env` file in frontend directory:
```env
REACT_APP_API_URL=http://localhost:5001/api
```

### Running the Application
Start backend server:
```bash
cd backend
npm run dev
```

Start frontend server:
```bash
cd frontend
npm start
```

Access the application at `http://localhost:3001`

## Project Structure
```
secure-notes/
├── backend/
│   ├── models/          # MongoDB schemas (User, Note)
│   ├── routes/          # API endpoints (auth, notes)
│   ├── middleware/      # Authentication middleware
│   ├── server.js        # Express server configuration
│   ├── package.json     # Backend dependencies
│   └── .env             # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/  # React components (NoteCard, NoteEditor, etc.)
│   │   ├── pages/       # Page components (Login, Register, Dashboard)
│   │   ├── services/    # API service layer
│   │   ├── utils/       # Encryption utilities
│   │   ├── context/     # React context (AuthContext)
│   │   └── App.tsx      # Main application component
│   ├── public/          # Static assets
│   ├── package.json     # Frontend dependencies
│   └── .env             # Environment variables
└── README.md
```

## Development Considerations

### Code Quality
- TypeScript implementation for type safety
- ESLint configuration for code consistency
- Component-based architecture for maintainability
- Separation of concerns between UI and business logic

### Performance Optimizations
- Lazy loading of components where appropriate
- Efficient re-rendering with React hooks
- Database indexing on frequently queried fields
- Connection pooling for database operations

### Scalability Considerations
- Stateless authentication for horizontal scaling
- Document-based database design for flexible schema evolution
- Modular architecture for feature additions
- Environment-based configuration for different deployments

## Testing Strategy

### Backend Testing
- Unit tests for authentication middleware
- Integration tests for API endpoints
- Validation testing for input sanitization
- Error handling verification

### Frontend Testing
- Component unit tests with React Testing Library
- Integration tests for user workflows
- Encryption/decryption functionality testing
- Authentication flow testing

## Deployment Considerations

### Production Environment
- Environment variable configuration for sensitive data
- HTTPS enforcement for secure data transmission
- Database connection security with authentication
- Log management and monitoring setup

### Security Hardshell
- Regular dependency updates for security patches
- Security audit of encryption implementation
- Penetration testing of authentication system
- Monitoring and alerting for suspicious activities

## Future Enhancements

### Additional Features
- Two-factor authentication implementation
- Note version history and backup system
- Collaborative editing with end-to-end encryption
- Mobile application development
- Advanced search with full-text indexing

### Performance Improvements
- Caching layer implementation with Redis
- CDN integration for static assets
- Database query optimization
- Progressive web app (PWA) features

### Security Enhancements
- Hardware security key support
- Advanced threat detection
- Audit logging system
- Compliance with security standards (SOC 2, ISO 27001)

## Author
Asifa Bandulal Beedi

## License
This project is licensed under the MIT License.
## Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

Built with ❤️ by [AsifaBeedi](https://github.com/AsifaBeedi)
