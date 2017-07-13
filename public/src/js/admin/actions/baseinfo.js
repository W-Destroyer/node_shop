import * as ActionTypes from '../constants/actiontypes';

export function getBaseinfo(data) {

    return {
        type: ActionTypes.BASEINFO,
        data
    }
}
var key = 100;

export const addFriendLink = data => dispatch => {
    dispatch(asyncAddFriendLink(data));
    return fetch('/api/admin/')
        .then(response => response.json())
        .then(json => {
            dispatch(asyncAddFriendLink(json));
        }).catch(err => {
            dispatch(asyncAddFriendLink(err));
        })
}

export const asyncAddFriendLink = data => {
    key++;
    data.key = key;
    return {
        type: ActionTypes.ADDFRIENDLINK,
        changeId: -1,
        showModal: false,
        data: data
    }
}

export const editFriendLink = (index, data) => {
    key++;
    data.key = key;
    return {
        type: ActionTypes.EDITFRIENDLINK,
        changeId: index,
        showModal: false,
        data: data
    }
}


export function showModal(data) {

    return {
        type: ActionTypes.SHOWMODAL,
        showModal: true,
        changeId: data === undefined ? -1 : data
    }
}

export function hideModal(data) {
    return {
        type: ActionTypes.HIDEMODAL,
        showModal: false,
        changeId: -1,
    }
}