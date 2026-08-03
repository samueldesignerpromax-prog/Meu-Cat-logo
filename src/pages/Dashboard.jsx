import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'https://meu-catalogo-api.onrender.com';

export default function Dashboard() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    axios.get(`${API_URL}/api/movies`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        setMovies(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert('Sessão expirada, faça login novamente');
        localStorage.removeItem('token');
        setLoading(false);
      });
  }, [token]);

  const addMovie = async () => {
    if (!token) return alert('Faça login primeiro');
    if (!title.trim()) return alert('Digite um título');
    try {
      const res = await axios.post(`${API_URL}/api/movies`, 
        { title, genre: 'Ação', rating: 10, description: 'Filme top' }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMovies([...movies, res.data]);
      setTitle('');
    } catch (err) {
      alert('Erro ao adicionar filme');
    }
  };

  if (!token) {
    return <h2>Você precisa estar logado para ver seus filmes. <a href="/login">Faça login</a></h2>;
  }

  return (
    <div>
      <h2>📽️ Meus Filmes</h2>
      <div>
        <input 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          placeholder="Digite o título do filme..." 
          style={{ padding: 8, width: 300, marginRight: 10 }}
        />
        <button onClick={addMovie} style={{ padding: 8, background: '#007bff', color: '#fff', border: 'none', borderRadius: 5 }}>
          Adicionar
        </button>
      </div>
      {loading ? <p>Carregando...</p> : (
        <ul style={{ marginTop: 20 }}>
          {movies.length === 0 && <li>Nenhum filme cadastrado ainda.</li>}
          {movies.map(m => <li key={m._id} style={{ padding: 5, borderBottom: '1px solid #ccc' }}>{m.title}</li>)}
        </ul>
      )}
    </div>
  );
}
