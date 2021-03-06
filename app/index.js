import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { StackN } from './config/router';
import RealmDb from './screens/RealmDb';

export default class App extends Component<{}> {

  render() {
    const { navigationKey, medication } = this.props;
    console.log(this.props);
    if (navigationKey === 'MedicationScreen') {
      return (
        <View style={styles.container}>
          <Text style={styles.instructions}>
            I am in medication screen !
          </Text>
          <Text style={styles.instructions}>
            {medication.medId}
          </Text>
          <Text style={styles.instructions}>
            {medication.medName}
          </Text>
        </View>
      );
    }
    return (
      <StackN/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
