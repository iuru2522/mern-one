const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
//middleware парсинг
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useUnifiedTopology: true}
    );
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDb database connection established successfully");

})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter)


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})
