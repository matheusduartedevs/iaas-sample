const fsWorker = require('fs');
const nodemailer = require('nodemailer');
require('dotenv').config();

const QUEUE_FILE = './queue.json';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function processQueue() {
  if (!fsWorker.existsSync(QUEUE_FILE)) return;
  const queue = JSON.parse(fsWorker.readFileSync(QUEUE_FILE));
  if (queue.length === 0) return;

  const [first, ...rest] = queue;
  console.log(`Enviando email para ${first.email}...`);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: first.email,
    subject: 'Mensagem Recebida!',
    text: 'Obrigado por se cadastrar. Este é um teste de envio automático de e-mails via Render!'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erro ao enviar email:', error);
    } else {
      console.log('Email enviado:', info.response);
      fsWorker.writeFileSync(QUEUE_FILE, JSON.stringify(rest, null, 2));
    }
  });
}

setInterval(processQueue, 5000);