const {generateID} = require("./idGenerator")

class RegistorEntity {
    constructor(email, username, password, comfirm_password){
        this.id = generateID()
        this.email = email
        this.username = username
        this.password = password
        this.comfirm_password = comfirm_password
    }
}

module.exports = RegistorEntity