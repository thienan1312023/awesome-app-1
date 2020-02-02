import React, { Component } from "react";
import { Text, View, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { Constants } from "expo";
import { observer, inject } from "mobx-react";
import { selectPOIListStore } from "../selectors/POIListStoreSelector";
import Item from "../components/Item";

class POIs extends Component {
  render() {
    console.log('sssvdg');
    const { POIListStore } = this.props;
    const { POIItems, count } = POIListStore;
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          You selected {count} node(s)
        </Text>
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
      </View>
    );
  }
}

export default inject(selectPOIListStore)(observer(POIs));
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
