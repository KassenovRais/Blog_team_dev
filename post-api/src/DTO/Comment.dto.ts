export default class CommentDto{
       user_id:string
       post_id:string
       datetime:Date = new Date()
       title:string

       constructor( user_id:string,
              post_id:string,
              title:string){

              this.title = title
              this.post_id = post_id
              this.user_id = user_id
               
       }
}