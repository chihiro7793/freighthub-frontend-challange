const apiUrl = 'http://localhost:3000/shipments';

export const fetchInitialdata = () => {
    return (dispatch) => {
        fetch(apiUrl)
            .then(res => (
                res.json()
            )).then(data => {
                dispatch({ type: 'CONVERSATIONS_REQUESTED', payload: data })

            })
            .catch(err => {
                console.error(err);
            });
    }
}

export const editeData = (id, newName) => {
    return ({
        type: 'EDITE_DATA',
        payload: { id, newName }
    });
}