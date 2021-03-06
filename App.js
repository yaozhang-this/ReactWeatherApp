import { StatusBar } from 'expo-status-bar';
import React, { Component, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import WeatherInfo from './components/WeatherInfo'
import UnitsPicker from './components/UnitsPicker'
import ReloadIcon from './components/ReloadIcon'
import { colors } from './utils/index';
import { WEATHER_API_KEY } from '@env';
import { AppearanceProvider } from 'react-native-appearance';


const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'

export default function App() {
  const [errorMessage, setErrorMessage] = useState(null)
  const [currentWeather, setCurrentWeather] = useState(null)
  const [unitWeather, setUnitWeather] = useState('metric')

useEffect(() => {
  load()

}, [unitWeather])
async function load()
{
  setCurrentWeather(null)
  setErrorMessage(null)
  try{
    let { status } = await Location.requestPermissionsAsync()
    if( status  != 'granted'){
      setErrorMessage('Access to location is needed to run this app')
      return
    }
    const location = await Location.getCurrentPositionAsync()
    const {latitude, longitude} = location.coords
    console.log({latitude, longitude})
    const weatherurl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitWeather}&appid=${WEATHER_API_KEY}`
  
    const response = await fetch(weatherurl)
    const result = await response.json()

    if(response.ok){
      setCurrentWeather(result)
    }
    else {
      setErrorMessage(result.message)
    }

  }
  catch (error) {
    setErrorMessage(error.message)
  }
}

if(currentWeather){
  const {
    main: {temp},
  } = currentWeather
  return (
    <View style={styles.container}>
      <StatusBar style="auto"/>
      <View style={styles.main}>
        <UnitsPicker unitWeather={unitWeather} setUnitWeather={setUnitWeather}></UnitsPicker>
        <ReloadIcon load={load}/>
        <WeatherInfo currentWeather ={currentWeather}/>

      </View>
    </View>
  )
}
else if(errorMessage){
  return (
    <View style={styles.container}>
      <Text>{errorMessage}</Text>
      <StatusBar style="auto"/>
    </View>
  )
}
else{
  return(
    <View style={styles.container}>
      <ActivityIndicator size='large' color={colors.PRIMARY_COLOR}/>
      <StatusBar style="auto"/>

    </View>
  )
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
    justifyContent: 'center',
  },
});
