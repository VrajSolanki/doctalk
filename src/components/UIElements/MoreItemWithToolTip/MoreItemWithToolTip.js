import React, { Component } from 'react'
import classes from './MoreItemWithToolTip.scss'
import PropTypes from 'prop-types';
import {LinkWithTooltip} from 'components/UIElements';


class MoreItemWithToolTip extends React.Component
{
    getRenderComponent(){
        const {items, length, noItemText} = this.props;
        let component;
        let valueString = "";
        let moreComponent=null;
        let allItemArray = [...items];
        let itemArray = allItemArray.slice(0,length);
        
        itemArray.map((item, i)=>{
            valueString += item;
            valueString += i < itemArray.length-1 ? ", ":" ";
        });
    
        if(itemArray.length == 0)
        {
            valueString = noItemText?noItemText:`-`;
        }
        
        if(items.length>length){
          let moreItemArray = allItemArray.slice(length,items.length);
          moreComponent =  moreItemArray.map((item, i)=>
            <div className = {classes.moreToolTipItem} key={i}>{item}<br/></div>
          );
        }

        component = <div className={classes.container}>
              <div className={classes.content}>{valueString} </div>
              {items.length>length?<LinkWithTooltip tooltip={moreComponent} placement={'right'} href="#" id="tooltip-dueDate" dataHtml={true} placement='right'>
                  <div className={classes.moreText}>&nbsp;{`+${items.length-length} More`}</div>                                       
                </LinkWithTooltip>:null}
              </div>;
    
        return component;
      }

      render (){
          return (
            <div className={classes.container}>
            {this.getRenderComponent()}
            </div>
          )
      }
}

MoreItemWithToolTip.propTypes={
    items:PropTypes.array,
    length:PropTypes.number,
    noItemText:PropTypes.string,
   
  };
  
  MoreItemWithToolTip.defaultProps = {
    items: [],
    length:2,
    noItemText:'',
  };

  export default MoreItemWithToolTip;