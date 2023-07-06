import {Router , Request , Response }  from 'express'
import CommentDto from '../DTO/Comment.dto'
import Comment from '../Models/Comment.model'
import Post from '../Models/Post.model'
import User from '../Models/User.model'

const commentController: Router = Router()




commentController.get('' , async(req:Request , res:Response) => {

       const {post_id} = req.query

       if(post_id) {
              try {
                     const responceComment = await Comment.find({post_id: post_id}).populate({path:'user_id' , select:'userName'}).sort({datetime:-1})
       
                     res.send(responceComment)
       
              } catch (error) {
                     res.status(404).send('Error')
              }

       }else{
              try {
                     const responceComment = await Comment.find().populate({path:'user_id' , select:'userName'}).sort({datetime:-1})
       
                     res.send(responceComment)
       
              } catch (error) {
                     res.status(404).send('Error')
              }
       }

       

})

commentController.post('' , async(req:Request , res:Response) => {

       const token = req.get('Authorization')

       const {post_id  , title } = req.body
       

       try {
              if(token){

                     const user = await User.findOne({token:token})        

                     if(user) {
                                         
                            const responseNews = await Post.findById(post_id)

                            if(responseNews){

                                   const commentDto:CommentDto = new CommentDto(user.id , post_id , title)                                                 

                                   const responceComment = new Comment(commentDto) 
                                   
                                   await responceComment.save()
              
                                   return res.send(responceComment)
                            }else{
                                   return res.status(404).send("Error")
                            }
                     }
              }
              
       } catch (error) {
              res.status(404).send('Error')
       }

})


commentController.delete('/:id' , async (req:Request , res:Response) => {
       
       
       try {

              const {id} = req.params

              const token = req.get('Authorization')

              const user = await User.findOne({token: token})
       
              if(user){
                     const responceComment = await Comment.findByIdAndRemove(id)

                     if(responceComment) {
                            res.send(responceComment)
                     }
              }

       
       } catch (error) {
              res.status(404).send('Error')
       }

})


export default commentController