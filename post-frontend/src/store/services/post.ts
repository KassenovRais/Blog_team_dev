import {IPost} from '@/interfaces/IPost'
import {api} from './index'

const postPath = api.injectEndpoints({
       endpoints:(builder) => ({
              getPostByid:builder.query<IPost , string>({
                     query:(id) => `/posts/${id}`,
                     providesTags:['Post']                     
              }),
              postNewPost:builder.mutation<IPost ,FormData >({
                     query:(body) => ({
                            url:'/posts',
                            method:'post',
                            body:body
                     }),
                     invalidatesTags:['Post']
              }),
              deletePost:builder.mutation<IPost ,string >({
                     query:(id) => ({
                            url:`/posts/${id}`,
                            method:'delete',
                     }),
                     invalidatesTags:['Post' , 'Comment']
              }),
              getPost:builder.query<IPost[] , void>({
                     query:() => `/posts`,
                     providesTags:['Post']                     
              }),

       })
})


export const {useGetPostByidQuery , useGetPostQuery , usePostNewPostMutation , useDeletePostMutation} = postPath