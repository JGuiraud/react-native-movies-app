import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Provider } from 'react-redux';
import Navigation from './Navigation/Navigation';
import store from './Store/configureStore';


export default class App extends React.Component {
   render() {
      return (
        <Provider store={store}>
            <View style={styles.container}>
               <Navigation />
            </View>
        </Provider>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   }
});
