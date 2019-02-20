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
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        return promise;
    }

    getUsers() {
        console.log ("In create User Service call");
        let promise = fetch ('http://localhost:6060/api/users', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }           
        });
        return promise;
    }
}