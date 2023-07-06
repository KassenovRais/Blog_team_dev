import React from 'react'
import { IComment } from '@/interfaces/IComment'
import { Button, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import { CheckerUser } from '@/helpers/CheckerUser'
import { useDeleteCommentMutation } from '@/store/services/comment'

const styles = {
       display:'flex',
       alignItems: 'center',
       justifyContent:'space-between'
}


const CommentItem = ({title , user_id , datetime , _id }:Omit<IComment , 'post_id'>) => {
       
       const date = new Date(datetime);


       const [deleteComment] = useDeleteCommentMutation()

       return (
              <Card sx={styles}>
                     <CardActionArea>
                            
                            <CardContent>
                                   <Typography gutterBottom variant="h5" component="h2">
                                   {user_id.userName}
                                   </Typography>
                                   <Typography variant="h4" color="p">
                                          {title}
                                   </Typography>
                                   <Typography variant="h6" color="p">
                                          {`${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}.${(date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`}
                                   </Typography>
                                   {
                                          CheckerUser(user_id._id) ? <Button onClick={() => deleteComment(_id)} size="small">Удалить</Button> : null
                                   } 
                            </CardContent>
                     </CardActionArea>
               </Card>
       )
}

export default CommentItem