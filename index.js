const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config(); // Make sure this is at the top
const userRouter = require('./routes/auth');
const cors = require('cors');
const path = require('path');

console.log('MONGO_URL:', process.env.MONGO_URL); // Check the output here

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB is connected");
})
.catch((err) => { console.log(err.message); });

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5001;

app.use('api/auth', userRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'client', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
