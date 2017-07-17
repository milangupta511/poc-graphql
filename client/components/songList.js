import React, {Component} from 'react';
import gql from 'graphql-tag'; //helper to allow us to write query inside a component
import {graphql} from 'react-apollo';
import {Link} from 'react-router';
import query from '../queries/fetchSongs'; //returns the data fetched into the props


class SongList extends Component {
	onSongDelete(id){
		this.props.mutate({variables: {id}})
			.then(()=>this.props.data.refetch()) //refetch will fetch the query which will be associated with the current component. This wont work in different component.
	}
	renderSongs(){
		return this.props.data.songs.map((song) => (
				<li className="collection-item" key={song.id}>
					<Link to={`song/${song.id}`}>{song.title}</Link>
					<i className="material-icons right" onClick={()=>this.onSongDelete(song.id)}>
					delete</i>
				</li>))
	}
	render(){
		return (
			<div>
				<ul className="collection">
						{this.props.data.loading?"Loading...":this.renderSongs()}
				</ul>
				<Link to="song/new" className="btn-floating btn-large red right">
					<i className="material-icons">add</i>
				</Link>
			</div>
			)
	}
}
const mutation = gql`
	mutation DeleteSong($id: ID) {
		deleteSong(id: $id) {
			id
		}
	}
`;
export default graphql(mutation)(
	graphql(query)(SongList)
); //connects query with component
//graphql helper creates a data object on props