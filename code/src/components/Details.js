import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { NotFound } from './NotFound';

export const Details = () => {
  const [movieDetails, setMovieDetails] = useState([])
  const { id } = useParams()

  const FetchDetails = () => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=874b455d7037920aea9fd13db8645525&language=en-US`)
      .then((response) => response.json())
      .then((data) => setMovieDetails(data))
      .catch((error) => {
        console.log(error)
        if (error) {
          return (<NotFound />

          )
        }
      })
  }

  useEffect(() => {
    FetchDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className="background"
      style={{ backgroundImage: `url(http://image.tmdb.org/t/p/original${movieDetails.backdrop_path})` }}>
      <Link to="/" className="back-button" type="button">
        <p>Back to home page</p>
      </Link>
      <div className="movie-detail">
        <img src={`http://image.tmdb.org/t/p/w342${movieDetails.poster_path}`} alt="movie" />
        <div className="details">
          <h1>{movieDetails.title}</h1>
        </div>
        <p>{movieDetails.overview}</p>
      </div>
    </div>
  )
}