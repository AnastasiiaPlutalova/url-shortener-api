const express = require('express');

const app = express();

app.use(express.json());

app.listen(8080, () => {
    console.log(`Server Started at ${8080}`);
});
