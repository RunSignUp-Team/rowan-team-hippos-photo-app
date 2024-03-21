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
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
    },
    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 20,
        textAlign: 'center',
    },
    albumOption: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        backgroundColor: '#f0f0f0', // Light grey background for each album option
        marginHorizontal: 20, // Add some horizontal margin
        marginTop: 10, // Space out each album option vertically
        borderRadius: 5, // Rounded corners for the album options
    },
    albumOptionText: {
        fontSize: 16,
    },
    albumDetailText: {
        fontSize: 14,
        color: '#666', 
    },
    albumListContainer: {
        maxHeight: 300, 
    },
    galleryContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#f0f0f0', // Light grey background for the gallery
    },
    thumbnailStyle: {
        width: 100,
        height: 100,
        margin: 5,
        borderRadius: 5, 
    },
    galleryContentContainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',   
        padding: 10,
        position: 'absolute',
        bottom: 30,
        right: 30,
         
    },
    cropButton: {
        backgroundColor: '#007bff', 
        padding: 10,
        borderRadius: 5,
        
    },
    cropButtonText: {
        color: '#ffffff', 
        fontWeight: 'bold',
    },
});
