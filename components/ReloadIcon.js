import React from 'react'
import { View, Text, StyleSheet} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import {colors } from '../utils/index'


export default function ReloadIcon({load}) {

    return (
        <View style={styles.reloadIcon}>
            <Ionicons onPress={load} name='ios-refresh' size={24} color='black'/>
        </View>
    )
}

const styles = StyleSheet.create({
    reloadIcon:{
        position: 'absolute', left: '48%',top:'100%'
        
    }
})