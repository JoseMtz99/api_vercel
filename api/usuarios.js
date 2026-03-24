import supabase from './_supabase.js';

export default async function handler(req, res) {
  const { method, query } = req;

  if (method === 'GET') {
    let consulta = supabase.from('usuarios').select('*');

    // Si mandas ?id=1
    if (query.id) {
      consulta = consulta.eq('id', query.id);
    }

    const { data, error } = await consulta;

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
  }

  res.status(405).json({ error: 'Método no permitido' });
}