const express = require('express');
const urlRoutes = require('./routes/urls');

const app = express();

app.use(express.json());

app.listen(8080, () => {
    console.log('Server Started at 8080.');
});

app.use(express.json());
app.use('/api/urls', urlRoutes);
