import React, { FormEvent, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PostItem from '@/components/PostItem/PostItem'
import { useDeletePostMutation, useGetPostByidQuery } from '@/store/services/post'
import { useGetCommentByIdQuery, usePostCommentMutation } from '@/store/services/comment'
import CommentItem from '@/components/CommentItem/CommentItem'
import { useAppSelector } from '@/hooks/reduxHooks'
import { Button, Grid } from '@mui/material'
import FormElement from '@/components/UI/Form/FormElement'
import { IComment } from '@/interfaces/IComment'
import { Box } from '@mui/system'
import { CSSTransition,TransitionGroup} from 'react-transition-group';
import './PostById.css'

const classDiv = {
       width: '40%',
       height:'30vh',
       position:'fixed',
       top:'13vh',
       right:'3vw'
}

const PostById = () => {

       const params = useParams()

       const {data:post} = useGetPostByidQuery(`${params.id}`)

       const {data: arrComment = []} = useGetCommentByIdQuery(`${params.id}`)

       const [deletePost] = useDeletePostMutation()

       const navigate = useNavigate()

       const user = useAppSelector(state => state)

       const[value ,setValue] = useState<Pick<IComment , 'title'>>({
              title:''
       })

       const [addComment] = usePostCommentMutation()

       const SubmitHandler = (e:FormEvent<HTMLFormElement>) => {
              e.preventDefault()
              addComment({title:value.title , post_id:`${params.id}`}) 
              
              setValue({title: ''})
              
       }

       return (
              
              <>
                     {post &&
                            <PostItem
                                   userName={post.user_id.userName}
                                   title={post.title}
                                   image={post.image}
                                   datetime={post.datetime}
                                   id={post._id}
                                   user_id={post.user_id._id}
                                   deletePost={() => {
                                          deletePost(post._id)
                                          navigate('/')
                                   }}
                                   description={post.description}
                                   showDescription={true}
                            />
                     }
                     
                     <div>
                            {
                                   <TransitionGroup>
                                          
                                          {arrComment.map(val => {
                                                 return <CSSTransition
                                                               key={val._id}
                                                               timeout={500}
                                                               classNames="comment"
                                                        >      
                                                        <CommentItem
                                                               key={val._id}
                                                               _id={val._id}
                                                               title={val.title}
                                                               datetime={val.datetime}
                                                               user_id={val.user_id}
                                                        />                                  
                                                        </CSSTransition>

                                                 })}
                                   </TransitionGroup>
                            }
                     </div>
                     <div>
                            {
                                   user ? 
                                          
                                                 <Box sx={classDiv}>
                                                        <form onSubmit={SubmitHandler}>
                                                               <Grid container spacing={2}>
                                                                      <FormElement
                                                                             required
                                                                             value={value.title}
                                                                             onChange={(e) => setValue({title:e.target.value})}
                                                                             name='comment'
                                                                             label='Comment'
                                                                      />
                                                        
                                                               </Grid>                                                 
                                                               <Button
                                                                      type='submit'
                                                                      variant='contained'
                                                                      color='primary'
                                                                      sx={{marginTop: 3, marginBottom: 2}}
                                                               >
                                                               Прокоментировать
                                                               </Button>
                                                        
                                                        </form>
                                                 </Box>
                                          
                                   
                                   : 
                                   null
                            }
                     </div>
              </>
       )
}

export default PostById