import PropTypes from 'prop-types';
import React from 'react';
import classes from './UserListItem.scss'

class UserListItem extends React.Component{

  render() {
   
    const {avatar_url, login, score, url, id, html_url } = this.props.listItem;
    

    return(
      <div className={classes.row}>
           {/* <div className ={classes.emptyCell}/> */}
           <div className ={classes.profileCell}>
              <img src={avatar_url} height={72} width={72}/>
            </div>
          <div className={classes.nameCell}>
             {login}
           </div>
           <div className={classes.scoreCell}>
              {score}
           </div>
           <div className={classes.userInfoCell}>
             {url}
           </div>
           <div className={classes.profileItemCell}>
             {html_url}
           </div>
           <div className ={classes.emptyCell}/>
      </div>
    )
  }
}

export default UserListItem;
