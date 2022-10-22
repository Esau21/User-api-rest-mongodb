const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyparser = require('body-parser');
const API = require('./routes/Routes');
require('dotenv').config();
const app = express();

app.set('port', process.env.PORT || 5000);

app.use(express.json());
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use("/user/api", API);

mongoose
        .connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => {
            console.log("DB IS CONNECTED IN PORT || localhost: 27017");
        }).catch((error) => {
            console.log(error.message);
        });


app.listen(app.get('port'), () => {
    console.log("THE SERVER IS RUNNING IN PORT || localhost:", app.get('port'));
});
