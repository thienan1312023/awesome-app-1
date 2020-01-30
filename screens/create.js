import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Button
} from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import Modal from "react-native-modal";
import { POI_Detail_URL } from "../constants/key";

export default class Create extends Component {
  state = {
    mapRegion: null,
    hasLocationPermissions: false,
    locationResult: null,
    isLoading: false,
    isModalVisible: false,
    POIDetail: {
      name: "",
      formatted_address: "",
      rating: 0,
      formatted_phone_number: ""
    }
  };

  componentDidMount() {
    this.getLocationAsync();
  }

  handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
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

  handleOnPoiClick = event => {
    const { placeId } = event.nativeEvent;
    const queryURL = POI_Detail_URL.replace("place_id_param", placeId);

    return fetch(queryURL)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          isModalVisible: true,
          POIDetail: {
            ...responseJson.result
          }
        });
      })
      .catch(error => {
        this.setState({ isLoading: false });
        console.error(error);
      });
  };
  // handleTapOnMap = () => {
  //   this.setState({ isLoading: true });
  //   const { latitude, longitude } = this.state.mapRegion;
  //   console.log(latitude + " + " + longitude);
  //   const queryURL = `${GeoCoding_URL +
  //     latitude}+${longitude}&key=${API_CAGE_DATA}`;

  //   return fetch(queryURL)
  //     .then(response => response.json())
  //     .then(responseJson => {
  //       this.setState({ isLoading: false, isModalVisible: true });
  //     })
  //     .catch(error => {
  //       this.setState({ isLoading: false });
  //       console.error(error);
  //     });
  // };
  render() {
    const {
      isLoading,
      POIDetail: {
        formatted_address: FormattedAddress,
        formatted_phone_number: FormattedPhoneNumber,
        name: Name,
        rating: Rating
      }
    } = this.state;

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
              // onPress={this.handleTapOnMap}
              onPoiClick={event => this.handleOnPoiClick(event)}
            />
          )}

          <Text>Location: {this.state.locationResult}</Text>
        </View>

        <Modal isVisible={this.state.isModalVisible}>
          <View style={styles.modal}>
            <Text style={styles.headerModal}>Location Detail</Text>
            <Text>Name: {Name}</Text>
            <Text>Address: {FormattedAddress}</Text>
            <Text>Phone Number: {FormattedPhoneNumber}</Text>
            <Text>Rating: {Rating}</Text>
            <View style={{paddingTop: 15, paddingBottom: 10}}>
              <Button title="Hide modal" onPress={this.toggleModal} />
            </View>

            <View>
              <Button title="Add To List" onPress={this.toggleModal} />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerModal: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 15
  },
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
  },
  modal: {
    display: "flex",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    color: "black",
    padding: 10,
    minHeight: 200
  }
});
