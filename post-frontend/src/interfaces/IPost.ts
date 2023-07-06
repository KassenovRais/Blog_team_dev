export interface IPost{
       _id:string
       title:string
       description:string
       image:string
       datetime:Date
       user_id:{
              _id:string
              userName:string
       }
}