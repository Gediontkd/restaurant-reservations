# Restaurant Reservations

A RESTful API for managing restaurant reservations, built with Node.js, TypeScript, and Docker.

## Table of Contents

- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Sample Test Cases](#sample-test-cases)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/restaurant-reservations.git
   cd restaurant-reservations


2. **Install dependencies:**
   ```bash
   npm install
   ```
   
## Running the Application

### Using Docker

1. **Build and start containers:**
   ```bash
   docker-compose up --build
   ```

### Running Locally

1. **Start the application:**
   ```bash
   npm start
   ```

## Sample Test Cases

### 1. Create a User
**Request:**
```json
{
  "name": "gedion",
  "email": "gedion@gmail.com"
}
```

### 2. Make a Reservation
**Request:**
```json
{
  "email": "gedion@gmail.com",
  "date": "2024-07-01",
  "time": "19:00",
  "tableNumber": 1
}
```

### 3. Reservation Conflict
**Request:**
```json
{
  "email": "gedion@gmail.com",
  "date": "2024-07-01",
  "time": "19:00",
  "tableNumber": 1
}
```

### 4. Invalid Table Number
**Request:**
```json
{
  "email": "john.doe@example.com",
  "date": "2024-07-01",
  "time": "19:00",
  "tableNumber": 6
}
```

### 4. Invalid Time
**Request:**
```json
{
  "email": "john.doe@example.com",
  "date": "2024-07-01",
  "time": "16:00",
  "tableNumber": 6
}
```
