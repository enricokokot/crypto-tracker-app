import {NavigationProp} from '@react-navigation/core';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {Button} from 'react-native-paper';
import {useQuery} from 'react-query';
import {UndoFollowSnackbar} from '../components/UndoFollowSnackbar';
import {store} from '../Store';
import {styles} from '../style/styles';
import {QueryWaitingScreen} from '../components/QueryWaitingScreen';

export const ListPage = observer(
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
        <FlatList
          style={{padding: 40}}
          initialNumToRender={1}
          // data={data.Markets[0]}
          data={data}
          // isko je string pa son number pretvori va string, is this okay?
          keyExtractor={(coin, id) => id.toString()}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                key={index}
                style={{padding: 2}}
                onPress={() => {
                  store.setSelectedCurrency(item.Label);
                  navigation.navigate('Details');
                }}>
                <View style={styles.transparentButton}>
                  <Text>
                    <Text style={{fontWeight: 'bold'}}>Name:</Text> {item.Name}
                  </Text>
                  <Text>
                    <Text style={{fontWeight: 'bold'}}>Price:</Text>{' '}
                    {item.Price}
                  </Text>
                  <Text>
                    <Text style={{fontWeight: 'bold'}}>
                      Volume in last 24 h:
                    </Text>{' '}
                    {item.Volume_24h}
                  </Text>
                  <Button
                    onPress={() => {
                      store.addFollowedCurrency(item.Label);
                    }}>
                    <Text>FOLLOW</Text>
                  </Button>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        <UndoFollowSnackbar />
      </View>
    );
  },
);
