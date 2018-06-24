import axios from 'axios';
import update from 'immutability-helper';
import {NEW_SERVER_URL} from 'store/static'
let ENDPOINT_TO_GET_SIGNED_URL = `${NEW_SERVER_URL}/activity/upload/sign-s3`;
import {generateRandomId} from 'services/generateRandomId'
// ------------------------------------
// Constants
// ------------------------------------
export const NAME = 'app_services';

export const SET_PROGRESS = "SET_PROGRESS"+ ' ' + NAME
export const REMOVE_PROGRESS_ELEMENT = "REMOVE_PROGRESS_ELEMENT"+ ' ' + NAME

// PURE ACTIONS
export const setProgress = (value)=>{
  return { type: SET_PROGRESS, payload: value}
}

export const removeProgressElement = (value)=>{
  return { type: REMOVE_PROGRESS_ELEMENT, payload: value}
}

// THUNKS

export const uploadFile = (file, contentType) =>{
  return (dispatch, getState) => {
    const fileUploadId = generateRandomId();
    const prom = new Promise((resolve, reject) => {
      let returnUrl = null;
      console.log(contentType);
      axios.get(ENDPOINT_TO_GET_SIGNED_URL, {
        params:{
          'file-name': file.name,
          'file-type': file.type,
          'content-type': contentType
        }})
        .then(function (result) {
          // console.log(result);
          returnUrl = result.data.url;
          var signedUrl = result.data.signedRequest;
          var options = {
            onUploadProgress: e => {
              let progressObject = {
                id:fileUploadId,
                progess: (e.loaded/e.total * 100.0).toFixed(0)
              }
              dispatch(setProgress(progressObject));
            },
            headers: {'Content-Type': file.type}
          };
          return axios.put(signedUrl, file, options);
        })
        .then(function (result) {
          resolve(returnUrl);
        })
        .catch(function (err) {
          reject(err);
        });

      });

      return {uploadId:fileUploadId,promise: prom }
  }
}

export const uploadFileS3 = (file, id) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      let returnUrl = null;
      axios.get(ENDPOINT_TO_GET_SIGNED_URL, {
        params:{
          'file-name': file.name,
          'file-type': file.type,
          'content-type': 'activity/reference_imgs'
        }})
        .then(function (result) {
          // console.log(result);
          returnUrl = result.data.url;
          var signedUrl = result.data.signedRequest;
          var options = {
            onUploadProgress: e => {
              let progressObject = {
                id,
                progess: (e.loaded/e.total * 100.0).toFixed(0)
              }
              dispatch(setProgress(progressObject));
            },
            headers: {'Content-Type': file.type}
          };
          return axios.put(signedUrl, file, options);
        })
        .then(function (result) {
          resolve(returnUrl);
        })
        .catch(function (err) {
          reject(err);
        });

      });
  }
}
// ------------------------------------
// Reducer Handlers
// ------------------------------------
const REDUCER_HANDLERS = {
  [SET_PROGRESS]: (state,action) => {
    const id = action.payload.id;
    const progess = action.payload.progess;
    let newState =  update(state, {progressOfUploads: {[id]: {$set: progess}}});
    return newState;
  },
  [REMOVE_PROGRESS_ELEMENT]: (state,action) => {
    const id = action.payload.id;
    let newState =  update(state, {progressOfUploads: {[id]: {$set: progess}}});
    return newState;
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  progressOfUploads: {
    //id: progress
  }
}

export default function myReducer (state = initialState, action) {
  const handler = REDUCER_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
