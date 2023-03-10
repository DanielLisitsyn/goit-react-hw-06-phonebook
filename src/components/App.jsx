import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Phonebook from './Phonebook/Phonebook';
import { store, persistor } from '../redux/store';

export const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div>
          <Phonebook />
        </div>
      </PersistGate>
    </Provider>
  );
};
