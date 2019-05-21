import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, Animated, Image, Dimensions} from "react-native";
import MapView from "react-native-maps";

var StoreGlobal = require('../../stores/storeGlobal');
var scooterImg = require('../../img/scooter.png');
const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

export default class Map extends Component {
  state = {
    region: {
      latitude: StoreGlobal.currentLatitude,
      longitude: StoreGlobal.currentLongitude,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
    },
    dataSource: []
  };

  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
  }

  componentDidMount(){
  fetch("https://api.voiapp.io/v1/vehicle/status/ready?lat=" + StoreGlobal.currentLatitude + "&lng=" + StoreGlobal.currentLongitude)
    .then(response => response.json())
    .then((responseJson)=> {
      this.setState({
        loading: false,
        dataSource: responseJson
      })
    })
    .catch(error=>console.log(error)) 

    console.log('latitude', StoreGlobal.currentLatitude);
    console.log('longitude', StoreGlobal.currentLongitude);
}


  render() {

    return (
      <View style={styles.container}>
        <MapView
          ref={map => this.map = map}
          initialRegion={this.state.region}
          style={styles.container}
        >
          {this.state.dataSource.map((marker, index) => {

            console.log('item lattitude', marker.location[0]);
            console.log('item longitude', marker.location[1]);

            return (
              <MapView.Marker key={index} coordinate={{
                latitude: marker.location[0],
                longitude: marker.location[1],
              }}>
                  <Image
                  source={scooterImg}
                  style={styles.scooterImg}
                  />
                <Text style={styles.batteryText}>{marker.battery}%</Text>
              </MapView.Marker>
            );
          })}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(130,4,150, 0.9)",
  },
  scooterImg: {
  },
  batteryText: {
    fontSize: 10
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)",
  },
});
