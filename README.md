# 💰 Personal Finance Dashboard

A modern, full-stack web application for managing personal finances with user authentication, transaction tracking, and insightful analytics. Built with React, Flask, and PostgreSQL.

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Flask](https://img.shields.io/badge/Flask-3.0.0-lightgrey)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC)
![Vite](https://img.shields.io/badge/Vite-7.1.2-646CFF)

## 📷 Preview
<img src="https://github.com/yahya-mohamed-1/personal-finance-dashboard/blob/main/src/assets/images/personal_finance_dashboard.png" width="75%">

## ✨ Features

- 🔐 **User Authentication**: Secure login, registration, and password reset
- 📊 **Dashboard Analytics**: Visual charts and insights for financial data
- 💳 **Transaction Management**: Add, edit, and delete income/expense transactions
- 📈 **Financial Reports**: Generate CSV and PDF reports with transaction history
- 🎨 **Modern UI**: Responsive design with Tailwind CSS and Framer Motion animations
- 🔒 **Protected Routes**: JWT-based authentication for secure access
- 📧 **Email Notifications**: Password reset via email
- ☀🌙 **Theme Toggle**: Supports both light and dark modes

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern JavaScript library for building user interfaces
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library for React
- **React Router** - Declarative routing for React
- **Recharts** - Composable charting library
- **Axios** - HTTP client for API requests
- **Lucide React** - Beautiful & consistent icon toolkit
- **jsPDF** - Client-side PDF generation

### Backend
- **Flask 3.0** - Lightweight WSGI web application framework
- **SQLAlchemy** - SQL toolkit and Object-Relational Mapping
- **PostgreSQL** - Advanced open-source relational database
- **Flask-JWT-Extended** - JWT authentication extension
- **Flask-Bcrypt** - Password hashing extension
- **Flask-CORS** - Cross-Origin Resource Sharing
- **Flask-Mail** - Email sending extension
- **Alembic** - Database migration tool

### DevOps & Tools
- **Docker** - Containerization platform
- **Docker Compose** - Multi-container orchestration
- **ESLint** - JavaScript linting utility
- **PostCSS** - CSS processing tool
- **Autoprefixer** - CSS vendor prefixing

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **Python** (v3.8 or higher)
- **PostgreSQL** (v15 or higher) or **Docker**
- **Git**

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/personal-finance-dashboard.git
cd personal-finance-dashboard
```

### 2. Backend Setup

#### Option A: Using Docker (Recommended)

```bash
cd backend
docker-compose up -d
```

#### Option B: Local Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run database migrations
python manage.py db upgrade

# Start the Flask server
python manage.py runserver
```

### 3. Frontend Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## 🏗️ Building for Production

### Frontend
```bash
npm run build
npm run preview  # Preview production build
```

### Backend
```bash
# Using Docker
docker-compose -f docker-compose.prod.yml up -d

# Or using Python
export FLASK_ENV=production
python manage.py runserver
```

## 📁 Project Structure

```
personal-finance-dashboard/
├── backend/
│   ├── app.py                 # Flask application factory
│   ├── models.py              # SQLAlchemy models
│   ├── auth.py                # Authentication routes
│   ├── finance.py             # Finance-related routes
│   ├── config.py              # Configuration settings
│   ├── requirements.txt       # Python dependencies
│   ├── docker-compose.yml     # Docker configuration
│   └── migrations/            # Database migrations
├── src/
│   ├── components/            # Reusable React components
│   ├── pages/                 # Page components
│   ├── App.jsx                # Main application component
│   └── api.js                 # API client configuration
├── public/                    # Static assets
├── package.json               # Node.js dependencies
├── vite.config.js             # Vite configuration
└── tailwind.config.js         # Tailwind CSS configuration
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `backend/` directory:

```env
SECRET_KEY=your-secret-key-here
JWT_SECRET_KEY=your-jwt-secret-here
DATABASE_URL=postgresql://user:password@localhost:5432/finance_db
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USE_TLS=True
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
FRONTEND_URL=http://localhost:5173
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License + Commons Clause - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Flask](https://flask.palletsprojects.com/) - The Python micro framework for building web applications
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Recharts](https://recharts.org/) - A composable charting library built on React components

---

Made with ❤️ by Yahya Mohamed 😎💯

Don't forget to please star the repo and share with others.
