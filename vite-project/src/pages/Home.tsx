import { useState } from 'react'
import { searchMovies } from '../services/api'

export default function Home() {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState<any[]>([])

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      
      <button onClick={() =>
        searchMovies(query).then(d => setMovies(d.titles))
      }>
        Search
      </button>

      <div className='grid grid-cols-4 gap-2'>
        {movies.map(m => (
          <div className='p-2' key={m.id}>
            <img src={m.primaryImage?.url} alt={m.originalTitle} />
            <h3>{m.originalTitle}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}