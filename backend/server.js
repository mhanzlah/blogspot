require('dotenv').config();

const app = require('./src/app');
const connectDB = require('./src/config/db');

const MONGO_URI = process.env.MONGO_URI;

connectDB(MONGO_URI, () => {
    console.log('Database connected');
}, (err) => {
    console.error(err);
    process.exit(1);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
})
