import { useEffect, useState } from 'react'
import { listBugs, createBug, patchBug } from './api'

export default function App() {
  const [bugs, setBugs] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  async function refresh() {
    const data = await listBugs()
    setBugs(data)
  }
  useEffect(() => { refresh() }, [])

  async function onCreate(e) {
    e.preventDefault()
    await createBug({ title, description })
    setTitle(''); setDescription('')
    refresh()
  }

  async function closeBug(id) {
    await patchBug(id, { status: 'closed' })
    refresh()
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white/95 shadow-xl p-8 backdrop-blur-sm">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          🐞 Mini Bug Tracker
        </h1>

        {/* Formulaire */}
        <form
          onSubmit={onCreate}
          className="grid gap-4 mb-8"
        >
          <input
            placeholder="Titre"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            className="rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <textarea
            placeholder="Description (optionnel)"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="rounded-lg bg-green-600 px-4 py-2 text-white font-medium shadow hover:bg-green-700 transition"
          >
            ➕ Ajouter
          </button>
        </form>

        {/* Liste des bugs */}
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Bugs</h2>
        <ul className="grid gap-4">
          {bugs.map(b => (
            <li
              key={b.id}
              className="rounded-xl border border-gray-200 bg-gray-50 p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <strong className="text-lg text-gray-800">{b.title}</strong>
                <span
                  className={`text-sm font-medium px-2 py-1 rounded-lg ${
                    b.status === 'open'
                      ? 'bg-red-100 text-red-600'
                      : 'bg-green-100 text-green-600'
                  }`}
                >
                  {b.status}
                </span>
              </div>
              {b.description && (
                <p className="text-gray-600 mt-2">{b.description}</p>
              )}
              {b.status === 'open' && (
                <button
                  onClick={() => closeBug(b.id)}
                  className="mt-3 rounded-lg bg-indigo-600 px-3 py-1.5 text-white text-sm shadow hover:bg-indigo-700 transition"
                >
                  ✅ Marquer comme résolu
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

