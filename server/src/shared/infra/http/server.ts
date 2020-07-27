/* eslint-disable no-console */
import 'dotenv/config';
import 'reflect-metadata';
import '@shared/container';

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';

import http from 'http';

import { setupWebSocket } from '@shared/infra/http/middlewares/websocketio';
import mongooseConfig from '@config/mongoose';

import routes from '@shared/infra/http/routes';

const app = express();
const server = http.createServer(app);

mongoose.connect(mongooseConfig.uri, mongooseConfig.options);

setupWebSocket(server);

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3333, () => {
  console.log('🚀 Server started on port 3333!');
});
