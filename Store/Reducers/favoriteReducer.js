const initialState = {favoriteFilms: [], historicFilms:[]};

function toggleFavorite(state = initialState, action) {
  let newState;
  switch (action.type) {

    case 'TOGGLE_FAVORITE':
      const favoriteFilmIndex = state.favoriteFilms.findIndex(id => id === action.payload);
      if(favoriteFilmIndex !== -1) {
        //exist in state, delete it
        newState = {
          ...state,
          favoriteFilms: state.favoriteFilms.filter((item, index) => index !== favoriteFilmIndex)
        }
      } else {
        //doesn't exist in state => add it
        newState = {
          ...state,
          favoriteFilms: [...state.favoriteFilms, action.payload]
        }
      }
      return newState || state;

    case 'TOGGLE_HISTORIC':
      const historicFilmIndex = state.historicFilms.findIndex(id => id === action.payload);
      if(historicFilmIndex === -1) {
        //doesn't exist in state => add it
        newState = {
          ...state,
          historicFilms: [...state.historicFilms, action.payload]
        }
      }
      return newState || state;

/*
TODO:
    case 'REMOVE_HISTORIC_FILM':
      if(historicFilmIndex !== -1) {
        newState = {
          ...state,
          historicFilms: state.historicFilms.filter((item, index) => index !== historicFilmIndex)
        }
      }
*/

    default:
      return state
  }
}

export default toggleFavorite;
