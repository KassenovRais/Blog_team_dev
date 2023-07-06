import { IComment } from '@/interfaces/IComment'
import {api} from './index'

const commentPath = api.injectEndpoints({
       endpoints:(builder) => ({
              getCommentById:builder.query<IComment[] , string>({
                     query:(_id) => `/comments?post_id=${_id}`,
                     providesTags:['Comment']
              }),
              postComment:builder.mutation<IComment , Pick<IComment , 'post_id' | 'title'>>({
                     query:(body) => ({
                            url:'/comments',
                            method:'post',
                            body:body
                     }),
                     invalidatesTags:['Comment']
              }),
              deleteComment:builder.mutation<IComment , string>({
                     query:(id) => ({
                            url:`/comments/${id}`,
                            method:'delete',
                     }),
                     invalidatesTags:['Comment']
              })
       })
})

export const {usePostCommentMutation , useDeleteCommentMutation , useGetCommentByIdQuery} = commentPath