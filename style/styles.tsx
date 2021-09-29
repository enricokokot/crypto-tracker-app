import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  // original cast & crew
  centeredScreen: {
    flex: 1,
    backgroundColor: '#00FF7F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenText: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  transparentButton: {
    borderWidth: 1.5,
    borderRadius: 8,
    width: 300,
    padding: 5,
    backgroundColor: 'white',
  },
  buttonView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    justifyContent: 'space-around',
    width: 280,
    height: 130,
    borderWidth: 3,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  boldText: {
    fontWeight: 'bold',
  },
  clickableBackground: {
    // not the best way of signalling you can't press underneath
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  flatListPadding: {
    padding: 2,
  },
  specificFlatlistPadding: {
    paddingHorizontal: '13%',
  },
  // from react-native modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: 'transparent',
    color: 'red',
    margin: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    alignItems: 'center',
  },
  modalTextTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 23,
  },
  // FAB
  fab: {
    position: 'absolute',
    margin: 15,
    right: 0,
    bottom: 0,
    width: 70,
    height: 70,
    borderRadius: 100, // znam da tako ne funkcionira ali tako mi ima smisla
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
