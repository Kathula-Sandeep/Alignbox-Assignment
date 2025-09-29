# Fun Friday Group Chat

A real-time group chat application built with Node.js, Express, Socket.IO, and MySQL. Users can send messages, toggle anonymous mode. a static HTML/CSS/JS frontend which is responsive and served from the `public` folder. It demonstrates basic CRUD operations and replicates the chat UI as per the provided Figma design.

---

## Features

- **Real-time Messaging:** Instant message delivery using Socket.IO.
- **Anonymous Messaging:** Toggle to hide your username when sending messages.
- **Group Chat Support:** Default `group_id = 1`, easily extendable for multiple groups.
- **Photo & Link Attachments:** Attach images or URLs to your messages.
- **Message History:** Fetches the last 1000 messages from the MySQL database.
- **Responsive UI:** Optimized for desktop and mobile (390x812px container).

---

## Project Structure

```
project-root/
├─ public/              # Frontend files (HTML, CSS, JS)
│  ├─ index.html
│  ├─ css/
│  │   └─ styles.css
│  └─ js/
│      └─ app.js
├─ server/              # Backend files
│  ├─ index.js          # Main Express + Socket.IO server
│  └─ db.js             # MySQL connection pool
├─ sql/                 # Database files
│  └─ init.sql          # Schema and initial data
├─ .env                 # Environment variables (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, PORT)
├─ package.json
└─ README.md
```

- **public/**: Contains all frontend assets (HTML, CSS, JS).
- **server/**: Node.js backend with Express and Socket.IO, plus MySQL connection logic.
- **sql/**: Database schema and initial data for MySQL.
- **.env**: Stores environment variables for database and server configuration.
- **package.json**: Project metadata and dependencies.

---

## Environment Variables

Create a `.env` file in the project root with the following content:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=chat_app
PORT=3000
```

Update these values to match your MySQL setup.

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-folder>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up the Database

- Ensure MySQL is running.
- Create the database and tables using the provided SQL script:

```bash
mysql -u <DB_USER> -p < sql/init.sql
```

### 4. Configure Environment Variables

- Edit `.env` to match your database credentials and desired port.

### 5. Start the Server

```bash
node server/index.js
```

- The server will start on [http://localhost:3000](http://localhost:3000).

---

## Usage Guide

1. **Open your browser** and go to [http://localhost:3000](http://localhost:3000)
2. **Send a message:** Type in the input box and click Send.
3. **Toggle Anonymous mode:** Click the Anonymous toggle to hide your name.
4. **View messages:** Messages appear in real-time for all connected users.

---

## Database Details

Messages are stored in the MySQL database with the following fields:

| Field      | Type      | Description                       |
|------------|-----------|-----------------------------------|
| id         | INT       | Primary key, auto-increment       |
| group_id   | INT       | Group identifier (default: 1)     |
| client_id  | VARCHAR   | Unique client/session ID          |
| user_name  | VARCHAR   | Username (nullable if anonymous)  |
| anonymous  | BOOLEAN   | Whether message is anonymous      |
| text       | TEXT      | Message content                   |

- The app fetches the last 1000 messages for each group on load.
- Default group is `group_id = 1`, but the schema supports multiple groups.

---

## Additional Notes

- The frontend UI is optimized for a 390x812px container, but is responsive for other devices.
- Socket.IO handles real-time message broadcasting to the correct group.
- The database schema is extendable for multiple groups and additional features.

### Screenshots

<!-- Add screenshots or GIFs here -->

---

## Dependencies

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Socket.IO](https://socket.io/)
- [MySQL](https://www.mysql.com/)
- [dotenv](https://www.npmjs.com/package/dotenv)

---


## Features

Chat UI developed as per Figma design
Node.js backend with MySQL integration
Basic CRUD operations (sending & retrieving messages)
Responsive and clean design

## License

This project was developed as part of the Alignbox Internship Assignment and is intended for educational and demonstration purposes only.
## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes and commit with clear messages
4. Push to your branch and open a Pull Request

Please follow code style guidelines and add documentation for new features.

---
