import {NavigationProp} from '@react-navigation/core';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {View} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {useQuery} from 'react-query';
import {DetailsModal} from '../components/DetailsModal';
import {FlatListVertical} from '../components/FlatListVertical';
import {QueryWaitingScreen} from '../components/QueryWaitingScreen';
import {UndoFollowSnackbar} from '../components/UndoFollowSnackbar';
import {store} from '../Store';
import {styles} from '../style/styles';

export const ListPageWithFilter = observer(
  ({navigation}: {navigation: NavigationProp<any>}) => {
    // const [data, setData] = React.useState([]);

    // const getMonies = async () => {
    //   const res = await fetch(API_URL);
    //   const things = await res.json();
    //   setData(things);
    //   return things;
    // };

    // React.useEffect(() => {
    //   getMonies();
    // }, []);

    // const getCoinData = async () => {
    //   //   // const headers = new Headers({
    //   //   //   "Accept": "application/json",
    //   //   //   "Content-Type": "application/json",
    //   //   // });
    //   //   const data = await fetch(API_URL /*, { headers }*/);
    //   //   const results = await data.json();
    //   //   return results;
    //   // };

    const {isSuccess, data} = useQuery('queryKey', () => {
      return store.fetchData();
    });

    if (!isSuccess) {
      return <QueryWaitingScreen />;
    }

    return (
      <View style={styles.centeredScreen}>
        <View style={{flex: 1}}>
          <FlatListVertical data={store.filterFilteredData(data)} />
          <DetailsModal />
          <UndoFollowSnackbar />
        </View>
        {store.filterBarVisible && (
          <Searchbar
            placeholder="Search"
            onChangeText={input => store.onChangeText(input)}
            value={store.filterBar}
          />
        )}
        {/* would be used to make searchbar appear but UI is messy */}
        {/* <FAB
          style={styles.fab}
          // small
          icon="file-search"
          onPress={() => {
            store.toggleFilterBar();
          }}
        /> */}
      </View>
    );
  },
);
