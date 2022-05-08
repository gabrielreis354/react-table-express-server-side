
const express = require('express');
const app = express();
const mysql= require('mysql');
const cors = require('cors');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "react-table-example",
});

app.use(cors());
app.use(express.json());

app.post("/registrar", (req, res) => {
    const {marca} = req.body;
    const {modelo} = req.body;
    const {ano} = req.body;

    let sql = "INSERT INTO carros (Marca, Modelo, Ano) VALUES (?,?,?)";

    db.query(sql, [marca, modelo, ano],(err, result) => {
        if(result){
            console.log('success');
        }
        console.log(err)
    })
});

app.get("/getCards", (req, res) => {
    let sql = "SELECT * FROM carros";

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result);
        }
    })
})

app.get("/getCarById", (req, res) => {

    const {Id} = req.body;

    console.log(Id)

    let sql = "select * from carros where Id = " + Id + ";";

    db.query(sql, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    })
})


app.listen(3001, () => {
    console.log("Rodando servidor")
});
