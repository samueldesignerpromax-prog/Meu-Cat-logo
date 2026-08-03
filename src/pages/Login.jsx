import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// COLOQUE A URL DA SUA API AQUI (RENDER)
const API_URL = 'https://meu-catalogo-api.onrender.com';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      alert('✅ Login realizado com sucesso!');
      navigate('/');
    } catch (err) {
      alert('❌ Erro: ' + (err.response?.data?.message || 'Falha na conexão'));
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto' }}>
      <h2>Entrar</h2>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: 8, marginBottom: 10 }} /><br />
      <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: 8, marginBottom: 10 }} /><br />
      <button type="submit" style={{ padding: 10, background: '#007bff', color: '#fff', border: 'none', borderRadius: 5 }}>Entrar</button>
    </form>
  );
}
