import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import Search from '../Components/Search';
import FilmDetail from '../Components/FilmDetail'
import Favorites from '../Components/Favorites'
import { Image, StyleSheet } from 'react-native';
import React from 'react';

const SearchStackNavigator = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      title: 'Rechercher'
    }
  },
  FilmDetail: {
    screen: FilmDetail
  }
});

const MoviesTabNavigator = createBottomTabNavigator({
  Search: {
    screen: SearchStackNavigator,
    navigationOptions: {
      tabBarIcon: () => {
        return <Image
          source={require( '../assets/ic_search.png')}
          style={styles.icon}
        />
      }
    }
  },
  Favorites: {
    screen: Favorites,
    navigationOptions: {
      tabBarIcon: () => {
        return <Image
          source={require('../assets/heart_full.png')}
          style={styles.icon}
        />
      }
    }
  }
},
{
  tabBarOptions: {
    activeBackgroundColor: '#DDDDDD',
    inactiveBackgroundColor: '#FFFFFF',
    showLabel: false,
    showIcon: true
  }
}
);

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  }
})

export default createAppContainer(MoviesTabNavigator);
