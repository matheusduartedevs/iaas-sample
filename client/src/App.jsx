import { useState } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      setMessage(data.success ? 'Email enviado para a fila!' : 'Erro ao enviar.');
      setEmail('');
    } catch (err) {
      console.error(err);
      setMessage('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Envio de Email</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu email"
          required
          style={{ padding: '0.5rem', marginRight: '1rem' }}
        />
        <button type="submit">Enviar</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default App;