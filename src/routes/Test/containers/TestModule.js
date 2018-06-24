import request from 'superagent';
import {SERVER_URL} from 'store/static'
import update from 'immutability-helper';

// ------------------------------------
// Constants
// ------------------------------------
export const NAME = 'test';

export const UPDATE_SEARCH_TERM = 'UPDATE_SEARCH_TERM' + " " + NAME
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS' + " " + NAME
export const UPDATE_ISLOADING = 'UPDATE_ISLOADING' + " " + NAME

//PURE ACTIONS

export const updateIsLoading = data => {
  return { type: UPDATE_ISLOADING, payload: data };
};


export const updateSearchTerm = data => {
  return { type: UPDATE_SEARCH_TERM, payload: data };
};

export const fetchUserSuccess = data => {
  return { type: FETCH_USER_SUCCESS, payload: data };
};

//THUNKS

export const updateSearchTermAndFetch = (data) => {
  return (dispatch, getState) => {
    dispatch(updateSearchTerm(data));
    dispatch(getUsersBasedonFollowers());
  }
};

export const getUsersBasedonFollowers = () => {
  return (dispatch, getState) => {
    return new Promise( resolve => {
      const searchTerm = getState().test.searchTerm;
      if(!!searchTerm){
        dispatch(updateIsLoading(true));
        request
          .get(`${SERVER_URL}?q=${searchTerm}+in%3Afullname&type=Users+followers:%3E0`)
          .end(function(err, res){
            if(!err){
              dispatch(fetchUserSuccess(res.body.items));
              dispatch(updateIsLoading(false));
              resolve();
            }
            else{
              dispatch(updateIsLoading(false));
            }
          });
      }
    })
  }
};

const REDUCER_HANDLERS = {
  [UPDATE_SEARCH_TERM]: (state,action) => {
    return update(state, { searchTerm: { $set: action.payload } });
  },
  [FETCH_USER_SUCCESS]: (state,action) => {
    return update(state, { userFeed: { $set:  action.payload} });
  },
  [UPDATE_ISLOADING]: (state,action) => {
    return update(state, { isLoading: { $set: action.payload } });
  },
};

const initialState = {
  searchTerm: "vraj",
  userFeed: [],
  isLoading: false
};

export default function myReducer (state = initialState, action) {
  const handler = REDUCER_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
