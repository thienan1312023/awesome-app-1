import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { observer, inject } from "mobx-react";
import { selectPOIListStore } from "../selectors/POIListStoreSelector";
import Item from "../components/Item";
class Statistic extends Component {
  render() {
    const { POIListStore } = this.props;
    const { POIItems, count } = POIListStore;
    const numberOfNodes = (POIItems && POIItems.length) || 0;
    const lastItem = POIItems[POIItems.length - 1];

    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Number of Selected Node(s): {numberOfNodes}
        </Text>
        <Text style={styles.paragraph}>
          Your lastest node
        </Text>
        <Item
              Name={lastItem.Name}
              FormattedAddress={lastItem.FormattedAddress}
              FormattedPhoneNumber={lastItem.FormattedPhoneNumber}
              Rating={lastItem.Rating}
        />
      </View>
    );
  }
}

export default inject(selectPOIListStore)(observer(Statistic));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
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
