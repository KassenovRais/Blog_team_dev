export default class PostDto {
       title:string
       description:string
       image:string
       datetime:Date = new  Date()
       user_id:string
       constructor(title:string,
              description:string,
              image:string,
              user:string){
              this.user_id = user
              this.title = title
              this.image = image
              this.description = description
       }
}