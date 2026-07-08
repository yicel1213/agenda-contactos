import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import ContactForm from './ContactForm';
import DataDetail from './DataDetail';

function App() {
  const [contactos, setContactos] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const fetchContactos = async () => {
   
    const { data, error } = await supabase.from('contacto').select('*');
    if (error) {
      console.error("Error al obtener contactos:", error);
    } else {
      setContactos(data || []);
    }
  };

  const eliminarContacto = async (id) => {
    const { error } = await supabase.from('contacto').delete().eq('id_contacto', id);
    if (!error) {
      fetchContactos();
    }
  };

  useEffect(() => {
    fetchContactos();
  }, []);

  const buttonStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    marginLeft: '15px'
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#044739', minHeight: '100vh' }}>
      <h1 style={{ color: '#1e1e20', textAlign: 'center' }}> AGENDA DE CONTACTOS </h1>
      
      <div style={{ width: '90%', maxWidth: '400px', margin: '0 auto', background: '#4f3a2d', padding: '25px', borderRadius: '20px', border: '1px solid #e0dcd5', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <ContactForm onContactAdded={fetchContactos} />
      </div>

      <div style={{ width: '90%', maxWidth: '400px', margin: '20px auto' }}>
        <h2 style={{ color: '#1f1f1e' }}>Lista de contactos</h2>
        {contactos.map((c) => (
          <div key={c.id_contacto} style={{ 
            background: '#988794', 
            padding: '15px 20px', 
            borderRadius: '15px', 
            marginBottom: '10px', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            border: '1px solid #309e8f' 
          }}>
            <span style={{ fontWeight: 'bold', fontSize: '18px', color: '#05493c' }}>
              {c.nombre} {c.apellido}
            </span>
            
            <div style={{ display: 'flex' }}>
              <button onClick={() => { setActiveId(c.id_contacto); setIsEditMode(false); }} style={{ ...buttonStyle, color: '#555' }}>
                Ver detalles
              </button>
              <button onClick={() => { setActiveId(c.id_contacto); setIsEditMode(true); }} style={{ ...buttonStyle, color: '#2e7d32' }}>
                Editar
              </button>
              <button onClick={() => eliminarContacto(c.id_contacto)} style={{ ...buttonStyle, color: '#cc7a7a' }}>
                Borrar
              </button>
            </div>
          </div>
        ))}
      </div>

      {activeId && (
        <div style={{ width: '90%', maxWidth: '400px', margin: '20px auto', background: '#0c5560', padding: '20px', borderRadius: '20px', border: '1px solid #ddd' }}>
          <button onClick={() => setActiveId(null)} style={{ marginBottom: '10px' }}>Cerrar</button>
          <DataDetail idContacto={activeId} soloLectura={!isEditMode} />
        </div>
      )}
    </div>
  );
}

export default App;