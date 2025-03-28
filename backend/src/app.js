import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import { errorMiddleware } from './helper/customError.js';
import applicationRoute from './router/applicationRoute.js';
import sabRoute from './router/sabRoute.js';

const app = express();

app.use(logger('tiny'));  // 'tiny' mode is colorless

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use('/upload', express.static('upload'));

applicationRoute(app);
sabRoute(app);

app.use(errorMiddleware);

app.set('port', process.env.PORT || 3000)

const server = app.listen(app.get('port'), () => {
    console.log('Listening on port ' + server.address().port);
})
