const app = require('express')();
const bodyParser = require('body-parser');
const fs = require('fs');
const run = require('./codeRunner');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('trust proxy', true)

app.post('/runc', async (req, res) => {
    try {
        let code = req.body.code;
        fs.writeFileSync('program.c', code);
        const result = await run('program');
        res.send(result);
    } catch (error) {
        res.send(error);
    }
})

app.get('/', (req, res) => {
    console.log("SomeOne Intered Here => ", req.ip);
    res.send('hii =>  '+req.ip);
})

app.listen(3000);