import React from "react";
import { View, Image, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const GooglePlacesInput = ({ getLocation }) => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Search for any city"
      minLength={2} // minimum length of text to search
      autoFocus={false}
      style={{ flex: 1 }}
      returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      listViewDisplayed="auto" // true/false/undefined
      fetchDetails={true}
      //renderDescription={row => row.description} // custom description render
      onPress={(data, details) => {
        console.log(
          "Chek Location Function lat",
          data,
          details,
          details.formatted_address
          
        );

        getLocation(
          details.geometry.location.lat,
          details.geometry.location.lng
        );
      
      }}
      getDefaultValue={() => ""}
      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: "your api key",
        language: "en", // language of the results
        types: "(cities)" // default: 'geocode'
      }}
      styles={{
        textInputContainer: {
          width: "100%"
        },
        description: {
          fontWeight: "bold"
        },
        predefinedPlacesDescription: {
          color: "#1faadb"
        }
      }}
    
      nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      
      debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
    />
  );
};
export { GooglePlacesInput };
