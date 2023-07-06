import { api } from "./index";
import { IUser } from "@/interfaces/IUser";
import { UserForm } from "@/interfaces/UserForm";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation<IUser, UserForm>({
      query: (body) => ({
        url: "/users",
        method: "post",
        body,
      }),
    }),
    signIn: build.mutation<IUser, UserForm>({
        query: (body) => ({
          url: "/users/sessions",
          method: "post",
          body,
        }),
      }),
  }),
  
});

export const { useSignUpMutation, useSignInMutation } = authApi;

export default authApi;
