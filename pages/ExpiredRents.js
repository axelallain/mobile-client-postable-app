import React, { useState, useEffect } from 'react';
import {Image, TextInput, Text, View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native'
import TopBar from '../components/TopBar'
import axios from 'axios';
import Moment from 'moment'

const ExpiredRents = props => {

  Moment.locale('fr');

  const axios = require('axios');
  const [rents, setRents] = useState([])

  const getRentsFromApiAsync = async () => {
    const response = await axios.get('http://localhost:8080/rents', {
      params: {
        username: props.route.params.username,
        status: 'expired'
      }
    });
    setRents(response.data);
    console.log(rents);
  }

  useEffect(() => {
    getRentsFromApiAsync();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
        { rents.map((rent) => (
          <TouchableOpacity onPress={() => props.navigation.push('RentPage', { username: props.route.params.username, rent_id: rent.id })} style={styles.TouchableOpacity}>
            <Text style={styles.buttonsText}>Letterbox {rent.letterbox.id}</Text>
            <Text style={styles.buttonsText}>{rent.letterbox.address}</Text>
            <Text style={styles.buttonsText}>{rent.letterbox.city}, {rent.letterbox.country}</Text>
            <Text style={styles.buttonsText}>Du {Moment(rent.startingDate).format('DD-MM-Y à hh:mm')} au {Moment(rent.endingDate).format('DD-MM-Y à hh:mm')}</Text>
          </TouchableOpacity>
        ))}
        
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
      height: "100%",
      backgroundColor: '#f2f2f2',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: "2%"
    },

    title: {
        marginTop: "7%",
        fontWeight: 'bold',
        fontSize: 16
    },

    buttonsText: {
        color: 'black',
        marginTop: "0.4%",
        marginBottom: "0.4%"
    },

    TouchableOpacity: {
        backgroundColor: 'white',
        paddingTop: "4%",
        paddingRight: "10%",
        paddingBottom: "4%",
        paddingLeft: "10%",
        marginTop: "8%",
        marginBottom: "0%",
        width: "100%",
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 3,
    }

});

export default ExpiredRents;