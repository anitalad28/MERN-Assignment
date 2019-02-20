export default class UserService {
    
    createUserRole(role) {
        console.log ("In Create User Role Service call");
        let promise = fetch ('http://localhost:6060/api/admin/createRole', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify (role)
        });
        return promise;
    }

    createUser(user) {
        console.log ("In Create User Role Service call");
        let promise = fetch ('http://localhost:6060/api/user/create', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        return promise;
    }

     getRoles(user) {
        console.log ("In Create User Role Service call");
        let promise = fetch ('http://localhost:6060/api/roles', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
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
}