export default class UserService {
    
    loginUser(user) {
        console.log ("In Login User Service call");
        let promise = fetch ('http://localhost:6060/api/user/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify (user)
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
            body: JSON.stringify (user)
        });
        return promise;
    }

    registerPersonalInfo(personalInfo) {
        console.log ("In register personal info Service call" + JSON.stringify(personalInfo));
        let promise = fetch ('http://localhost:6060/api/personalInfo/registration', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(personalInfo)
        });
        return promise;
    }

    // getData () {
    //     let promise = fetch ("http://localhost:4070/api/products");
    //     return promise;
    // }
    
}