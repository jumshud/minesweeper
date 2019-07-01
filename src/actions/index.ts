export function success(payload: any, actionType: string) {
    return {
        type: actionType,
        payload: payload
    };
}