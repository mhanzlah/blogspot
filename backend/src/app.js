import cookieParser from 'cookie-parser';
import express from 'express';
import morgan from 'morgan';
import apiRouter from './routes/api.routes.js';
import errorMiddleware from './middlewares/error.middleware.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Blogspot service is up and running ;)')
});

app.use('/api', apiRouter);

app.use(errorMiddleware);

export default app;
