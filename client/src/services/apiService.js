export default class apiService {  
    
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

    updateUser(user, UserId){
        console.log ("In update User Service call");
        let promise = fetch ('http://localhost:6060/api/user/update/' + UserId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : sessionStorage.getItem("token")
            },
            body: JSON.stringify(user)
        });
        return promise;
    }
    
    updatePersonalInfoStatus(UserId){
        console.log ("In update User Service call");
        let promise = fetch ('http://localhost:6060/api/user/PerosnalInfoStatus/' + UserId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : sessionStorage.getItem("token")
            }
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

    getPersonalDetails(loggedInUserId) {
        console.log ("In register personal info Service call" + JSON.stringify(loggedInUserId));
        let promise = fetch ('http://localhost:6060/api/personaDetails/' + loggedInUserId , {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : sessionStorage.getItem("token")
            }
        });
        return promise;
    }

    createUserRole(role) {
        console.log ("In Create User Role Service call");
        let promise = fetch ('http://localhost:6060/api/admin/createRole', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : sessionStorage.getItem("token")
            },
            body: JSON.stringify(role)
        });
        return promise;
    }

     approveUser(userId) {
        console.log ("In Create User Role Service call" + + sessionStorage.getItem("token"));
        let promise = fetch('http://localhost:6060/api/user/approve/' + userId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : sessionStorage.getItem("token")
            }
        });
        return promise;
    }

    rejectUser(userId) {
        console.log ("In Create User Role Service call" + sessionStorage.getItem("token"));
        let promise = fetch('http://localhost:6060/api/user/reject/' + userId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : sessionStorage.getItem("token")
            }
        });
        return promise;
    }

    pendingUser(userId) {
        console.log ("In Create User Role Service call" + sessionStorage.getItem("token"));
        let promise = fetch('http://localhost:6060/api/user/pending/' + userId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : sessionStorage.getItem("token")
            }
        });
        return promise;
    }

     getUsers() {
        console.log ("In get user's Service call" + sessionStorage.getItem("token"));
        let promise = fetch ('http://localhost:6060/api/users', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : sessionStorage.getItem("token")
            }           
        });
        return promise;
    }

    getAllPendingUsers() {
        console.log ("In get user's Service call" + sessionStorage.getItem("token"));
        let promise = fetch ('http://localhost:6060/api/pendingusers', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : sessionStorage.getItem("token")
            }           
        });
        return promise;
    }

     getUserRoles() {
        console.log ("In Create User Role Service call");
        let promise = fetch ('http://localhost:6060/api/roles', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : sessionStorage.getItem("token")
            }
        });
        return promise;
    }

    registerPersonalInfo(personalInfo) {
        console.log ("In register personal info Service call" + JSON.stringify(personalInfo));
        let promise = fetch ('http://localhost:6060/api/personalInfo/registration', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : sessionStorage.getItem("token")
            },
            body: JSON.stringify(personalInfo)
        });
        return promise;
    }

    updatePersonalInfo(personalInfo, userId) {
        console.log ("In update personal info Service call" + JSON.stringify(personalInfo));
        let promise = fetch ('http://localhost:6060/api/personalInfo/update/' + userId , {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : sessionStorage.getItem("token")
            },
            body: JSON.stringify(personalInfo)
        });
        return promise;
    }

    getPersons() {
        console.log ("In get persons's Service call" + sessionStorage.getItem("token"));
        let promise = fetch ('http://localhost:6060/api/persons', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : sessionStorage.getItem("token")
            }           
        });
        return promise;
    }

    isUserNameUnique(username) {
        console.log ("In checkUniqueUserName Service call" + JSON.stringify(username));
        let promise = fetch("http://localhost:6060/api/user/checkUserName", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : sessionStorage.getItem("token")
            },
                body: JSON.stringify(username)
            });
        return promise;
  }   
}