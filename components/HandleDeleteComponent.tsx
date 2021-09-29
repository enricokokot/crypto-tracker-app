import {observer} from 'mobx-react-lite';
import React from 'react';
import {
  Button,
  Dialog,
  FAB,
  Paragraph,
  Portal,
  Provider,
} from 'react-native-paper';
import {store} from '../Store';
import {styles} from '../style/styles';

export const HandleDeleteComponent = observer(({reason}: {reason: string}) => {
  return (
    <>
      <FAB
        style={styles.fab}
        // small
        color="#008844"
        icon="delete"
        onPress={() => {
          store.toggleDialog();
        }}
      />
      <Provider>
        <Portal>
          <Dialog
            visible={store.dialogVisible}
            onDismiss={() => store.toggleDialog()}>
            <Dialog.Title>Attention!</Dialog.Title>
            <Dialog.Content>
              <Paragraph>
                {/* { switch (reason) {
                      case 'DeleteHistory':
                            'Are you sure you want to delete your coin history?'
                          break;
                        case 'DeleteFollow':
                            'Are you sure you want to stop following all coins?'
                            break;
                      default:
                          break;
                  } */}
                Remove all?
              </Paragraph>
            </Dialog.Content>
            <Dialog.Actions style={{padding: 10}}>
              <Button
                color="#008844"
                onPress={() => {
                  switch (reason) {
                    case 'DeleteHistory':
                      store.acceptAndHideDialog('DeleteHistory');
                      break;
                    case 'DeleteFollow':
                      store.acceptAndHideDialog('DeleteFollow');
                      break;
                    default:
                      break;
                  }
                }}>
                Yes
              </Button>
              <Button color="#008844" onPress={store.rejectAndHideDialog}>
                No
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </Provider>
    </>
  );
});
