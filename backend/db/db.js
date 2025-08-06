import mongoose from "mongoose";
export default async function connectDB () {
    try {
        const conn = await mongoose.connect(process.env.MONGOOSE_URL)
        console.log('Connected successfully', conn.connection.host)
    } catch (error) {
        console.log('Fail to connect')
    }
}