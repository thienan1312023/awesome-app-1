import React, { Component } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import Indicator from "../components/AcitivityIndicator";
import { GeoCoding_URL, API_CAGE_DATA } from "../constants/key";
export default class Create extends Component {
  state = {
    mapRegion: null,
    hasLocationPermissions: false,
    locationResult: null,
    isLoading: false
  };

  componentDidMount() {
    this.getLocationAsync();
  }

  handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  async getLocationAsync() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        locationResult: "Permission to access location was denied"
      });
    } else {
      this.setState({ hasLocationPermissions: true });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationResult: JSON.stringify(location) });

    // Center the map on the location we just fetched.
    this.setState({
      mapRegion: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    });
  }

  handlePressOnMap = event => {
    this.setState({ isLoading: true });
    const queryURL = `${GeoCoding_URL +
      event.nativeEvent.coordinate.latitude}+${
      event.nativeEvent.coordinate.longitude
    }&key=${API_CAGE_DATA}`;
    // console.log(queryURL);

    return fetch(queryURL)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ isLoading: true });
        alert(JSON.stringify(responseJson));
      })
      .catch(error => {
        this.setState({ isLoading: true });
        // console.error(error);
      });
  };
  render() {
    const { isLoading } = this.state;

    return (
      <View style={styles.container}>
        {isLoading && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}

        <View>
          <Text style={styles.paragraph}>Pan, zoom, and tap on the map!</Text>
          {this.state.locationResult === null ? (
            <Text>Finding your current location...</Text>
          ) : this.state.hasLocationPermissions === false ? (
            <Text>Location permissions are not granted.</Text>
          ) : this.state.mapRegion === null ? (
            <Text>Map region doesn't exist.</Text>
          ) : (
            <MapView
              style={{ alignSelf: "stretch", height: 400 }}
              region={this.state.mapRegion}
              onRegionChangeComplete={this.handleMapRegionChange}
              onPress={event => this.handlePressOnMap(event)}
            />
          )}

          <Text>Location: {this.state.locationResult}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    paddingTop: Constants.statusBarHeight
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e"
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5FCFF88"
  }
});
