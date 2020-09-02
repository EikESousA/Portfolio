import express from 'express';
import path from 'path';

const uploads = express();

uploads.use(
  '/uploads/ecoleta',
  express.static(
    path.resolve(__dirname, '..', '..', '..', '..', '..', 'uploads', 'ecoleta'),
  ),
);

export default uploads;
