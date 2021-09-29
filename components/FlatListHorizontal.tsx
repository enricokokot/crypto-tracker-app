import {observer} from 'mobx-react-lite';
import {Instance} from 'mobx-state-tree';
import React from 'react';
import {Animated} from 'react-native';
import {CurrencyModel} from '../Store';
import {CoinDisplay} from './CoinDisplay';

export const FlatListHorizontal = observer(
  ({data}: {data: Instance<typeof CurrencyModel>[]}) => {
    const scrollX = React.useRef(new Animated.Value(0)).current;
    return (
      <Animated.FlatList
        style={{paddingVertical: 10}}
        data={data}
        // isko je string pa son number pretvori va string, is this okay?
        keyExtractor={(coin, id) => id.toString()}
        horizontal
        snapToInterval={320}
        decelerationRate={0}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: true,
          },
        )}
        renderItem={({item, index}) => {
          return <CoinDisplay item={item} index={index} />;
        }}
      />
    );
  },
);
