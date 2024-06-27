Sure, here’s the README with the response parts removed:

```markdown
# Restaurant Reservations

A restaurant reservation system built with Node.js, TypeScript, and Docker.

## Table of Contents

- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Sample Test Cases](#sample-test-cases)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/restaurant-reservations.git
   cd restaurant-reservations
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file with:
   ```plaintext
   PORT=3000
   DATABASE_URL=your_database_url
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

## Testing

Run tests with:
```bash
npm test
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
  "time": "18:00",
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

Replace placeholders like `your-username` and `your_database_url` with actual values specific to your project.
```

This version keeps the README concise and to the point, focusing on installation, running, and testing instructions, along with the sample test cases.
