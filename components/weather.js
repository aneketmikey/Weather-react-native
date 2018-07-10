import React from "react";
import { View, Text, StyleSheet, TouchableOpacity ,Modal} from "react-native";
import { MaterialCommunityIcons,
  FontAwesome,Entypo } from "@expo/vector-icons";
import PropTypes from "prop-types";
import _ from "lodash";
import { weatherConditions } from "../utils/WeatherConditions";
import App from '../App';
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
  IconNB
} from "native-base";

const Weather = ({
  weather,
  temperature,
  place,
  pressure,
  humidity,
  temp_min,
  temp_max,
  speed,
  degree
}) => {
  return (
    <View
      style={[ {flex:1},
        styles.weatherContainer,
        { backgroundColor: weatherConditions[weather].color }
      ]}>
    <View style={styles.headerContainer}>
        <MaterialCommunityIcons
          size={132}
          name={weatherConditions[weather].icon}
          color={"#fff"}
        />
        <Text style={styles.tempText}>{temperature}</Text>
        <MaterialCommunityIcons
          size={50}
          name="temperature-celsius"
          color={"#fff"}
        />
      </View>
      
      <View style={{flex:1}}>
      <View style={styles.viewContainer}>
     
      <View>
        <Entypo style={{paddingLeft:35}}
          size={25}
          name="air"
          color={"#fff"}
        />
        <Text style={styles.detailsText}>
          Pressure:
          {pressure} Pa
        </Text>
        </View>
        <View>
        <Entypo style={{paddingLeft:35}}
          size={25}
          name="water"
          color={"#fff"}
        />
        <Text style={styles.detailsText}>
          Humidity:
          {humidity} %
        </Text>
        </View>
        <View>
        <MaterialCommunityIcons style={{paddingLeft:47}}
          size={25}
          name="weather-windy"
          color={"#fff"}
        />
        <Text style={styles.detailsText}>
          Wind Speed:
          {speed} Km/h
        </Text>
        </View>
        </View>
        <View  style={styles.viewContainer}>
        <View>
        <MaterialCommunityIcons style={{paddingLeft:35}}
          size={25}
          name="oil-temperature"
          color={"#fff"}
        />
        <Text style={styles.detailsText}>
          Min Temp:
          {temp_min} `C
        </Text>
        </View>
        <View>
        <MaterialCommunityIcons style={{paddingLeft:42}}
          size={25}
          name="oil-temperature"
          color={"#fff"}
        />
        <Text style={styles.detailsText}>
          Max Temp: 
          { temp_max} `C
        </Text>
        </View>
        <View>
        <MaterialCommunityIcons style={{paddingLeft:43}}
          size={25}
          name="directions-fork"
          color={"#fff"}
        />
        <Text style={styles.detailsText}>
          Wind Direction:
          {degree} N
        </Text></View>
      </View>
      </View>



      <View style={styles.bodyContainer}>
        <Text style={styles.title}>{weatherConditions[weather].title}</Text>
        <Text style={styles.subtitle}>{place}</Text>
      </View>
    </View>
    
  );
};

Weather.propTypes = {
  temperature: PropTypes.number.isRequired,
  weather: PropTypes.string
};

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop:10,
    padding:15
  },
  detailsText: {
    fontSize: 10,
    flexDirection:"row",
    alignItems: "center",
    justifyContent: "space-around",
    color: "#fff",
    padding:10,
    paddingBottom:10,
    paddingLeft:10
  },
  tempText: {
    fontSize: 62,
    color: "#fff"
  },
  bodyContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    paddingLeft: 4,
     marginBottom: 40
  },
  title: {
    fontSize: 45,
    paddingLeft: 22,
    color: "#fff"
  },
  subtitle: {
    fontSize: 30,
    paddingLeft: 25,
    color: "#fff"
  },
  placeText: {
    fontSize: 50,
    color: "#fff"
  },
  viewContainer:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding:10,
    flex:1

  }
});

export default Weather;


