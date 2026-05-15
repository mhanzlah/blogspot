import app from './src/app.js';
import connectDB from './src/config/db.js';
import config from './src/config/config.js';

connectDB(config.MONGO_URI, () => {
    console.log('Database connected');
});

app.listen(config.PORT, () => {
    console.log(`Server started at port ${config.PORT}`);
})
