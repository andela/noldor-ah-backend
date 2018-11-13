import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import errorhandler from 'errorhandler';
import morgan from 'morgan';
import routes from './server/src/routes';


const isProduction = process.env.NODE_ENV;

// Create global app object
const app = express();
const moganDev = morgan('dev');

// Normal express config defaults
app.use(moganDev);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(routes);

if (!isProduction) {
  app.use(errorhandler());
}

// catch 404 and forward to error handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint does not exist',
  });
});

// finally, let's start our server...
const server = app.listen(process.env.PORT || 3000, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${server.address().port}`);
});

export default app;
