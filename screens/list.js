import React, { Component } from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text } from "react-native";
import { observer, inject } from "mobx-react";
import Item from "../components/Item";
import { selectPOIListStore } from "../selectors/POIListStoreSelector";
class List extends Component {
  render() {
    const { POIListStore } = this.props;
    const { POIItems } = POIListStore;
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={POIItems}
          renderItem={({ item }) => (
            <Item
              Name={item.Name}
              FormattedAddress={item.FormattedAddress}
              FormattedPhoneNumber={item.FormattedPhoneNumber}
              Rating={item.Rating}
            ></Item>
          )}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    );
  }
}

export default inject(selectPOIListStore)(observer(List));
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    backgroundColor: "#ecf0f1"
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e"
  }
});
