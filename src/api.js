const API = import.meta.env.VITE_API_URL;

export async function listBugs() {
  const res = await fetch(`${API}/bugs/`);
  if (!res.ok) throw new Error('Erreur liste bugs');
  return res.json();
}

export async function createBug(data) {
  const res = await fetch(`${API}/bugs/`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Erreur création bug');
  return res.json();
}

export async function patchBug(id, data) {
  const res = await fetch(`${API}/bugs/${id}/`, {
    method: 'PATCH',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Erreur mise à jour bug');
  return res.json();
}
