import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Button, TextInput, StyleSheet, FlatList, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import FilmItem from './FilmItem';
import { getFilmsFromApiWithSearchedText } from "../API/TMDBapi";

class Search extends Component {

  constructor(props) {
    super(props);
    this.page = 0,
    this.totalPages = 0,
    this.state = {
      searchTerm : "",
      films : [],
      isLoading: false,
      total_results: 0,
      hasSearched: false,
    }
  }

  _loadFilms() {
    this.setState({isLoading: true});
    if(this.state.searchTerm.length > 0) {
      getFilmsFromApiWithSearchedText(this.state.searchTerm, this.page + 1).then(
        data=> {
          this.totalPages = data.total_pages;
          this.page = data.page;
          this.setState({films : [...this.state.films, ...data.results], isLoading: false, total_results: data.total_results, hasSearched: true});
        }
      );
    }

  }

  _isLoading() {
    return this.state.isLoading;
  }

  _displayLoading() {
    if(this._isLoading()) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
  }

  _handleSearchTermChange(searchTerm) {
    this.setState({searchTerm: searchTerm});
  };

  _hasFilm() {
    return this.state.films.length > 0;
  }

  _nextPage() {
    if(this.page < this.totalPages) {
      this._loadFilms();
    }
  }

  _searchFilms() {
    if(this.state.searchTerm.length > 0) {
      this.page = 0;
      this.totalPages = 0;
      this.setState({
        films:[]
      }, () => {
        this._loadFilms();
      });
    }
  }

  _hasNoResultOnSearch() {
    return (this.state.total_results === 0 && this.state.hasSearched);
  }

  _displayDetailForFilm = (idFilm) => {
    this.props.navigation.navigate('FilmDetail', {idFilm: idFilm});
    this._toggleHistoric(idFilm)
  }

  _toggleHistoric(idFilm) {
    const action = {type: 'TOGGLE_HISTORIC', payload: idFilm};
    this.props.dispatch(action);
  }

  _isFavorite(item) {
    return this.props.favoriteFilms.includes(item.id);
  }

  render() {
    return (
      <View style={styles.main_view}>
        {this._isLoading() ? (this._displayLoading()) : (<TextInput
          placeholder="titre du film"
          style={styles.textInput}
          onChangeText={(text) => this._handleSearchTermChange(text)}
          onSubmitEditing={() => this._searchFilms()}
          value={this.state.search}
        />)}
          <Button title="Rechercher" onPress={() => {this._searchFilms()}}/>
        {
          this._hasFilm() && (
            <Text style={styles.total_results}>{this.state.films.length} / {this.state.total_results} résultats</Text>
          )
        }
        {
          this._hasNoResultOnSearch()
            ? (<Text style={styles.noResult}>Aucun résultat</Text>)
            : (
            <FlatList
              data={this.state.films}
              keyExtractor={(item => item.id.toString())}
              onEndReachThreashold={0.5}
              onEndReached={() => this._nextPage()}
              renderItem={({item}) =>
                <FilmItem
                  film={item}
                  displayDetailForFilm={(id) => this._displayDetailForFilm(id)}
                  isFavorite={this._isFavorite(item)}
                />
              }
            />
          )
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    borderColor: 'transparent',
    backgroundColor: '#E0E0E0',
    borderWidth: 1,
    paddingLeft: 10,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 50,
  },
  button: {
    backgroundColor: 'red',
    width: 150,
    margin: 'auto'
  },
  main_view: {
    paddingBottom: 110,
    paddingTop: 10
  },
  total_results: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noResult: {
    color: 'red',
    textAlign: 'center',
    margin: 'auto',
  }
});

const mapStateToProps = (globalState) => {
  return {
    favoriteFilms: globalState.favoriteFilms,
  }
}

export default connect(mapStateToProps)(Search);
