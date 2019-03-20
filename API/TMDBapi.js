const API_TOKEN = "69e209b70dff14c53832f0c23407ddd6";

export function getFilmsFromApiWithSearchedText(text, page) {
  const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + '&page=' + page;
  return fetch(url)
    .then(res => res.json())
    .catch(err => console.log(err));
}

export function getImageFromApi(path) {
  return "https://image.tmdb.org/t/p/w500/"+path;
}

export function getFilmDetailFromApi(idFilm) {
  const url = 'https://api.themoviedb.org/3/movie/' + idFilm + '?api_key=' + API_TOKEN + '&language=fr';
  return fetch(url)
    .then(res => res.json())
    .catch(err=> console.log(err));
}
