export const BASEINFO = 'BASEINFO';
export const SHOWMODAL = 'SHOWMODAL';
export const HIDEMODAL = 'HIDEMODAL';

export const ADDFRIENDLINK = 'ADDFRIENDLINK';
export const EDITFRIENDLINK = 'EDITFRIENDLINK';

export function getBaseinfo(data) {

    return {
        type: BASEINFO,
        data
    }
}
var key = 100;

export const addFriendLink = data => {
    key++;
    data.key = key;
    return {
        type: ADDFRIENDLINK,
        changeId: -1,
        data: data
    }
}

export const editFriendLink = data => {
    key++;
    data.key = key;
    return {
        type: EDITFRIENDLINK,
        changeId: -1,
        data: data
    }
}


export function showModal(data) {

    return {
        type: SHOWMODAL,
        showModal: true,
        changeId: data === undefined ? -1 : data
    }
}

export function hideModal(data) {
    return {
        type: HIDEMODAL,
        showModal: false,
        changeId: -1,
    }
}