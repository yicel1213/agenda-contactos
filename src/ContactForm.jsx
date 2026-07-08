import { useState } from 'react';
import { supabase } from './supabaseClient';

function ContactForm({ onContactAdded }) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [error, setError] = useState(false);

  const inputStyle = {
    width: '100%',
    padding: '12px',
    margin: '8px 0',
    borderRadius: '10px',
    border: '1px solid #ccc',
    boxSizing: 'border-box'
  };

  const guardar = async (e) => {
    e.preventDefault();
    if (nombre.trim() === '' || apellido.trim() === '') {
      setError(true);
      return;
    }
    setError(false);
    await supabase.from('contacto').insert([{ nombre, apellido }]);
    setNombre('');
    setApellido('');
    onContactAdded();
  };

  return (
    <form onSubmit={guardar}>
      <h3>Agregar nuevo contacto</h3>
      <label>Nombre:</label>
      <input style={inputStyle} value={nombre} onChange={(e) => { setNombre(e.target.value); setError(false); }} />
      <label>Apellido:</label>
      <input style={inputStyle} value={apellido} onChange={(e) => { setApellido(e.target.value); setError(false); }} />

      <div style={{ height: '24px', display: 'flex', alignItems: 'center' }}>
        {error && <p style={{ color: 'red', fontSize: '14px', margin: '0', fontWeight: 'bold' }}>Por favor, ingrese todos los datos</p>}
      </div>

      <button type="submit" style={{ width: '100%', padding: '12px', borderRadius: '10px', marginTop: '10px', background: '#a1968a', color: 'white', border: 'none', cursor: 'pointer' }}>
        Guardar contacto
      </button>
    </form>
  );
}

export default ContactForm;