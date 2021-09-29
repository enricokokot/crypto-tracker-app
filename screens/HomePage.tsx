import {NavigationProp} from '@react-navigation/core';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {Animated, Text, View} from 'react-native';
import {useQuery} from 'react-query';
import {DetailsModal} from '../components/DetailsModal';
import {FlatListHorizontal} from '../components/FlatListHorizontal';
import {QueryWaitingScreen} from '../components/QueryWaitingScreen';
import {UndoFollowSnackbar} from '../components/UndoFollowSnackbar';
import {store} from '../Store';
import {styles} from '../style/styles';

export const HomePage = observer(
  ({navigation}: {navigation: NavigationProp<any>}) => {
    const scrollX = React.useRef(new Animated.Value(0)).current;

    const {isSuccess, data} = useQuery('queryKey', () => {
      return store.fetchData();
    });

    if (!isSuccess) {
      return <QueryWaitingScreen />;
    }

    // je ovo nužno? trenutno se ne čini
    // store.filterTopData(data);

    return (
      <View style={styles.centeredScreen}>
        <View
          style={{
            flex: 1,
          }}>
          <Text style={styles.screenText}>Top 3 coins by price ATM</Text>
          <FlatListHorizontal
            data={store.filterData(data, 'MostValuedCoins')}
          />
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.screenText}>Top 3 most traded coins ATM</Text>
          <FlatListHorizontal
            data={store.filterData(data, 'MostTradedCoins')}
          />
        </View>
        {/* <View
          // temporary placeholder
          style={{
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.screenText}>Third List Placeholder</Text>
        </View> */}
        <View style={{flex: 1}}>
          <Text style={styles.screenText}>Top 3 longest named coins ATM</Text>
          <FlatListHorizontal
            data={store.filterData(data, 'LongestNameCoins')}
          />
        </View>
        <DetailsModal />
        {/* stignem unfollow-at currency i onda još to undo-at sa snack-om, 
            ne stvara više probleme ali je malo lame */}
        <UndoFollowSnackbar />
      </View>
    );
  },
);
