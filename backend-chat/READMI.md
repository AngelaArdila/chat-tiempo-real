# Proyecto Chat en Tiempo Real
Este proyecto usa Node.js, Express y Socket.io para comunicación en tiempo real.

# Backend - Chat Application

## Description
This is the backend for the real-time chat application using Node.js, Express, Socket.io, and MySQL with Sequelize ORM.

## Setup
1. Initialize project: `npm init -y`
2. Install dependencies: `npm install`
3. Configure the database in `config/database.js`
4. Run the server: `npm run debug`

## API Routes
- `/api/chat` - Handles chat-related endpoints

## Database Schema

### Users Table (`users`)
| Column   | Type        | Attributes       |
|----------|------------|-----------------|
| user_id  | INT        | PRIMARY KEY, AUTO_INCREMENT |
| email    | VARCHAR(255) | UNIQUE, NOT NULL |
| password | VARCHAR(255) | NOT NULL |

### Chat Messages Table (`chat_users`)
| Column   | Type        | Attributes       |
|----------|------------|-----------------|
| id       | INT        | PRIMARY KEY, AUTO_INCREMENT |
| user_id  | INT        | FOREIGN KEY (users.user_id), NOT NULL |
| message  | TEXT       | NOT NULL |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

