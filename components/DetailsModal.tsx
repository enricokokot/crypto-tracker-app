import {observer} from 'mobx-react-lite';
import React from 'react';
import {Alert, Modal, Pressable, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {Button} from 'react-native-paper';
import {store} from '../Store';
import {styles} from '../style/styles';

export const DetailsModal = observer(() => {
  return (
    <Modal
      // style dodan s ciljem da clickableBackground zauzme 100% screen-a
      style={{flex: 1, zIndex: 100}}
      animationType="fade"
      transparent={true}
      visible={store.modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        store.toggleModal();
      }}>
      <View style={styles.centeredView}>
        <Pressable
          style={styles.clickableBackground}
          onPress={() => store.toggleModal()}>
          <View style={styles.modalView}>
            {Boolean(store.selectedCurrency) ? (
              <View style={styles.modalText}>
                {/* Currency Icon */}
                <Icon name="attach-money" size={50} />
                {/* Currency Name */}
                <Text style={styles.modalTextTitle}>
                  {store.selectedCurrency?.Name}
                </Text>
                {/* Price */}
                <Text style={{fontWeight: 'bold'}}>Price:</Text>
                <Text style={styles.modalText}>
                  {store.selectedCurrency?.Price}
                </Text>
                {/* Volume */}
                <Text style={{fontWeight: 'bold'}}>Volume in last 24 h:</Text>
                <Text style={styles.modalText}>
                  {store.selectedCurrency?.Volume_24h}
                </Text>
                {/* Timestamp */}
                <Text style={{fontWeight: 'bold'}}>Timestamp:</Text>
                <Text style={styles.modalText}>
                  {store.selectedCurrency?.Timestamp}
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Button
                    mode="outlined"
                    color="#008844"
                    onPress={() => {
                      if (store.selectedCurrency?.Followed == false)
                        store.addFollowedCurrency(
                          store.selectedCurrency?.Label,
                        );
                      else
                        store.removeFollowedCurrency(
                          store.selectedCurrency?.Label,
                        );
                    }}>
                    <Text>
                      {store.selectedCurrency?.Followed ? 'UNFOLLOW' : 'FOLLOW'}
                    </Text>
                  </Button>
                </View>
              </View>
            ) : (
              // this is never seen, if I understood correctly
              <Text>Nothing</Text>
            )}
          </View>
        </Pressable>
      </View>
    </Modal>
  );
});
