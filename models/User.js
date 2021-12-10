const users = []
let temp_id = 0
const userModel = {
    getAllUser: () => {
        return users;
    },
    registerUser: (phoneNumber, password, gender, userName, age) => {
        temp_id += 1
        for(var i=0;i<users.length;i++){
            var user = users[i];
            if(user.phoneNumber.localeCompare(phoneNumber)===0){
                return {
                    'status': "0010",
                    'statusText': "phoneNumber already be used",
                }
            }
        }
        users.push({
            "id": temp_id,
            "phoneNumber": phoneNumber,
            "password": password,
            "gender": gender,
            "name": userName,
            "age": age
        })
        return {
            'status': "0000",
            'statusText': "registerUser succeed",
        };
    },
    loginUser: async (phoneNumber, password) => {
        for(var i=0; i<users.length; i++){
            var ele = users[i];
            if(ele.phoneNumber.localeCompare(phoneNumber)===0){
                if(ele.password.localeCompare(password)===0){
                    return {
                        status: "0000",
                        statusText: "loginUser succeed",
                    }
                }
                return {
                    status: "0020",
                    statusText: "loginUser failed",
                }
            }
        }
        return {
            status: "0020",
            statusText: "loginUser failed",
        }
    }
}

module.exports = userModel;