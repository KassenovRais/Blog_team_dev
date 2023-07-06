export interface IComment {
       _id:string
       user_id:{
              _id:string
              userName:string
       }
       post_id:string
       datetime:Date 
       title:string
}