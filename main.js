const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const { runc, runcpp } = require('./codeRunner')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('trust proxy', true)


app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}))



app.post('/runc', async (req, res) => {
    try {
        let code = req.body.code;
        fs.writeFileSync('c_program.c', code);
        const result = await runc('c_program');
        res.send(result);
    } catch (error) {
        res.send(error.stderr);
    }
})

app.post('/runcpp', async (req, res) => {
    try {
        let code = req.body.code;
        fs.writeFileSync('cpp_program.cpp', code);
        const result = await runcpp('cpp_program');
        res.send(result);
    } catch (error) {
        res.send(error.stderr);
    }
})


app.get('/', (req, res) => {
    console.log("New User => ", req.ip);
    res.send('Hi, You Are Welcome..... =>  ' + req.ip);
})

app.listen(3000);
