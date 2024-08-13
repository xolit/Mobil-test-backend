const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./Route/UserRoutes');
const connectdb = require('./Database/db');

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(router);
app.use(connectdb);

app.get('/', (req, res) => {
  res.send('Hello World!');
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

