import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import MyHeader from "../components/MyHeader";
import db from "../config";
import firebase from "firebase";
import { ListItem } from "react-native-elements";

export default class NotificationScreen extends React.Component {
 constructor() {
    super();
    this.state = {
      allNotifications: [],
      userId: firebase.auth().currentUser.email,
    };
    this.notificationRef = null;
  }

  getNotification = () => {
    this.notificationRef = db
      .collection("Notifications")
      .where("NotificationStatues", "==", "unread")
      .where("TargetedUserID", "==", this.state.userId)
      .onSnapshot((snapshot) => {
        var allNotification = [];
        snapshot.docs.map((doc) => {
          var notification = doc.data();
          allNotification.push(notification);
        });
        this.setState({
          allNotifications: allNotification,
        });
      });
  };

  componentDidMount() {
    this.getNotification();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 0.1 }}>
          <MyHeader title="Notification" navigation={this.props.navigation}/>
        </View>
        <View>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={this.state.allNotifications}
            renderItem={({ item, i }) => {
              return (
                <ListItem
                  key={i}
                  title={item.itemName}
                  subtitle={item.Message}
                  titleStyle={{ color: "black", fontWeight: "bold" }}
                  bottomDivider
                />
              );
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
