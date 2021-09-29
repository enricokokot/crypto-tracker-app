import {observer} from 'mobx-react-lite';
import {Instance} from 'mobx-state-tree';
import React from 'react';
import {FlatList} from 'react-native';
import {CurrencyModel} from '../Store';
import {styles} from '../style/styles';
import {CoinDisplay} from './CoinDisplay';

export const FlatListVertical = observer(
  ({data}: {data: Instance<typeof CurrencyModel>[]}) => {
    return (
      <>
        <FlatList
          style={styles.specificFlatlistPadding}
          initialNumToRender={3}
          data={data}
          // isko je string pa son number pretvori va string, is this okay?
          keyExtractor={(coin, id) => id.toString()}
          renderItem={({item, index}) => {
            return <CoinDisplay item={item} index={index} />;
          }}
        />
        {/* would be loading icon for not yet fetched currencies,
            dont know how to implement it though */}
        {/* <View
          style={{
            zIndex: 100,
            justifyContent: 'center',
            flex: 1,
            bottom: 20,
          }}>
          <ActivityIndicator size="small" />
        </View> */}
      </>
    );
  },
);
