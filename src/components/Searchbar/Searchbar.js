import PropTypes from 'prop-types';
import React from 'react';
import classes from './Searchbar.scss';
import SearchSvg from 'components/SvgImages/SearchSvg'
import CancelSvg from 'components/SvgImages/CancelSvg';
import classNames from 'classnames';

class Searchbar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      inputTextState: false
    }

  }

  componentWillMount() {
    if(!!this.props.searchTerm){
      this.setState({inputTextState:true});
    }
  }

  searchUpdate = (e) => {
    this.props.changeSearchTerm(e.target.value);
  }

  toggleInputTextState = (e) => {
    if (this.props.searchTerm ) {
      this.setState({inputTextState: true})
      this.refs.searchInput.focus();
      e.stopPropagation();
    }
    else {
      this.setState({inputTextState: !this.state.inputTextState})
      this.refs.searchInput.focus();
      e.stopPropagation();
    }

    if(this.props.onSearchBarClick){
        this.props.onSearchBarClick();
    }
  }

  onClickInput = (e) => {
    e.stopPropagation();
    if(this.props.onSearchBarClick){
      this.props.onSearchBarClick();
    }
  };


  cancelText = () => {
    this.props.changeSearchTerm('');
  }

  closeSearchInput =()=>{
    if (!this.refs.searchInput.value && this.refs.searchInput) {
      this.setState({inputTextState: false})
    }
  }


  render () {
        let deleteSvgClass = !!this.props.searchTerm ? classes.crossSvg : classes.crossSvgHidden
        let searchInputClass = this.state.inputTextState ? classes.searchInputActive : classes.searchInput
         let searchSvg = classNames({[classes.searchSvg]:true},{[classes.searchSvgActive]:this.state.inputTextState})

    return(
        <div className={classes.container} >
          <div className={searchInputClass}>
            <div className={searchSvg} onClick={(event)=>this.toggleInputTextState(event)}><SearchSvg /></div>
            <input ref="searchInput" className={classes.inputText} type="text" placeholder={this.props.placeholder} value={this.props.searchTerm} onChange={(e) => this.searchUpdate(e)} name="text" onClick={(e) => this.onClickInput(e)}/>
            <div className={deleteSvgClass} onClick={() => {this.cancelText()}} ><CancelSvg/></div>
          </div>
        </div>
    )
  }
}

Searchbar.propTypes = {
  searchTerm:PropTypes.string,
  changeSearchTerm:PropTypes.func,
  placeholder:PropTypes.string,
  onSearchBarClick:PropTypes.func
};

export default Searchbar
