const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

const QUEUE_FILE = './queue.json';

const addToQueue = (email) => {
  const queue = fs.existsSync(QUEUE_FILE) ? JSON.parse(fs.readFileSync(QUEUE_FILE)) : [];
  queue.push({ email, timestamp: new Date().toISOString() });
  fs.writeFileSync(QUEUE_FILE, JSON.stringify(queue, null, 2));
};

app.post('/send-email', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });
  addToQueue(email);
  res.json({ success: true, message: 'Email added to queue' });
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));