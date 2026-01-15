export default function getToastDetails(action) {

    if (action.type.includes("REJECTED")) {
        return { error: true, message: action.payload.message };
    }
    switch (action.type) {
        default:
            return null;
    }

}