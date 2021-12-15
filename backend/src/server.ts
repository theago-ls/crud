import express from 'express';
import cors from 'cors';

import routes from './routes';

const app = express();
const server = require('http').Server(app);

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3001, () => {
  console.log('Server started on port 3001');
});
