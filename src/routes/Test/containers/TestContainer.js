import { connect } from 'react-redux';
import Test from '../components/Test';
import {getUsersBasedonFollowers, updateSearchTerm, updateSearchTermAndFetch} from './TestModule';

const mapActionCreators = {
  getUsersBasedonFollowers,
  updateSearchTerm,
  updateSearchTermAndFetch
};

const mapStateToProps = (state) => {
  return({
    searchTerm: state.test.searchText,
    userFeed: state.test.userFeed,
    isLoading: state.test.isLoading
  })
};

export default connect(mapStateToProps, mapActionCreators)(Test)
