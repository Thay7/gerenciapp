import express, { application, Router } from 'express'
const app = express()
import bodyParser from 'body-parser'
import routes from './routes/routes.js';

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes.userRouter);
app.use('/api', routes.authRoutes);
//app.use('/api', routes.authRoutes);



app.listen(3000)
