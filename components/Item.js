import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Item = ({ Name, FormattedAddress, FormattedPhoneNumber, Rating }) => {
    console.log('dddd',Name);
  return (
    <View style={styles.item}>
      <Text>Name: {Name}</Text>
      <Text>Address: {FormattedAddress}</Text>
      <Text>Phone Number: {FormattedPhoneNumber}</Text>
      <Text>Rating: {Rating}</Text>
    </View>
  );
}

export default Item;
const styles = StyleSheet.create({
  item: {
    backgroundColor: "#B0C4DE",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16
  }
});
