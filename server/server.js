const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const pool = require('./db');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/../public')); // serve front-end

// Get messages
app.get('/api/messages', async (req, res) => {
  const groupId = Number(req.query.group_id) || 1;
  try {
    const [rows] = await pool.query(
      'SELECT * FROM messages WHERE group_id = ? ORDER BY created_at ASC LIMIT 1000',
      [groupId]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'db error' });
  }
});

// Socket.IO
io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  socket.on('join_group', (groupId = 1) => {
    socket.join(`group_${groupId}`);
  });

  socket.on('send_message', async (msg) => {
    const { group_id = 1, client_id = null, user_name = 'Anonymous', anonymous = 0, text = '' } = msg;
    if (!text) return;

    try {
      const [result] = await pool.query(
        'INSERT INTO messages (group_id, client_id, user_name, anonymous, text) VALUES (?,?,?,?,?)',
        [group_id, client_id, user_name, anonymous ? 1 : 0, text]
      );
      const [rows] = await pool.query('SELECT * FROM messages WHERE id = ?', [result.insertId]);
      io.to(`group_${group_id}`).emit('message', rows[0]);
    } catch (err) {
      console.error('send_message error', err);
    }
  });

  socket.on('disconnect', () => console.log('Socket disconnected:', socket.id));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
