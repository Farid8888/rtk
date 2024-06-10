import {fetchOne,fetchPosts,formHandler,removePost} from './actions'
import {takeEvery} from 'redux-saga/effects'

export function* mySaga(){
    yield takeEvery('post/getPostsSaga',fetchPosts)
    yield takeEvery('post/getPostSaga',fetchOne)
    yield takeEvery('post/addPostSaga',formHandler)
    yield takeEvery ('post/deletePostSaga',removePost)
}

