import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import { styles } from '../styles/GlobalStyles';
import Header from '../navigation/Header';

const HomeScreen = ({ navigation }) => {
    const [raceData, setRaceData] = useState([]);
    const race_director_api_key = 'ITdG8ewa2dHun6YrE7k2tEhpk7byTl2w';
    //const race_director_races = ['26330', '26331', '26332', '26329'];
    const race_director_races = [];
    useEffect(() => {
        fetchRaceData();
    }, []);

    const fetchRaceData = async () => {
        const newData = [];
        for (const raceid of race_director_races) {
            try {
                const response = await fetch(`https://test3.runsignup.com/Rest/race/${raceid}?api_key=${race_director_api_key}&format=json`);
                const data = await response.json();
                const raceName = data.race.name;
                const date = data.race.next_date !== null ? data.race.next_date : data.race.last_date;
                newData.push({ raceName, date });
            } catch (error) {
                console.error(error);
            }
        }
        setRaceData(newData);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={localStyles.container}>
                {race_director_races.length == 0 ? (
                <View style={localStyles.centerAlign}>
                    <Text style={localStyles.noRacesErrorText}>No races found for this user, if you believe this to be an issue with the app, contact help@runsignup.com.</Text>
                </View>
                ) : ( raceData.length == 0 ? (
                    <View style={localStyles.centerAlign}>
                        <Text style={localStyles.failedFetchingErrorText}>Sorry, the system ran into some trouble. Please try closing and reopening the app.</Text>
                    </View>
                ) : 
                    <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                    {raceData.map((rowData, index) => (
                        <Row
                            key={index}
                            data={[renderRaceInfo(navigation, rowData)]} // Passing as an array
                            style={localStyles.row}
                            textStyle={localStyles.text}
                            flexArr={[1, 1]} // Adjust column width
                        />
                    ))}
                    </Table>
                )}
            </View>
        </SafeAreaView>
    );
};

const renderRaceInfo = (navigation, rowData) => {
    const { raceName, date } = rowData;
    return (
        <TouchableOpacity onPress={() => navigation.navigate("RacePage")} style={localStyles.touchable}>
            <View style={localStyles.cellContainer}>
                <Text style={[localStyles.text, localStyles.raceName]}>{raceName}</Text>
                <Text style={[localStyles.text, localStyles.date]}>{date}</Text>
            </View>
        </TouchableOpacity>
    );
};

const localStyles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    row: { height: 80, backgroundColor: '#f1f8ff' },
    cellContainer: { flex: 1, alignItems: 'left', justifyContent: 'space-between' , paddingLeft: 10, },
    text: { margin: 6, fontSize: 20 },
    raceName: { fontSize: 20, fontWeight: 'bold', paddingTop: 0 },
    date: { fontSize: 18, paddingBottom: 20 },
    touchable: { flex: 1 },
    noRacesErrorText: { margin: 6, fontSize: 20, textAlign:'center' },
    failedFetchingErrorText: { margin: 6, fontSize: 20, textAlign:'center', color:'red'},
    centerAlign: {alignItems: 'center', justifyContent: 'center', flexDirection:'row', flex: 1}
});

export default HomeScreen;