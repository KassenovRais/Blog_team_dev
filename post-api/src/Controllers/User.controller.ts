import {Router , Request , Response} from 'express'
import { UserDto } from '../DTO/User.dto'
import User from '../Models/User.model'


const userController: Router = Router()

userController.post('/sessions' ,async (req:Request , res:Response) => {

       const {userName , password} = req.body as UserDto         

       const user = await User.findOne({userName : userName})       

       if(!user) {              
              return res.status(404).send({error:'User not found'})    
       }
       if(password) {              
                            
              const checkPass = await user.checkPassword(password)
                            
              if(!checkPass){
                     
                     return res.status(404).send({error:'Password not wrong'})    
              }

              await user.generateToken()

              await user.save()
              
              res.send(user)
              
       }else{
              res.status(404).send('FAQ')  
       }

})

userController.post('' ,async (req:Request , res:Response) => {

       

       const {userName , password} = req.body  as UserDto

       

       try {
              const userDto = new UserDto(userName , password)

              const responce = new User(userDto)
              
              responce.generateToken()

              await responce.save()

              res.send(responce)
       } catch (error) {
              res.status(404).send('FAQ')      
       }

})



export default userController
