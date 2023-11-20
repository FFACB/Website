import express from 'express';
import { createServer } from 'http';
import { handler } from './build-node/handler.js';
import { log } from 'console';
import * as middlewares from './modules/server/middlewares/index.js';
// import Middlewares from './modules/server/sharp/index.js';

const port = 3000;
const app = express();
const server = createServer(app);


middlewares(app)
app.use(handler);
server.listen(port, () => {
    log("listening on port", port);
});