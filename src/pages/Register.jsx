import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://meu-catalogo-api.onrender.com';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/auth/register`, { name, email, password });
      alert('✅ Cadastro realizado! Faça login.');
      navigate('/login');
    } catch (err) {
      alert('❌ Erro: ' + (err.response?.data?.error || 'Falha na conexão'));
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto' }}>
      <h2>Criar Conta</h2>
      <input type="text" placeholder="Nome" value={name} onChange={e => setName(e.target.value)} required style={{ width: '100%', padding: 8, marginBottom: 10 }} /><br />
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: 8, marginBottom: 10 }} /><br />
      <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: 8, marginBottom: 10 }} /><br />
      <button type="submit" style={{ padding: 10, background: '#28a745', color: '#fff', border: 'none', borderRadius: 5 }}>Cadastrar</button>
    </form>
  );
}
