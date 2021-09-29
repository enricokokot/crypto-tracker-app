import {NavigationProp} from '@react-navigation/core';
import {observer} from 'mobx-react-lite';
import {Instance} from 'mobx-state-tree';
import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from 'react-query';
import {CoinDisplay} from '../components/CoinDisplay';
import {HandleDeleteComponent} from '../components/HandleDeleteComponent';
import {UndoFollowSnackbar} from '../components/UndoFollowSnackbar';
import {CurrencyModel, store} from '../Store';
import {styles} from '../style/styles';

const queryClient = new QueryClient();

export const HistoryPage = observer(
  ({navigation}: {navigation: NavigationProp<any>}) => {
    return (
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <View style={styles.centeredScreen}>
            {store.historyOfCurrencies.length ? (
              <>
                <FlatList
                  style={{padding: 2}}
                  initialNumToRender={1}
                  data={store.historyOfCurrencies}
                  keyExtractor={(item: Instance<typeof CurrencyModel>) =>
                    item.Label
                  }
                  renderItem={({item: item, index}) => {
                    return <CoinDisplay item={item} index={index} />;
                  }}
                />
                <HandleDeleteComponent reason="DeleteHistory" />
              </>
            ) : (
              <View style={styles.centeredScreen}>
                <Text style={styles.screenText}>
                  You have no history here... for now
                </Text>
              </View>
            )}
            <UndoFollowSnackbar />
          </View>
        </QueryClientProvider>
      </SafeAreaProvider>
    );
  },
);
