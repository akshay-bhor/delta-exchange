require('dotenv').config();
const express = require('express');
const { dbSync } = require('./common/util');
const app = express();

const apiRoutes = require('./routes/api');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', apiRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const msg = error.message || 'Unknown Error Occurred!';
    const data = error.data;

    res.status(status).json({
        msg: msg,
        data: data
    });
})

app.listen(process.env.PORT || 4000, function() {
    // Sync db models
    dbSync();
});