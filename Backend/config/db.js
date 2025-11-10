import mongoose from 'mongoose'

const ConnectDb = async()=>{

  try{
  const connect = await mongoose.connect(process.env.MONGO_URI, {

  })
  console.log("Database connect successfully");

  }
  catch(err){
    console.log("error occured during dataBase connection "+ err)
    process.exit(1)

  }
}
export default ConnectDb;