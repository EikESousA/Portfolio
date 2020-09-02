import 'dotenv/config';
import 'reflect-metadata';
import '@shared/container';

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import http from 'http';
import { errors } from 'celebrate';

import { setupWebSocket } from '@shared/infra/http/middlewares/websocketio';
import mongooseConfig from '@config/mongoose';

import routes from '@shared/infra/http/routes';
import uploads from '@shared/infra/http/middlewares/uploads';

const app = express();
const server = http.createServer(app);

if (process.env.NODE_BD !== 'test') {
  mongoose.connect(mongooseConfig.uri_prod, mongooseConfig.options);
}

setupWebSocket(server);

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(uploads);
app.use(errors());

export default server;
