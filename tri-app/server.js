const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT || 4000
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/sort', (req, res) => {
    var arr = JSON.parse(req.query.numbers)
    var order = req.query.order
    res.send(insertionSort(arr, order))
})


function insertionSort(arr, order) {
    for (let i = 1; i < arr.length; i++) {

        for (let j = i - 1; j > -1; j--) {
            if (order === 'descending') {
                if (arr[j + 1] > arr[j]) {
                    [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
                }
            }
            else {
                if (arr[j + 1] < arr[j]) {
                    [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
                }
            }
        }
    }
    return arr;
}

app.listen(PORT, console.log(`Server listening at ${PORT}`));