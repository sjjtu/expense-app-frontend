const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.DB_URI;
mongoose.connect(uri, { useNewUrlParser: true}
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const boardsRouter = require('./routes/boards');
const usersRouter = require('./routes/users');
const categoriesListRouter = require('./routes/categories');

app.use('/boards', boardsRouter);
app.use('/users', usersRouter);
app.use('/categories', categoriesListRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
