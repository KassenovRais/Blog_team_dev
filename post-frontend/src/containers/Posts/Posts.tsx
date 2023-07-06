import React from "react";
import { useAppSelector } from "@/hooks/reduxHooks";
import { Button, Grid, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import PostItem from "@/components/PostItem/PostItem";
import { useGetPostQuery } from "@/store/services/post";
import { useDeletePostMutation } from "@/store/services/post";
import {
    CSSTransition,
    TransitionGroup,
  } from 'react-transition-group';
import './Posts.css'

const Posts = () => {
    const { user } = useAppSelector(state => state.auth);
    const {data: posts} = useGetPostQuery();
    const [deletePost] = useDeletePostMutation();


    return (
        <Grid container direction="column" spacing={2}>
        
            <Grid
                sx={{ justifyContent: "space-between", alignItems: "center" }}
                item
                container
                direction="row"
            >
                <Grid item>
                    <Typography variant="h4">
                        Все посты
                    </Typography>
                </Grid>
                <Grid item>
                    {user
                        ?
                        <Button color="primary" component={Link} to={"posts/new"}>
                            Добавить пост
                        </Button>
                        : null}
                </Grid>
            </Grid>
                <TransitionGroup className='postList'>
                    {posts && posts.map(post => (
                        <CSSTransition
                            key={post._id}
                            timeout={500}
                            classNames="item"
                        >
                        <PostItem
                            key={post._id}
                            user_id={post.user_id._id}
                            id={post._id}
                            userName={post.user_id.userName}
                            title={post.title}
                            datetime={post.datetime}
                            image={post.image}
                            deletePost={() => {deletePost(post._id)}}
                        />
                        </CSSTransition>
                    ))}
                </TransitionGroup>

            
        </Grid>
    )
}

export default Posts;