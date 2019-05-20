import React from "react";
import {SafeAreaView, StyleSheet, View, ActivityIndicator, FlatList, Text, TouchableOpacity, PermissionsAndroid,Platform} from 'react-native';
var StoreGlobal = require('../../stores/storeGlobal');

export default class Bird extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource:[]
     };
   }
   
componentDidMount(){
  
  var that =this;
  //Checking for the permission just after component loaded
  if(Platform.OS === 'ios'){
    this.callLocation(that);
  }else{
    async function requestLocationPermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
            'title': 'Location Access Required',
            'message': 'This App needs to Access your location'
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted
          that.callLocation(that);
        } else {
          alert("Permission was denied");
        }
      } catch (err) {
        alert("err",err);
        console.warn(err)
      }
    }
    requestLocationPermission();
  }    
 }
 callLocation(that){
  //alert("callLocation Called");
    navigator.geolocation.getCurrentPosition(
      //Will give you the current location
       (position) => {
          const currentLongitude = JSON.stringify(position.coords.longitude);
          //getting the Longitude from the location json
          const currentLatitude = JSON.stringify(position.coords.latitude);
          //getting the Latitude from the location json
          that.setState({ currentLongitude:currentLongitude });
          //Setting state Longitude to re-render the Longitude Text
          that.setState({ currentLatitude:currentLatitude });
          //Setting state Latitude to re-render the Longitude Text
       },
       (error) => alert(error.message),
       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    that.watchID = navigator.geolocation.watchPosition((position) => {
      //Will give you the location on location change
        console.log(position);
        const currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Longitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        //getting the Latitude from the location json
       that.setState({ currentLongitude:currentLongitude });
       //Setting state Longitude to re-render the Longitude Text
       that.setState({ currentLatitude:currentLatitude });
       //Setting state Latitude to re-render the Longitude Text

       StoreGlobal.currentLongitude = currentLongitude;
       StoreGlobal.currentLatitude = currentLatitude;
    });

     fetch("https://tier.frontend.fleetbird.eu/api/prod/v1.06/map/cars/?lat" + this.state.currentLatitude + "&lng=" + this.state.currentLongitude)
       .then(response => response.json())
       .then((responseJson)=> {
         this.setState({
           loading: false,
           dataSource: responseJson
         })
       })
       .catch(error=>console.log(error)) 
   }

  componentWillUnmount = () => {
    navigator.geolocation.clearWatch(this.watchID);
  }
   
   FlatListItemSeparator = () => {
     return (
       <View style={{
         height: .5,
         width:"100%",
         backgroundColor:"rgba(0,0,0,0.5)",
         }}
       />
     );
   }

renderItem=(data)=>
  <TouchableOpacity style={styles.list}>
    <Text style={styles.lightText}>carId: {data.item.carId}</Text>
    <Text style={styles.lightText}>title: {data.item.title}</Text>
    <Text style={styles.lightText}>lat: {data.item.lat}</Text>
    <Text style={styles.lightText}>lon: {data.item.lon}</Text>
    <Text style={styles.lightText}>licencePlate: {data.item.licensePlate}</Text>
    <Text style={styles.lightText}>vehicleStateId: {data.item.vehicleStateId}</Text>
    <Text style={styles.lightText}>vehicleTypeId: {data.item.vehiclieTypeId}</Text>
    <Text style={styles.lightText}>pricingTime: {data.item.pricingTime}</Text>
    <Text style={styles.lightText}>pricingParking: {data.item.pricingParking}</Text>
    <Text style={styles.lightText}>reservationState: {data.item.reservationState}</Text>
    <Text style={styles.lightText}>address: {data.item.address}</Text>
    <Text style={styles.lightText}>zipCode: {data.item.zipCode}</Text>
    <Text style={styles.lightText}>city: {data.item.city}</Text>
    <Text style={styles.lightText}>locationId: {data.item.locationId}</Text>
  </TouchableOpacity>

render(){
 if(this.state.loading){
  return( 
    <View style={styles.loader}> 
      <ActivityIndicator size="large" color="#0c9"/>
    </View>
)}
return(
  <SafeAreaView style={{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
}}>
   <View style={styles.container}>
     <FlatList
      data= {this.state.dataSource}
      ItemSeparatorComponent = {this.FlatListItemSeparator}
      renderItem= {item=> this.renderItem(item)}
      keyExtractor= {item=>item.carId.toString()}
     />
   </View>
  </SafeAreaView>
)}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
   },
  loader:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
   },
  list:{
    paddingVertical: 4,
    margin: 5,
    backgroundColor: "#fff"
   }
});