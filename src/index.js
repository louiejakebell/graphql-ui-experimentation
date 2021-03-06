import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';

import App from './App';
import * as serviceWorker from './serviceWorker';

const client = new ApolloClient({
    uri: 'http://localhost:4000/'
});

ReactDOM.render(<App client={client} />, document.getElementById('root'));

serviceWorker.unregister();
