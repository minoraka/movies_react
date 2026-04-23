import { useParams } from 'react-router-dom'
import { getMovieById } from '../services/api'
import { useEffect, useState } from 'react'

type Movie = {
  id: string
  originalTitle: string
  releaseDate?: string
  primaryImage?: { url: string }
  runtimeMinutes?: number
  imdbRating?: number
}

export default function MovieDetails() {
  const { id } = useParams()
  const [movie, setMovie] = useState<Movie | null>(null)
  const [fav, setFav] = useState(false)

  useEffect(() => {
    getMovieById(id!).then(setMovie)
  }, [id])

  const toggleFav = () => {
    const f = JSON.parse(localStorage.getItem('favorites') || '[]')
    localStorage.setItem(
      'favorites',
      JSON.stringify(
        fav ? f.filter((m: Movie) => m.id !== id) : [...f, movie]
      )
    )
    setFav(!fav)
  }

  return (
    <div className="p-4">
      <button
        className="p-2 bg-blue-500 text-white rounded-md mb-4"
        onClick={() => history.back()}
      >
        Back
      </button>

      <div className="flex gap-8">
        <div>
          <img
            className="w-64 rounded-lg shadow-lg"
            src={movie?.primaryImage?.url}
            alt={movie?.originalTitle}
          />

          <button
            onClick={toggleFav}
            className={`w-64 mt-4 p-3 text-white font-bold rounded-md ${
              fav ? 'bg-gray-500' : 'bg-red-500'
            }`}
          >
            {fav ? '★ Remove' : '☆ Add'}
          </button>
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-4">
            {movie?.originalTitle}
          </h1>

          {movie?.releaseDate && <p><b>Date:</b> {movie.releaseDate}</p>}
          {movie?.runtimeMinutes && <p><b>Time:</b> {movie.runtimeMinutes} min</p>}
          {movie?.imdbRating && (
            <p className="text-yellow-500">★ {movie.imdbRating}/10</p>
          )}
        </div>
      </div>
    </div>
  )
}