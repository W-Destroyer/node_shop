import { SHOWMODAL, HIDEMODAL, ADDFRIENDLINK, EDITFRIENDLINK, BASEINFO } from '../actions/baseinfo';

const initialState = {
    companyName: '江西艾麦达科技有限公司',
    authorName: 'Piny',

    friendLink: {
        list: [{
            key: '0',
            name: {
                value: '淘宝',
            },
            address: {
                value: 'https://www.taobao.com',
            },
        }, {
            key: '1',
            name: {
                value: '天猫',
            },
            address: {
                value: 'https://www.tmall.com',
            },
        }],
        showModal: false,
        changeId: -1,
    }
}


export default function (state = initialState, action) {
    // var newState = JSON.parse(JSON.stringify(state))
    switch(action.type) {
        case SHOWMODAL:
            var newState = Object.assign({}, state)
            newState.friendLink.showModal = action.showModal;
            newState.friendLink.changeId = action.changeId;
            return newState;
        case HIDEMODAL:
            var newState = Object.assign({}, state)
            newState.friendLink.showModal = action.showModal;
            return newState;
        case ADDFRIENDLINK:
            var newState = Object.assign({}, state)
            newState.friendLink.showModal = action.showModal;
            newState.friendLink.list.push(action.data);
            return newState;
        case EDITFRIENDLINK:
            var newState = Object.assign({}, state)
            newState.friendLink.showModal = action.showModal;
            newState.friendLink.list[action.changeId] = action.data;
            return newState;
        default:
            return state;
    }
}