import React, { useState, useEffect, useContext } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import { styles } from '../styles/GlobalStyles';
import { ScrollView } from 'react-native-gesture-handler';
import { UserContext } from '../components/AuthContext';
import { AuthProvider } from '../components/AuthContext';
import FloatingButton from '../components/FloatingButton';

const HomeScreen = ({ navigation }) => {
    const [raceData, setRaceData] = useState([]);
    const [gotRaces, setGotRaces] = useState(false);
    useEffect(() => {
        fetchRaceData();
    }, []);

    const { tmpKey, tmpSecret } = useContext(UserContext);
    console.log("TestHome " + tmpKey)
    useEffect(() => {
      console.log("Current tmpKey value:", tmpKey);
      console.log("Current tmpSecret value:", tmpSecret);
    }, [tmpKey, tmpSecret]);

    function failureCallback(error) {
        console.error(`Error getting race list: ${error}`);
      }
    
    const fetchRaceData = async () => {
        setGotRaces(false);
        let newData = [];
        let races = [];
        let raceError = false;
        
            try {
                //let response = await fetch(`https://test3.runsignup.com/Rest/races?tmp_secret=${tmpSecret}&format=json&page=1&results_per_page=50&sort=name+ASC&start_date=2030-02-12&distance_units=K`);
                //let response = await fetch(`https://test3.runsignup.com/Rest/races?tmp_key=${tmpKey}&tmp_secret=${tmpSecret}&format=json&events=F&race_headings=F&race_links=F&include_waiver=F&include_multiple_waivers=F&include_event_days=F&include_extra_date_info=F&page=1&results_per_page=50&sort=name+ASC&start_date=today&only_partner_races=F&search_start_date_only=F&only_races_with_results=F&distance_units=K
                //`);
                let response = await fetch(`https://test3.runsignup.com/Rest/races?tmp_key=${tmpKey}&tmp_secret=${tmpSecret}&format=json&events=F&race_headings=F&race_links=F&include_waiver=F&include_multiple_waivers=F&include_event_days=F&include_extra_date_info=F&page=1&results_per_page=50&sort=name+ASC&start_date=today&only_partner_races=F&search_start_date_only=F&only_races_with_results=F&distance_units=K`);
                let data = await response.json();
                console.log(JSON.stringify(data)+"testing");
                races = data.races.map(obj => obj.race);
                races.forEach(race => {
                    let raceName = race.name;
                    let date = race.next_date !== null ? race.next_date : race.last_date;
                    newData.push({ raceName, date });
                });
            } catch (error) {
                failureCallback(error);
                raceError = true;
            }

        if (raceError) {
            raceError = false;
            Alert.alert(
                'Error',
                'Sorry, the system ran into some trouble and some races failed to load. Please try closing and reopening the app.',
                [{ text: 'OK', style: styles.failedFetchingErrorText }]
            );
            }
        setRaceData(newData);
        setGotRaces(true);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={localStyles.container}>
                {raceData.length == 0 ? (
                    gotRaces == true ? ( 
                        <View style={localStyles.centerAlign}>
                            <Text style={localStyles.noRacesErrorText}>No races found for this user, if you believe this to be an issue with the app, contact help@runsignup.com.</Text>
                        </View>
                    ) : (
                        <View style={localStyles.centerAlign}>
                            <Text style={localStyles.noRacesErrorText}>Loading...</Text>
                        </View>
                    )
                ) : (
                    <ScrollView>
                        <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                        {raceData.map((rowData, index) => (
                            <Row
                                key={index}
                                data={[renderRaceInfo(navigation, rowData)]} // Passing as an array
                                //style={localStyles.row}
                                //textStyle={localStyles.text}
                                flexArr={[1, 1]} // Adjust column width
                            />
                        ))}
                        </Table>
                    </ScrollView>
                )}
                <FloatingButton style={{bottom:0}}/>
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
    row: { backgroundColor: '#f1f8ff' },
    cellContainer: { flex: 1, alignItems: 'left', justifyContent: 'space-between' , paddingLeft: 10, },
    text: { margin: 6, fontSize: 20 },
    raceName: { fontSize: 20, fontWeight: 'bold', paddingTop: 0 },
    date: { fontSize: 18, paddingBottom: 10 },
    touchable: { flex: 1 },
    noRacesErrorText: { margin: 6, fontSize: 20, textAlign:'center' },
    failedFetchingErrorText: { margin: 6, fontSize: 20, textAlign:'center', color:'red'},
    centerAlign: {alignItems: 'center', justifyContent: 'center', flexDirection:'row', flex: 1}
});

const HomeScreenBase = ({ navigation }) => {
    return (
        <AuthProvider>
            <HomeScreen />
        </AuthProvider>
    );
};

export default HomeScreen;

