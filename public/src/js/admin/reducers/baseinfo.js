// import { SHOWMODAL, HIDEMODAL, ADDFRIENDLINK, EDITFRIENDLINK, BASEINFO } from '../actions/baseinfo';
import * as ActionTypes from '../constants/actiontypes';

const initialState = {
    companyName: '江西艾麦达科技有限公司',
    authorName: 'Piny',

    friendLink: {
        list: [{
            key: '0',
            name: '淘宝',
            address: 'https://www.taobao.com',
        }, {
            key: '1',
            name: '天猫',
            address: 'https://www.tmall.com',
        }],
        showModal: false,
        changeId: -1,
    }
}


export default function (state = initialState, action) {
    switch(action.type) {
        case ActionTypes.SHOWMODAL:
            var newState = Object.assign({}, state)
            newState.friendLink.showModal = action.showModal;
            newState.friendLink.changeId = action.changeId;
            return newState;
        case ActionTypes.HIDEMODAL:
            var newState = Object.assign({}, state)
            newState.friendLink.showModal = action.showModal;
            return newState;
        case ActionTypes.ADDFRIENDLINK:
            var newState = Object.assign({}, state)
            newState.friendLink.showModal = action.showModal;
            newState.friendLink.list.push(action.data);
            return newState;
        case ActionTypes.EDITFRIENDLINK:
            var newState = Object.assign({}, state)
            newState.friendLink.showModal = action.showModal;
            newState.friendLink.list[action.changeId] = action.data;
            return newState;
        default:
            return state;
    }
}