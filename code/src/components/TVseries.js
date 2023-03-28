import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom'
import { TVSHOW_URL, CONFIG_URL } from 'utils/Urls';

export const TVseries = () => {
  const [tvShow, setTvShow] = useState([]);
  const [imgConfig, setConfig] = useState({});

  useEffect(() => {
    fetch(CONFIG_URL)
      .then((res) => res.json())
      .then((json) => {
        console.log('Fetched config:');
        console.log(json);
        setConfig(json.images);
      })
      .catch((error) => alert(error, 'Error fetching config'))
      .then(() => {
        fetch(TVSHOW_URL)
          .then((res) => res.json())
          .then((json) => {
            console.log(json);
            setTvShow(json.results);
          })
          .catch((error) => alert(error, 'Error fetching shows'))
      });
  }, []);

  const shows = tvShow
    .filter((show) => show.poster_path != null)
    .map((show) => {
      return (
        // This should probably be a component
        <div
          className="movie-card"
          key={show.id}
          poster={show.poster_path}>
          {show.name}
          {/* Another component */}
          <img alt={`Poster for: ${show.name}`} src={`${imgConfig.secure_base_url}w500${show.poster_path}`} />
        </div>
      );
    });

  return (<div>{shows}</div>);
}