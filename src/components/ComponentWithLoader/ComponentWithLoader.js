import React, { PropTypes } from 'react'
import classes from './ComponentWithLoader.scss';
import Loading from 'components/Loading';
import classNames from 'classnames';
import { connect } from 'react-redux'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import LoadingBar from 'react-redux-loading-bar'


function withLoader(WrappedComponent){
    class comp extends React.Component {

        constructor(props){
            super(props);
        }

        componentWillReceiveProps = (nextProps) => {
            if(nextProps.isLoading!=this.props.isLoading){
                if(nextProps.isData) {
                    if (nextProps.isLoading) {
                        nextProps.showLoading();
                        //console.log("Show Loading")
                    }
                    else {
                        nextProps.hideLoading();
                        //console.log("Hide loading");
                    }
                }
            }
        };

        componentDidMount = () => {
            if(this.props.customRef){
                this.props.customRef(this.refs.wrappedComponent);
            }
            if(this.props.isData) {
                if (this.props.isLoading) {
                    this.props.showLoading();
                }
                else {
                    this.props.hideLoading();
                }
            }
        };

        getLoader = () => {
            if(this.props.isLoading && !this.props.isData){

                return <Loading/>

            }
            else{
                return null
            }
        };



        render(){
            let container = classNames({[classes.container]:true},{[classes.noScrollContainer]:this.props.isLoading});
            let loader = this.getLoader();
            return(
                <div className={container} >
                    <WrappedComponent {...this.props} ref="wrappedComponent"/>
                    {loader}
                    <LoadingBar style={{ backgroundColor: '#2387FB ', height: '4px', position:'fixed', top:'0' }} />
                    {/*{this.props.isLoading?<div className={classes.loadingContainer}>*/}
                            {/*<Loading/>*/}
                        {/*</div>:null}*/}

                </div>
            )
        }
    }
    const mapActionCreators = {
        showLoading,
        hideLoading
    }

    const mapStateToProps = (state) => {
        return({

        })
    }
    return connect(mapStateToProps, mapActionCreators)(comp)


}

export default withLoader;