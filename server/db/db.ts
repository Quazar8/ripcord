import mongoose from 'mongoose'

const connectToDb = ():void => {
    mongoose.connect('mongodb://localhost:27017/ripcord', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    mongoose.connection.on('connected', () => {
        console.log('Connected to the Ripcord mongo database')
    })
}

export {
    connectToDb 
}