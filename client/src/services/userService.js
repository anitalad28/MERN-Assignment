export default class UserService {
    
    loginUser(user) {
        console.log ("In Login User Service call");
        let promise = fetch ('http://localhost:6060/api/user/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        return promise;
    }

    createUser(user) {
        console.log ("In create User Service call");
        let promise = fetch ('http://localhost:6060/api/user/create', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : sessionStorage.getItem("token")
            },
            body: JSON.stringify(user)
        });
        return promise;
    } 

    getUserDetails(loggedInUserId) {
        console.log ("In register personal info Service call" + JSON.stringify(loggedInUserId));
        let promise = fetch ('http://localhost:6060/api/userDetails/' + loggedInUserId , {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : sessionStorage.getItem("token")
            }
        });
        return promise;
    }  
}