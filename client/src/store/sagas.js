import {all, call, fork, put, take,} from 'redux-saga/effects';
import axios from 'axios'
import {commonActions} from './common/actions';

//=====================================
//  REQUEST ON SERVER
//-------------------------------------

function request({method, url, data}){
  return axios({
    method,
    url,
    data
  });  
}

function* sendRequest(data){
  try{
      const res = yield call(request, data);       //Creates an Effect description that instructs the middleware to call the function 'call'  
      yield put(data.sucess(res.data)); // Creates an Effect description that instructs the middleware to dispatch 'data.sucess' action to the Store
  }
  catch(error){
      yield put(data.error(error.response)); // Creates an Effect description that instructs the middleware to dispatch 'data.error' action to the Store
  }
}

//=====================================
//  WATCHERS
//-------------------------------------


function* watchSendRequest(){
  while(true){
      const {payload} = yield take(commonActions.REQUEST); // Creates an Effect description that instructs the middleware to wait for 'commonActions.REQUEST' action on the Store
      yield fork(sendRequest, {...payload});        // Creates an Effect description to perform a non-blocking call on sendRequest
  }
}
//=====================================
//  INIT SAGAS
//-------------------------------------

export const http = [
  fork(watchSendRequest),    // Creates an Effect description to perform a non-blocking call on watchSendRequest
];

//=====================================
//  COMBINE SAGAS
//-------------------------------------
export default function* sagas() {  
  yield all([  // Creates an Effect description that instructs the middleware to run multiple Effects in parallel
    ...http
  ]);
}