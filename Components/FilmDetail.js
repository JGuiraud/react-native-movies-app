import React, { Component } from 'react';
import { connect } from 'react-redux';
import heart_empty from '../assets/heart_empty.png';
import heart_full from '../assets/heart_full.png';

import { StyleSheet, View, Text, ActivityIndicator, Image, ScrollView, TouchableOpacity, Button } from 'react-native';
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBapi';
import moment from 'moment';
import numeral from 'numeral';


class FilmDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      film: undefined,
      isLoading: true,
      openImage:false,
    }
  }

  _displayIsLoading() {
    if(this.state.isLoading) {
      return(
        <View style={styles.loading_container}>
          <ActivityIndicator size="large"/>
        </View>
      )
    }
  }

  _listGenre(film) {
    return(
      film.genres.map(genre => (
        <Text key={genre.id}>{genre.name} | </Text>
      ))
    )
  }

  _handleImageShow() {
    this.setState({openImage: !this.state.openImage})
  }

  _showImage() {
    if(this.state.openImage) {
      return (
        <TouchableOpacity style={styles.overlay} onPress={() => this._handleImageShow()}>
          <Image
            style={styles.image_on_overlay}
            source={{uri: getImageFromApi(this.state.film.poster_path)}}/>
        </TouchableOpacity>
      )
    }
  }

  _toggleFavorite() {
    const action = {type: 'TOGGLE_FAVORITE', payload: this.state.film.id}
    this.props.dispatch(action);
  }

  _isFavorite() {
    return this.props.favoriteFilms.includes(this.props.navigation.state.params.idFilm)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate...');
    console.log('favorite : ', this.props.favoriteFilms, ' | historic : ', this.props.historicFilms);
  }

  _displayDetail() {

    const renderFavoriteButton = this._isFavorite() ? (<Image style={styles.heart} source={heart_full}/>) : (<Image style={styles.heart} source={heart_empty}/>)

    if(this.state.film != undefined) {
      const {film} = this.state;
      return(
        <ScrollView style={styles.scrollView_container}>
          <View style={styles.image_container}>
            <TouchableOpacity style={styles.image} onPress={() => this._handleImageShow()}>
              <Image
                resizeMode='cover'
                style={styles.image}
                source={{uri: getImageFromApi(film.poster_path)}}/>
            </TouchableOpacity>
          </View>
          <View style={styles.body_container}>
            <Text style={styles.title}>{film.title}</Text>
            <View style={styles.favorite_button_container}>
              <TouchableOpacity onPress={() => this._toggleFavorite()}>
              {renderFavoriteButton}
              </TouchableOpacity>
            </View>
            <Text style={styles.overview}>{film.overview}</Text>
            <View style={styles.extra_info}>
              <Text style={styles.default_text}>Date de sorti : { moment(new Date(film.release_date)).format('DD/MM/YYYY') }</Text>
              <Text style={styles.default_text}>Note : {film.vote_average}</Text>
              <Text style={styles.default_text}>Durée : {film.runtime} minutes</Text>
              <Text style={styles.default_text}>Budget : ${ numeral(film.budget).format('0,0') }</Text>
              <Text style={styles.default_text}>Revenus : ${ numeral(film.revenue).format('0,0') }</Text>
              <Text style={styles.default_text}>Genre: {this._listGenre(film)}</Text>
            </View>
          </View>
        </ScrollView>
      )
    }
  }

  componentDidMount(){
    getFilmDetailFromApi(this.props.navigation.state.params.idFilm)
      .then(data => this.setState({film:data, isLoading: false}));
  }

  render() {
    return (
      <View style={styles.main_container}>
        {this._displayIsLoading()}
        {this._displayDetail()}
        {this._showImage()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollView_container: {
    flex: 1
  },
  image_container: {
    flex:1,
    flexDirection: 'row'
  },
  image: {
    flex:1,
    width: null,
    height: 300,
  },
  body_container: {
    flex: 2,
    margin: 15,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 10,
  },
  default_text: {
    marginTop: 5,
  },
  overview: {
    color: '#686868'
  },
  extra_info: {
    marginTop: 10,
  },
  image_on_overlay: {
    width: 288,
    height: 432,
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'column',
    backgroundColor: 'rgba(0,0,0,0.9)',
    padding: 40
  },
  favorite_button_container: {
    width: null,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  heart: {
    width: 30,
    height: 30,
  }
});

const mapStateToProps = (globalState) => {
  return {
    favoriteFilms : globalState.favoriteFilms,
    historicFilms: globalState.historicFilms

  }
}

export default connect(mapStateToProps)(FilmDetail);
