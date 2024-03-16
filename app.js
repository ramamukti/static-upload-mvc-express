import express from 'express';
import 'dotenv/config';
import routes from './routes/index.js';
import errorHandler from './middlewares/error.handler.js'

const app = express();

app.use(express.json());
app.use(routes);
app.use(errorHandler);

const port = process.env.APP_PORT;
app.listen(port, (err) => {
    if (err) {
        throw err;
    }
    else {
        console.log(`Server is running on port ${port}`)
    } 
});