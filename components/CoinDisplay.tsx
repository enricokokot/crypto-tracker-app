import {observer} from 'mobx-react-lite';
import {Instance} from 'mobx-state-tree';
import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {CurrencyModel, store} from '../Store';
import {styles} from '../style/styles';

export const CoinDisplay = observer(
  ({index, item}: {index: number; item: Instance<typeof CurrencyModel>}) => {
    return (
      <Pressable
        key={index}
        style={styles.flatListPadding}
        onPress={() => {
          store.setSelectedCurrency(item.Label);
          store.toggleModal();
        }}>
        {/* <View style={styles.transparentButton}> */}
        <View style={styles.buttonView}>
          <Text>
            <Text style={styles.boldText}>Name:</Text> {item.Name}
          </Text>
          <Text>
            <Text style={styles.boldText}>Price:</Text> {item.Price}
          </Text>
          <Text>
            <Text style={styles.boldText}>Volume in last 24 h:</Text>{' '}
            {item.Volume_24h}
          </Text>
          <Button
            color="#008844"
            onPress={() => {
              if (item.Followed == false) store.addFollowedCurrency(item.Label);
              else store.removeFollowedCurrency(item.Label);
            }}>
            <Text>{item.Followed ? 'UNFOLLOW' : 'FOLLOW'}</Text>
          </Button>
        </View>
      </Pressable>
    );
  },
);
