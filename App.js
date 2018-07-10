import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Modal,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
import { StackNavigator } from "react-navigation";
import _ from "lodash";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { DangerZone } from "expo";
const { Lottie } = DangerZone;
import { GooglePlacesInput } from "./utils/Forms";
import { API_KEY } from "./utils/WeatherAPIKey";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Weather from "./components/weather";
import { weatherConditions } from "./utils/WeatherConditions";
import {
  Container,
  Footer,
  Header,
  Title,
  Thumbnail,
  Content,
  Card,
  CardItem,
  Button,
  Body,
  Left,
  Right,
  IconNB,
  Icon,
  Item,
  Input
} from "native-base";
export default class App extends React.Component {
  constructor() {
    super();
  }
  state = {
    isLoading: true,
    temperature: 0,
    weatherCondition: null,
    modalVisible: false,
    moreInfoModal: false,
    error: null
  };
  async componentWillMount() {
    Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.fetchWeahter(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: "Error Getting Weather Condtions"
        });
      }
    );
  }

  fetchWeahter(lat, lon) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
    )
      .then(res => res.json())
      .then(json => {
        console.log("jsonnn", json);
        this.setState({
          temperature: json.main.temp,
          weatherCondition: json.weather[0].main,
          place: json.name,
          pressure: json.main.pressure,
          humidity: json.main.humidity,
          temp_max: json.main.temp_max,
          temp_min: json.main.temp_min,
          speed: json.wind.speed,
          degree: json.wind.deg,
          isLoading: false,
          fetchedAddress: ""
        });
      });
  }

  getWeatherLocation = (lat, lng) => {
    this.setModalVisible(!this.state.modalVisible);
    this.fetchWeahter(lat, lng);
  };
  render() {
    const {
      isLoading,
      weatherCondition,
      temperature,
      place,
      pressure,
      humidity,
      temp_max,
      temp_min,
      speed,
      degree
    } = this.state;

    return (
      <Container style={{ marginTop: 0 }}>
        <View style={styles.container}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>
                WeatherBOT
                <MaterialCommunityIcons
                  size={72}
                  name="weather-fog"
                  color={"#fff"}
                />
              </Text>
            </View>
          ) : (
            <Container
              style={{
                flex: 1,
                padding: 0,
                paddingBottom: 0,
                paddingTop: 0,
                paddingStart: 0,
                marginTop: 0
              }}
            >
              <Header
                style={{
                  backgroundColor: weatherConditions[weatherCondition].color,
                  padding: 0,
                  paddingBottom: 0,
                  paddingTop: 0,
                  paddingStart: 0,
                  marginTop: 0
                }}
              >
                <Left />
                <Body
                  style={{
                    marginTop: 28,
                    marginLeft: 65,
                    marginBottom: 0,
                    padding: 0,
                    paddingBottom: 0
                  }}
                >
                  <Title>Weather App</Title>
                </Body>
                <Right />
              </Header>
              <View>
                <Item
                  regular
                  style={{ marginLeft: 0, borderColor: "transparent" }}
                >
                  <Button
                    transparent
                    style={{ flex: 1, paddingLeft: 10 }}
                    onPress={() => {
                      this.setModalVisible(true);
                    }}
                  >
                    <FontAwesome name="search" size={15} color={"#aaa"} />

                    <Text style={{ color: "#aaa",padding:10,flex:1 }}>
                          Search Weather of another City
                    </Text>
                  </Button>
                </Item>
              </View>
              <View style={{ flex: 8 }}>
                <Weather
                  style={{ height: 200 }}
                  weather={weatherCondition}
                  temperature={temperature}
                  place={place}
                  pressure={pressure}
                  humidity={humidity}
                  temp_min={temp_min}
                  temp_max={temp_max}
                  speed={speed}
                  degree={degree}
                />
              </View>
            </Container>
          )}

          <View style={{ marginTop: 0 }}>
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
              style={{ flex: 1 }}
              onRequestClose={() => {
                this.setModalVisible(false);
              }}
            >
              <View style={{ marginTop: 1, padding: 1, flex: 10 }}>
                <Header transparent>
                  <Left>
                    <Button
                      transparent
                      style={{ left: 0 }}
                      onPress={() => {
                        this.setModalVisible(!this.state.modalVisible);
                      }}
                    >
                      <Icon
                        name="arrow-back"
                        style={{ fontSize: 25, color: "#aaa" }}
                      />
                    </Button>
                  </Left>
                  <Body>
                    <Title style={{ color: "#aaa" }}> Search Weather</Title>
                  </Body>
                </Header>
                <GooglePlacesInput getLocation={this.getWeatherLocation} />
              </View>
            </Modal>
          </View>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3CD3AD"
  },
  loadingText: {
    fontSize: 30
  },
  detailsText: {
    justifyContent: "space-between",
    fontSize: 22,
    color: "powderblue"
  },
  textboxs: {
    alignItems: "flex-start",
    justifyContent: "flex-start"
  }
});
