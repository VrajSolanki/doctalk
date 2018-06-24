import React, { Component } from 'react'
import classes from './Test.scss'
import _ from 'lodash'
import Searchbar from 'components/Searchbar'
import UserList from './UserList'


export default class Test extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchText: ""
    };

    this.onUpdateSearchText = _.debounce(
      this.onUpdateSearchTextOnDebounce,
      200
    );
  }

  changeSearchTerm = params => {
    this.setState({ searchText: params });
    this.onUpdateSearchText();
  };

  onUpdateSearchTextOnDebounce = () => {
    this.props.updateSearchTermAndFetch(this.state.searchText);
  };

  componentWillMount = () => {
    this.props.getUsersBasedonFollowers();
  }

  render() {

    const {searchTerm, userFeed, updateSearchTermAndFetch} = this.props;

    return (
      <div className={classes.container}>
        <div className={classes.searchbar}>
          <Searchbar 
            placeholder={`Search for github users`} 
            searchTerm={this.state.searchText}
            changeSearchTerm={this.changeSearchTerm}/>
        </div>
        <UserList userFeed={userFeed} />
      </div>
    )
  }
}
