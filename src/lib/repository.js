const fs = require("node:fs/promises")

class Repository {
    #dir
    constructor(dir) {
        this.#dir = dir
    }

    async read() {
        let data = await fs.readFile(this.#dir, {encoding : "utf8"})

        if(data){
            data = JSON.parse(data)
        } else {
            data = []
        }

        return data
    }



    async write(data) {
        await fs.writeFile(this.#dir, JSON.stringify(data, null, 4), {encoding:"utf8"})
    }


    async writeAdd(dto){
        const data = await this.read()
        data.push(dto)
        await this.write(data)
    }
}

module.exports = Repository