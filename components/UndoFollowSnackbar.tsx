import {observer} from 'mobx-react-lite';
import React from 'react';
import {Snackbar} from 'react-native-paper';
import {store} from '../Store';

export const UndoFollowSnackbar = observer(() => {
  return (
    // snackbar jedan nad drugim stvara problem sa undo-om
    <Snackbar
      visible={store.snackbarVisible}
      onDismiss={store.dismissSnackbar}
      action={{
        label: 'Undo',
        onPress: () => {
          store.removeLastFollowedCurrency();
        },
      }}>
      {/* potrebno popravit, store.selectedCurrency je prevolatilan, recimo to tako */}
      {/* You follow {store.selectedCurrency.Name} now. */}
      You follow this currency now.
    </Snackbar>
  );
});
