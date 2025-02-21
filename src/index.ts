import express from 'express';
import dataSource from './database/dataSource';
import "reflect-metadata";
import authenticationRoute from './routes/authentication.route';
import cors from 'cors';
import propertyRoute from './routes/property.route';
const app = express();


const port = process.env.PORT;
app.use(cors())
app.use(express.json());



app.use("/api/auth", authenticationRoute);
app.use("/api/properties", propertyRoute);
dataSource.initialize()
  .then(async () => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
