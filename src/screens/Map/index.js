import React, { Component } from "react";
import { StyleSheet, SafeAreaView, Animated, Image, Dimensions} from "react-native";

import MapView from 'react-native-map-clustering';
import { Marker } from 'react-native-maps';

var StoreGlobal = require('../../stores/storeGlobal');
var scooterImg = require('../../img/voi-marker.png');
const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

export default class Map extends Component {
  state = {
    region: {
      latitude: StoreGlobal.currentLatitude,
      longitude: StoreGlobal.currentLatitude,
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

    console.log('Current latitude :', StoreGlobal.currentLatitude);
    console.log('Current longitude :', StoreGlobal.currentLatitude);

    fetch("https://api.voiapp.io/v1/vehicle/status/ready?lat=" + StoreGlobal.currentLatitude + "&lng=" + StoreGlobal.currentLatitude)
      .then(response => response.json())
      .then((responseJson)=> {
        this.setState({
          loading: false,
          dataSource: responseJson
        })
      })
      .catch(error=>console.log(error)) 
  }


  render() {
    if(this.state.loading){
      return( 
        <View style={styles.loader}> 
          <ActivityIndicator size="large" color="#0c9"/>
        </View>
    )}
    return (
      <SafeAreaView style={styles.container}>  
        <MapView
          clustering = {true}
          ref={map => this.map = map}
          clusterColor = '#000'
          clusterTextColor = '#fff'
          clusterBorderColor = '#fff'
          clusterBorderWidth = {4}
          region={this.state.region}
          style={styles.container}>

          {this.state.dataSource.map((marker, index) => {

            console.log('Marker latitude :', marker.location[0]);
            console.log('Marker longitude :', marker.location[0]);

            return (
              <Marker key={index} coordinate={{latitude: marker.location[0], longitude: marker.location[1] }} cluster={true}>
                <Image source={scooterImg} style={styles.scooterImg} />
              </Marker>
            );
          })}
        </MapView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    width: 30,
    height: 37,
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
