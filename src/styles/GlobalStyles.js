import { StyleSheet, StatusBar } from 'react-native';

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        //backgroundColor: 'rgba(200, 200, 52, 0)', // Pink background for the entire safe area
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
    headerBlackBar: {
        //paddingBottom: 20, // Adjust this value as needed
        height: 2,
        backgroundColor: 'black',
    },
    headerBarPadding: {
        paddingBottom: 10, // Adjust this value as needed
    },
    paddingFlex: {
        flex: 1,
        flexDirection: "row",
    },
    padding: {
        width: "2%",
    },
    container: {
        paddingTop: 10,
        paddingHorizontal: 5,
    },
    paddedContainer: {
        padding: 16,
    },
    row: { 
        backgroundColor: '#ccc',
        borderRadius: 10,
        marginVertical: 3,
     },
    cellContainer: { 
        flexDirection: 'row', 
        alignItems: 'center',
     },
    textContainer: { flex: 1, alignItems: 'left', justifyContent: 'space-between' , paddingLeft: 10, paddingVertical: 5},
    rowTextMargin: { marginHorizontal: 6 },
    rowTextBold: { fontSize: 20, fontWeight: 'bold', paddingVertical: 5 },
    rowText: { fontSize: 18, paddingVertical: 5 },
    touchable: { flex: 1 },
    errorText: { margin: 6, fontSize: 20, textAlign:'center', color:'red' },
    failedFetchingErrorText: { margin: 6, fontSize: 20, textAlign:'center', color:'red'},
    centerAlign: {alignItems: 'center', justifyContent: 'center', flexDirection:'row'},
    title1: {
        fontSize: 30, 
        fontWeight: 'bold',
    },
    title2: {
        fontSize: 24, 
        fontWeight: 'bold',
    },
    titleInfo: {
        fontSize: 18,
    },
    arrow: {
        fontSize: 30, 
        fontWeight: 'bold',
    },
    line: {
        height: 5,
        backgroundColor: '#ddd',
    },
});
