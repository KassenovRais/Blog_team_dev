import express, {Express} from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import postController from './Controllers/Post.controller'
import userController from './Controllers/User.controller'
import commentController from './Controllers/Comment.controller'


const PORT:number = 9000

const app: Express = express()
app.use(cors())
app.use(express.static('public/uploads'))
app.use(express.json())
app.use('/posts' , postController)
app.use('/comments' , commentController)
app.use('/users' , userController)


const run = async() => {
  await mongoose.connect('mongodb://localhost/laba_92')

  app.listen(PORT ,() => console.log(`PORT start on ${PORT}`))

  process.on('exit' , () => {
    console.log('disconnect');
    
    mongoose.disconnect()

  })
}


run().catch((e) => console.log(e))