import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from 'react-native';

import { MyHeader } from '../components/MyHeader';
import db from '../config';
import firebase from 'firebase';

export default class ExchangeItemScreenScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      itemName: '',
      reasonRequest: '',
      userId: firebase.auth().currentUser.email,
    };
  }

  createUniqueId() {
    return Math.random().toString(36).substring(7);
  }

  addRequest = (itemName, reason) => {
    var userId = this.state.userId;
    var randomRequestId = this.createUniqueId();

    if (itemName !== '') {
      if (reason !== '') {
        db.collection('Exchange').add({
          UserId: userId,
          RequestId: randomRequestId,
          ItemName: itemName,
          Reason: reason,
        });

        this.setState({
          itemName: '',
          reasonRequest: '',
        });
        alert('Book Requested Successfully');
      } else {
        alert('Please Write Your Reason');
      }
    } else {
      alert('Please Write Your Book Name');
    }
  };

  render() {
    return (
      <View>
        <KeyboardAvoidingView style={styles.keyboardAvoidingViewStyle}>
          <TextInput
            style={styles.textInputStyle}
            placeholder="Enter Item"
            onChangeText={(text) => {
              this.setState({ itemName: text });
            }}
            value={this.state.itemName}
          />

          <TextInput
            style={[styles.textInputStyle, { height: 300 }]}
            placeholder="Description"
            onChangeText={(text) => {
              this.setState({ reasonRequest: text });
            }}
            value={this.state.reasonRequest}
            multiline={true}
            numberOfLines={10}
          />

          <TouchableOpacity
            style={styles.requestStyle}
            onPress={() => {
              this.addRequest(this.state.itemName, this.state.reasonRequest);
            }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Add Item</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  keyboardAvoidingViewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputStyle: {
    width: '75%',
    height: 35,
    alignSelf: 'center',
    borderColor: '#ffab91',
    borderRadius: 30,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
  requestStyle: {
    width: '50%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: 'gold',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: 60,
  },
});
