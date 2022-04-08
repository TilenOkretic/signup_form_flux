const express = require('express');
const cors = require('cors');
const xlsx = require('node-xlsx');
const fs = require('fs');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

let objectToArray = obj => {
    let keys = Object.keys(obj);
    let out = [];
    for (let i = 0; i < keys.length; i++) {
        out.push(obj[keys[i]]);
    }
    return out;
};

let keysToArray = obj => Object.keys(obj);

app.post('/', (req, res) => {
    let jData = req.body;
    let data = [];
    if (fs.existsSync('data.xlsx')) {
        let tmp = xlsx.parse('data.xlsx');
        data = tmp[0].data;
    } else {
        data.push(keysToArray(jData));
    }
    
    data.push(objectToArray(jData));
    let out = xlsx.build([{name: 'Sheet 1', data: data}]);
    fs.writeFileSync('data.xlsx', out, 'binary');

    res.json({msg: 'OK'});
});

const PORT = process.env.PORT || 5555;
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});
