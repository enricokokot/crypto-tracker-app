import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationProp} from '@react-navigation/core';
import {NavigationContainer} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ListPageWithFilter} from './screens/ListPageWithFilter';
import {HomePage} from './screens/HomePage';
import {FollowedPage} from './screens/FollowedPage';
import {styles} from './style/styles';
import {HistoryPage} from './screens/HistoryPage';
import {ImagePage} from './unused/ImagePage';
import {ImageScreen} from './unused/CameraPage';

const queryClient = new QueryClient();
const Tab = createBottomTabNavigator();

const ComponentTop = observer(
  ({navigation}: {navigation: NavigationProp<any>}) => {
    return (
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <SafeAreaView style={styles.centeredScreen}>
            <ListPageWithFilter navigation={navigation} />
          </SafeAreaView>
        </QueryClientProvider>
      </SafeAreaProvider>
    );
  },
);

export const App = () => {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen
              name="Home"
              component={HomePage}
              options={{
                tabBarLabel: 'Home',
                tabBarIcon: () => <Icon name="home" />,
              }}
            />
            <Tab.Screen
              name="Coins"
              component={ComponentTop}
              options={{
                tabBarLabel: 'Coins',
                tabBarIcon: () => <Icon name="list" />,
              }}
            />
            <Tab.Screen
              name="History"
              component={HistoryPage}
              options={{
                tabBarLabel: 'History',
                tabBarIcon: () => <Icon name="history" />,
              }}
            />
            <Tab.Screen
              name="Followed"
              component={FollowedPage}
              options={{
                tabBarLabel: 'Followed',
                tabBarIcon: () => <Icon name="star" />,
              }}
            />
            {/* <Tab.Screen
              name="Image"
              component={ImagePage}
              options={{
                tabBarLabel: 'Image',
                tabBarIcon: () => <Icon name="photo" />,
              }}
            /> */}
            {/* <Tab.Screen
              name="Camera"
              component={ImageScreen}
              options={{
                tabBarLabel: 'Camera',
                tabBarIcon: () => <Icon name="camera" />,
              }}
            /> */}
          </Tab.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};
