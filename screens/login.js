import React, { Component } from "react";
import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  StyleSheet,
  ImageBackground
} from "react-native";

const mockLoginAuthen = {
  _userName: "123",
  _password: "123"
};
export default class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      isInit: true,
      isInCorrectLogin: undefined
    };
  }

  onLogin() {
    this.setState({ isInit: false });
    const { username, password } = this.state;
    const { navigate } = this.props.navigation;
    const { _userName, _password } = mockLoginAuthen;
    if (username !== "" && password !== "") {
      if (username == _userName && password == _password) {
        navigate("SignedIn");
      } else {
        this.setState({ isInCorrectLogin: true });
      }
    }
  }

  render() {
    const { username, password, isInit, isInCorrectLogin } = this.state;
    return (
      <ImageBackground
        source={require("../assets/background-lock.jpg")}
        style={styles.container}
      >
        <Text style={styles.title}>Quick Places</Text>
        <View style={styles.userInputField}>
          <TextInput
            value={this.state.username}
            onChangeText={username => this.setState({ username })}
            placeholder={"Username"}
            style={styles.input}
          />
          {!isInit && username === "" && (
            <Text style={styles.require}>Username is require!</Text>
          )}
        </View>
        <View style={styles.userInputField}>
          <TextInput
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            placeholder={"Password"}
            secureTextEntry={true}
            style={styles.input}
          />
          {!isInit && password === "" && (
            <Text style={styles.require}>Password is require!</Text>
          )}
        </View>
        {isInCorrectLogin && (
          <Text style={styles.require}>UserName or Password is incorrect!</Text>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={this.onLogin.bind(this)}
        >
          <Text style={{ textAlign: "center" }}> Login </Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%"
  },
  input: {
    height: 44,
    backgroundColor: "#FFFFFF",
    padding: 10
  },
  require: {
    color: "#F65E3D",
    fontSize: 12,
    fontStyle: "italic"
  },
  button: {
    backgroundColor: "#8FBC8F",
    width: "90%",
    height: 44,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  title: {
    color: "#2C3E50",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 50
  },
  userInputField: {
    width: "90%",
    paddingTop: 10,
    paddingBottom: 10
  }
});
