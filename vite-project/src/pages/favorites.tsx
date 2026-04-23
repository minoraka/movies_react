import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { removeFromFavorites } from '../services/favorites'

type Movie = {
  id: string
  originalTitle: string
  primaryImage?: { url: string }
}

export default function Favorites() {
  const navigate = useNavigate()
  const [movies, setMovies] = useState<Movie[]>([])

  const load = () =>
    setMovies(JSON.parse(localStorage.getItem('favorites') || '[]'))

  useEffect(load, [])

  return (
    <div>
      <button
        className='p-2 bg-blue-500 text-white rounded-md mb-4'
        onClick={() => navigate('/')}
      >
        Back to Home
      </button>

      <h1 className='text-2xl font-bold mb-4'>Favorites</h1>

      {!movies.length ? (
        <p>No movies added to favorites yet</p>
      ) : (
        <div className='grid grid-cols-4 gap-4'>
          {movies.map(m => (
            <div className='p-2' key={m.id}>
              <img src={m.primaryImage?.url} alt={m.originalTitle} />

              <Link to={`/movie/${m.id}`}>
                <h3>{m.originalTitle}</h3>
              </Link>

              <button
                onClick={() => (removeFromFavorites(m.id), load())}
                className='p-3 bg-red-500 text-white rounded-md mt-2 w-full'
              >
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}