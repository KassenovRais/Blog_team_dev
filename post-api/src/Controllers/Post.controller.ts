import { Router , Response , Request } from "express";
import Post from "../Models/Post.model";
import PostDto from "../DTO/Post.dto";
import {uploadPath} from '../../config';
import { nanoid } from "nanoid";
import Comment from "../Models/Comment.model";
import path from "path";
import multer from 'multer'
import User from "../Models/User.model";


const storage = multer.diskStorage({
       destination: (req , file , cb ) => {
              cb(null , uploadPath)
       },
       filename: (req, file , cb ) => {
              cb(null , nanoid() + path.extname(file.originalname))

       }
})

const upload = multer({storage})


const postController:Router = Router()


postController.post('' , upload.single('image'),async(req:Request , res:Response) => {

       const token = req.get('Authorization')
       const {title} = req.body;
       let image = "";
       if (req.file) {
       image = req.file.filename;
       }

       try {                     
              
              if(!token) {
                     return res.status(404).send('Not auth')
              }
              const user = await User.findOne({token: token})

              
              if(user && title ) {
                     if(image || req.body.description){

                            
                            const postDto = new PostDto(
                                   title , 
                                   req.body.description? 
                                   req.body.description : '' , 
                                   image? image: '' ,  
                                   user.id)
                            
                            const response = new Post(postDto)

                            response.save()

                            return res.send(response)
                     }
                     return res.status(404).send('Not image and description')
 
              }

              return res.status(404).send('Not title')


       } catch (error) {
              res.status(404).send('Error')
       }

})

postController.get('' , async(req:Request ,res:Response) => {


       try {
              const responceNews = await Post.find().populate({path:'user_id' , select:'userName'}).sort({datetime:-1})
       
              return res.send(responceNews)
              
       } catch (error) {
              return res.status(404).send('Error')
       }
         

})
postController.get('/:id' , async (req:Request , res:Response) => {
       
       const {id} = req.params

       try {
              const responceNews = await Post.findById(id).populate({path:'user_id' , select:'userName'})

              res.send(responceNews)
       
       } catch (error) {
              res.status(404).send('Error')
       }

})


postController.delete('/:id' , async (req:Request , res:Response) => {
       
       const {id} = req.params

       const token = req.get('Authorization')

       try {
              if(token){

                     const user = await User.findOne({token : token})
                     if(user){
                            const responceNews = await Post.findByIdAndRemove(id)
              
                            if(responceNews) {
                                   const responceComment = await Comment.deleteMany({post_id:id})
                                   res.send(responceComment)
                            }
                     }
                     
              }

       
       } catch (error) {
              res.status(404).send('Error')
       }

})

export default postController