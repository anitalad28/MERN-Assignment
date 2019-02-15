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
}