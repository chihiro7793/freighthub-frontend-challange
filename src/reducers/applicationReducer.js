const initialState = [];

const reducer = (state = initialState, { type, payload }) => {
    if (type === 'CONVERSATIONS_REQUESTED') {
        let coppiedState = [...state];
        coppiedState = payload;
        return coppiedState;
    } else if (type === 'EDITE_DATA') {
        let coppiedState = [...state];
        const index = coppiedState.findIndex(shipment => shipment.id === payload.id);
        if (index !== -1) {
            coppiedState[index].name = payload.newName;
        }
        return coppiedState;
    } else {
        return state;

    }
}

export default reducer;