const mongoose = require('mongoose');


const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log('Database online!!');

    } catch (error) {
        console.log(error);
        throw new Error('Database connection could not be initiallize')
    }
}

module.exports = {
    dbConnection
}