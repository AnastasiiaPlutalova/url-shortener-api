import express from 'express';
import cors from 'cors';
import urlRoutes from './urls/route.js';

const app = express();
app.use(cors());

app.use(express.json());

app.listen(8080, () => {
    console.log('Server Started at 8080.');
});

app.use(express.json());
app.use('/api/urls', urlRoutes);
