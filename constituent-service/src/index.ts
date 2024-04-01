import express from 'express';
import constituentsRouter from './routes/constituents';

const app = express();
app.use(express.json());

app.use("/constituents", constituentsRouter);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  return res.status(status).json(error);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});