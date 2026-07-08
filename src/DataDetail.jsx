import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { Pencil, Trash2 } from 'lucide-react'; // Importación de iconos

function DataDetail({ idContacto, soloLectura }) {
  const [datos, setDatos] = useState([]);
  const [nuevoDato, setNuevoDato] = useState({ tipo: 'Personal', telefono: '', correo: '', direccion: '' });
  const [editandoId, setEditandoId] = useState(null);

  const fetchDatos = async () => {
    const { data } = await supabase.from('dato_contacto').select('*').eq('id_contacto', idContacto);
    setDatos(data || []);
  };

  const agregarDato = async (e) => {
    e.preventDefault();
    await supabase.from('dato_contacto').insert([{ ...nuevoDato, id_contacto: idContacto }]);
    setNuevoDato({ tipo: 'Personal', telefono: '', correo: '', direccion: '' });
    fetchDatos();
  };

  const actualizarDato = async (e) => {
    e.preventDefault();
    await supabase.from('dato_contacto').update(nuevoDato).eq('id_dato_contacto', editandoId);
    setEditandoId(null);
    setNuevoDato({ tipo: 'Personal', telefono: '', correo: '', direccion: '' });
    fetchDatos();
  };

  const eliminarDato = async (id) => {
    await supabase.from('dato_contacto').delete().eq('id_dato_contacto', id);
    fetchDatos();
  };

  useEffect(() => { fetchDatos(); }, [idContacto]);

  return (
    <div>
      <h4>Datos de contacto:</h4>
      <ul>
        {datos.map((d) => (
          <li key={d.id_dato_contacto} style={{ marginBottom: '8px' }}>
            {d.tipo}: {d.telefono} | {d.correo} | {d.direccion}
            {!soloLectura && (
              <>
                <button onClick={() => { setEditandoId(d.id_dato_contacto); setNuevoDato(d); }} style={{ marginLeft: '10px' }}>
                  <Pencil size={14} /> Editar
                </button>
                <button onClick={() => eliminarDato(d.id_dato_contacto)} style={{ marginLeft: '5px', background: '#ff4d4d', color: 'white', border: 'none', cursor: 'pointer' }}>
                  <Trash2 size={14} /> Eliminar
                </button>
              </>
            )}
          </li>
        ))}
      </ul>

      {!soloLectura && (
        <form onSubmit={editandoId ? actualizarDato : agregarDato} style={{ marginTop: '15px', padding: '10px', border: '1px solid #680b0b' }}>
          <select value={nuevoDato.tipo} onChange={(e) => setNuevoDato({...nuevoDato, tipo: e.target.value})}>
            <option value="Personal">Personal</option>
            <option value="Trabajo">Trabajo</option>
          </select>
          <input placeholder="Teléfono" value={nuevoDato.telefono} onChange={(e) => setNuevoDato({...nuevoDato, telefono: e.target.value})} />
          <input placeholder="Correo" value={nuevoDato.correo} onChange={(e) => setNuevoDato({...nuevoDato, correo: e.target.value})} />
          <input placeholder="Dirección" value={nuevoDato.direccion} onChange={(e) => setNuevoDato({...nuevoDato, direccion: e.target.value})} />
          
          <button type="submit" style={{ marginLeft: '10px' }}>
            {editandoId ? "Guardar Cambios" : "Añadir Dato"}
          </button>
          {editandoId && (
            <button type="button" onClick={() => { setEditandoId(null); setNuevoDato({ tipo: 'Personal', telefono: '', correo: '', direccion: '' }); }}>
              Cancelar
            </button>
          )}
        </form>
      )}
    </div>
  );
}

export default DataDetail;