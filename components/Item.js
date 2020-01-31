import React from "react";
import { View, Text } from "react-native";

export const Item = ({ Name, FormattedAddress, FormattedPhoneNumber, Rating }) => {
  return (
    <View style={styles.item}>
      <Text>Name: {Name}</Text>
      <Text>Address: {FormattedAddress}</Text>
      <Text>Phone Number: {FormattedPhoneNumber}</Text>
      <Text>Rating: {Rating}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  }
});
