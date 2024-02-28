import { StyleSheet, StatusBar } from 'react-native';

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        //backgroundColor: 'rgba(200, 200, 52, 0)', // Pink background for the entire safe area
    },
    header: {
        backgroundColor: 'lightblue',
        paddingTop: StatusBar.currentHeight + 20,
        paddingBottom: 20,
        alignItems: 'center',
        flexDirection: 'row',
    },
    headerText: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 22,
        width: '50%',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuButton: {
        left: 20,
        zIndex: 1,
        width: '25%',
    },
    gap: {
        width: '25%',
    },
    headerWithBottomBar: {
        paddingBottom: 20, // Adjust this value as needed
        borderBottomWidth: 2,
        borderBottomColor: 'black',
    },
    header: {
        //backgroundColor: 'lightblue',
        paddingTop: StatusBar.currentHeight + 20,
        paddingBottom: 20,
        alignItems: 'center',
        flexDirection: 'row',
    },
    headerText: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 22,
        width: '50%',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuButton: {
        left: 20,
        zIndex: 1,
        width: '25%',
    },
    gap: {
        width: '25%',
    },
    headerWithBottomBar: {
        paddingBottom: 20, // Adjust this value as needed
        borderBottomWidth: 2,
        borderBottomColor: 'black',
    },
    paddingFlex: {
        flex: 1,
        flexDirection: "row",
    },
    padding: {
        width: "2%",
    },
});
