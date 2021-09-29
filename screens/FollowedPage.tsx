import {NavigationProp} from '@react-navigation/core';
import {observer} from 'mobx-react-lite';
import {Instance} from 'mobx-state-tree';
import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from 'react-query';
import {CoinDisplay} from '../components/CoinDisplay';
import {HandleDeleteComponent} from '../components/HandleDeleteComponent';
import {CurrencyModel, store} from '../Store';
import {styles} from '../style/styles';

const queryClient = new QueryClient();

export const FollowedPage = observer(
  ({navigation}: {navigation: NavigationProp<any>}) => {
    return (
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <View style={styles.centeredScreen}>
            {store.followedCurrencies.length ? (
              <>
                <FlatList
                  style={styles.flatListPadding}
                  initialNumToRender={1}
                  data={store.followedCurrencies}
                  keyExtractor={(item: Instance<typeof CurrencyModel>) =>
                    item.Label
                  }
                  renderItem={({item: item, index}) => {
                    return <CoinDisplay item={item} index={index} />;
                  }}
                />
                <HandleDeleteComponent reason="DeleteFollow" />
              </>
            ) : (
              <View style={styles.centeredScreen}>
                <Text style={styles.screenText}>
                  You are not following any currencies... for now
                </Text>
              </View>
            )}
          </View>
        </QueryClientProvider>
      </SafeAreaProvider>
    );
  },
);
