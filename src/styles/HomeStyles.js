import { StyleSheet, StatusBar } from 'react-native';

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFC0CB', // Pink background for the entire safe area
    },
    header: {
        paddingTop: StatusBar.currentHeight, 
        height: 60 + (StatusBar.currentHeight || 0), 
        backgroundColor: '#FF69B4',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 24,
        color: '#FFF',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        color: '#000',
    },
});
