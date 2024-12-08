function generateID() {
    const randomId = Math.trunc(Math.random() * 1000000)

    return randomId
}

module.exports = {generateID}