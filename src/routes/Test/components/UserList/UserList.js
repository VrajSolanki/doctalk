import PropTypes from 'prop-types';
import React from 'react';
import classes from './UserList.scss'
import UserListItem from './UserListItem'

class UserList extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      showDialogueBox: false,
      studentId:'',
      dialogueBoxScreen:null
    }
  }


  headerElements = () => {
    return(
      <div className={classes.listHeader}>
          <div className={classes.emptyCell} />
          <div className={classes.nameCell}>{`USER`}</div>
          <div className={classes.scoreCell}>{`SCORE`}</div>
          <div className={classes.userInfoCell}>{`USER INFO`}</div>
          <div className={classes.profileCell}>{`PROFILE URL`}</div>
          <div className ={classes.emptyCell}/>
      </div>
    )
  };

  render(){
  const {userFeed} = this.props;
  let rowComponent = userFeed.map((obj,key)=><UserListItem listItem={obj} key={obj.id} index={key}/>)
    
    return(
        <div className={classes.container} ref="containerDiv" >
          <div className={classes.containerList}>
              {this.headerElements()}
              {rowComponent}
              {
                userFeed.length==0?
                <div className={classes.noUserContainer}>
                  {`There is no items associated with the selected filters. Please, try selecting other filters.`}
                </div>:null
              }
          </div>
        </div>
    )
  }
}

export default UserList;
