import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import ApolloClient from 'apollo-client' //Framework agnostic, It doesn't care what framework we are using on front end. interacts with graphql server with backend. stores data locally when response comes back
import {ApolloProvider} from 'react-apollo' //glue between react and graphql server

import App from './components/app';
import SongList from './components/songList'
import SongCreate from './components/songCreate'
import SongDetail from './components/songDetail'

const client = new ApolloClient({
	dataIdFromObject: obj => obj.id //Apollo needs to know that we want to identify a song using the id
}); //assumes /graphql
const Root = () => {
	return(
		<ApolloProvider client={client}>
			<Router history={hashHistory}>
				<Route path="/" component={App}>
					<IndexRoute component={SongList} />
					<Route path="song/new" component={SongCreate} />
					<Route path="song/:id" component={SongDetail} />
				</Route>
			</Router>
		</ApolloProvider>
		)
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
