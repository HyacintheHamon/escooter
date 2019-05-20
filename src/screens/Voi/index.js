import React from "react";
import { SafeAreaView, StyleSheet, View, ActivityIndicator, FlatList, Text, TouchableOpacity } from "react-native";

var StoreGlobal = require('../../stores/storeGlobal');

export default class Voi extends React.Component {

constructor(props) {
 super(props);
 this.state = {
   loading: true,
   dataSource:[]
  };
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
    <Text style={styles.lightText}>id: {data.item.id}</Text>
    <Text style={styles.lightText}>short: {data.item.short}</Text>
    <Text style={styles.lightText}>name: {data.item.name}</Text>
    <Text style={styles.lightText}>zone: {data.item.zone}</Text>
    <Text style={styles.lightText}>type: {data.item.type}</Text>
    <Text style={styles.lightText}>status: {data.item.status}</Text>
    <Text style={styles.lightText}>bounty: {data.item.bounty}</Text>
    <Text style={styles.lightText}>location: {data.item.location}</Text>
    <Text style={styles.lightText}>battery: {data.item.battery}%</Text>
    <Text style={styles.lightText}>locked: {data.item.locked}</Text>
    <Text style={styles.lightText}>updated: {data.item.updated}</Text>
    <Text style={styles.lightText}>mileage: {data.item.mileage}</Text>
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
      keyExtractor= {item=>item.id.toString()}
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