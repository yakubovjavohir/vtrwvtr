const express = require("express")
const cors = require("cors")
const RegistorEntity = require("./lib/registorEntity")
const  Repository  = require("./lib/repository")
const path = require("node:path")
const CarEntity = require("./lib/carEntity")


const server = express()

const registorPath = path.resolve("database", "registor.json")
const registorRepo = new Repository(registorPath)
const carPath = path.resolve("database", "car.json")
const carRepo = new Repository(carPath)

server.use(cors())
server.use(express.json())
server.set('view engine', 'ejs')
server.set("views", path.resolve("src/views"));
server.use(express.static('public'))
server.use(express.urlencoded({ extended: true }))




server.get("/home", async (req, res)=>{
    const readFile = await carRepo.read()
    res.render("home.ejs", {message : readFile})
})


server.get("/login", (req, res)=>{
    res.render("login.ejs")
})

server.post("/login", async (req, res)=>{
    const {login_username, login_password} = req.body
    const readFile = await registorRepo.read()
    const findUser = readFile.find((el)=>{
        return el.username === login_username
    })

    if (findUser) {
        res.render("home.ejs")
    }
})

server.get("/registor", (req, res)=>{
    res.render("registor.ejs")
})

server.post("/registor", async (req, res)=>{
    const {email, username, password, comfirm_password} = req.body    
        if (password == comfirm_password) {
            const registor_entity = new RegistorEntity(email, username, password, comfirm_password)
            await registorRepo.writeAdd(registor_entity)
            res.render("home.ejs")   
        }
})

server.get("/car-create", (req, res)=>{
    res.render("car-folder/car-create.ejs", {message : null})
})

server.post("/car-create", async (req, res)=>{
    const {car_name, car_year, car_price} = req.body
    const car_entity = new CarEntity(car_name, car_year, car_price)
    await carRepo.writeAdd(car_entity)
    res.render("car-folder/car-create.ejs", {message : car_entity})
})



server.get("/car-delete", (req, res)=>{
    res.render("car-folder/car-delete.ejs", {message : null})
})
// delete metodi ishlamadi shunga post ni qoydim
server.post("/car-delete-name", async (req, res)=>{  
    const {car_name_delete} = req.body
    const readFile = await carRepo.read()
    const findCar = readFile.findIndex((el)=>{
        return el.name === car_name_delete
    })

    if (!(findCar === -1)) {        
        await readFile.splice(findCar, 1)                
        await carRepo.write(readFile)
        res.render("car-folder/car-delete.ejs", {message : findCar, car_name : car_name_delete})
    }
})


server.get("/car-change", (req, res)=>{
    res.render("car-folder/car-change.ejs", {message : null})
})


server.post("/car-change-price", async (req, res)=>{
    const {car_name_change, car_price_change} = req.body
    const readFile = await carRepo.read()
    const findCar = readFile.findIndex((el)=>{
        return el.name === car_name_change
    })


    if (!(findCar === -1)) {
        readFile[findCar].price = car_price_change
        await carRepo.write(readFile)
        const change = readFile[findCar]
        console.log(change);
        
        res.render("car-folder/car-change.ejs", {message : change})
    }
})
server.listen(7777, ()=>{
    console.log("http://localhost:" + 7777 + "/home");
})