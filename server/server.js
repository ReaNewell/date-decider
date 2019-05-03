const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

const router = require('./routes/routes');

app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use("/api", router);

app.get('/*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log('Server running');
});