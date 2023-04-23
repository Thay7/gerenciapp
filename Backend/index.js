import express from 'express'
const app = express()
import cors from 'cors'
import bodyParser from 'body-parser'
import routes from './routes/routes.js';

app.use(cors());

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes.userRouter);
app.use('/api', routes.authRoutes);
app.use('/api', routes.productRoutes);
app.use('/api', routes.stockRoutes);




app.listen(3005);
