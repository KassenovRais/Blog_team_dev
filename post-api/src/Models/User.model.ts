import  mongoose, {Schema , model, Model} from "mongoose";
import * as bcrypt from 'bcrypt'
import { nanoid } from 'nanoid';

interface IUser {
       userName:string
       password:string
       token:string
       checkPassword:(pass:string) => boolean
       generateToken:() => void
}


const usersModal = new Schema<IUser ,Model <IUser , object>>({
       userName:{
              type:String,
              required:true,
       },
       password:{
              type:String,
              required:true
       },
       token : String

})

usersModal.pre('save' , async function(next)  {

       if(!this.isModified('password')) return next()

       const salt = await bcrypt.genSalt()

       this.password =  await bcrypt.hash(this.password , salt)

       next()

})

usersModal.set('toJSON' , {
       transform:(doc , ret , options) => {
              delete ret.password
       }
})

usersModal.methods.checkPassword =  async function(password: string) {
              
       const check = await bcrypt.compare(password , this.password)

       return check
}

usersModal.methods.generateToken = function () {
       this.token = nanoid()        
}

const User = mongoose.model('User' , usersModal)

export default User
