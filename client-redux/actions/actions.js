// 1. This file contains action types and action creaters
// action_type is exportable constant and must be defines in caps

// represent the action to add new user
export const ADD_USER = "ADD_USER";

// The action creater method
export function addUser(user) {
    console.log(`in action ACTION.js file ${JSON.stringify(user)}`);    
    return {
        type: ADD_USER,
        user
    }    
}