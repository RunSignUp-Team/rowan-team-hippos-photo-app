import React, { useState, useEffect, useContext } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Alert, LogBox } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import { styles } from '../styles/GlobalStyles';
import { ScrollView } from 'react-native-gesture-handler';
import { UserContext } from '../components/AuthContext';
import { AuthProvider } from '../components/AuthContext';
import { AntDesign } from "@expo/vector-icons";


//LogBox.ignoreLogs(['Invalid prop textStyle of type array supplied to Cell']);

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
                //let response = await fetch(`https://test3.runsignup.com/Rest/races?tmp_key=${tmpKey}&format=json&events=T&race_headings=F&race_links=F&include_waiver=F&include_multiple_waivers=F&include_event_days=F&include_extra_date_info=F&page=1&results_per_page=50&sort=name+ASC&start_date=today&only_partner_races=F&search_start_date_only=F&only_races_with_results=F&distance_units=K
                //`);
                let response = await fetch(`https://test3.runsignup.com/Rest/races?tmp_key=${tmpKey}&tmp_secret=${tmpSecret}&format=json&events=T&race_headings=F&race_links=F&include_waiver=F&include_multiple_waivers=F&include_event_days=F&include_extra_date_info=F&page=1&results_per_page=50&sort=name+ASC&start_date=today&only_partner_races=F&search_start_date_only=F&only_races_with_results=F&distance_units=K
                `);
                let data = await response.json();
                console.log(JSON.stringify(data)+"testing");
                races = data.races.map(obj => obj.race);
                races.forEach(race => {
                    let raceName = race.name;
                    let date = race.next_date !== null ? race.next_date : race.last_date;
                    newData.push({ raceName, date, race });
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
            <View style={styles.paddedContainer}>
                <Text style={[styles.title1, styles.container, {paddingBottom: 25}]}>Your Races</Text>
                {raceData ? (
                    raceData.length == 0 ? (
                        gotRaces == true ? ( 
                            <View style={styles.centerAlign}>
                                <Text style={styles.errorText}>No races found for this user, if you believe this to be an issue with the app, contact help@runsignup.com.</Text>
                            </View>
                        ) : (
                            <View style={styles.centerAlign}>
                                <Text style={styles.errorText}>Loading...</Text>
                            </View>
                        )
                    ) : (
                        <ScrollView>
                            <Table borderStyle={{ borderColor: '#C1C0B9' }}>
                            {raceData.map((rowData, index) => (
                                <Row
                                    key={index}
                                    data={[renderRaceInfo(navigation, rowData)]} // Passing as an array
                                    style={styles.row}
                                    textStyle={styles.rowTextMargin}
                                    flexArr={[1, 1]} // Adjust column width
                                />
                            ))}
                            </Table>
                        </ScrollView>
                    )
                ) : (
                    <Text>Error Loading Albums</Text>
                )}         
            </View>
        </SafeAreaView>
    );
};




const renderRaceInfo = (navigation, rowData) => {
    const { raceName, date, race } = rowData;
    return (
        <TouchableOpacity onPress={() => navigation.navigate("RacePage", { raceData: race, date: date })} style={styles.touchable}>
            <View style={styles.cellContainer}>
                <View style={styles.textContainer}>
                    <Text style={[styles.rowTextMargin, styles.rowTextBold]}>{raceName}</Text>
                    <Text style={[styles.rowTextMargin, styles.rowText]}>{date}</Text>
                </View>
                <AntDesign style={[styles.rowTextMargin, styles.arrow]} name="doubleright" />
            </View>
        </TouchableOpacity>
    );
};

const localStyles = StyleSheet.create({
    
});

export default HomeScreen;

