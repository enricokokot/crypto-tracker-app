import {observer} from 'mobx-react-lite';
import React from 'react';
import {TextInput, View} from 'react-native';
import {Button} from 'react-native-paper';
import {store} from '../Store';
import {styles} from '../style/styles';

export const SearchBox = observer(() => {
  return (
    <View>
      <TextInput
        style={[
          styles.centeredScreen,
          {
            // paddingVertical: 10,
            borderColor: 'transparent',
            borderWidth: 10,
            textAlign: 'center',
            // width: '100%',
          },
        ]}
        placeholder="Type here"
        onChangeText={input => store.onChangeText(input)}
        value={store.filterBar}
        onSubmitEditing={() => console.log('searching...')}
      />
      <Button onPress={() => store.resetTextInput()} style={{width: '100%'}}>
        Reset Text Input
      </Button>
    </View>
  );
});
