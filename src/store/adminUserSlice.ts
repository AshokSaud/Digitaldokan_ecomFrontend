import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { Status } from "../globals/types/type"
import type { AppDispatch } from "./store"
import { APIWITHTOKEN } from "../http"

export interface IUserDetails{
    id:string,
    username:string,
    email:string
}
interface IUser{
    users:IUserDetails[],
    status:Status
}

const initialState:IUser={
    users:[],
    status:Status.LOADING

}
 
 const adminUserSlice = createSlice({
    name:"users",
    initialState,
    reducers:{
        setUsers(state:IUser,action:PayloadAction<IUserDetails[]>){
            state.users = action.payload
        },
        setStatus(state:IUser,action:PayloadAction<Status>){
            state.status = action.payload
        },
        setDeleteUser(state:IUser,action:PayloadAction<string>){      //action ma deleteusers func ko dispatch ma deko userId aako xa
            const index = state.users.findIndex(user=>user.id == action.payload) 
            if(index !== -1){
                state.users.splice(index,1)
                }
        }
    }
 })
 export const {setUsers,setStatus,setDeleteUser} = adminUserSlice.actions
 export default adminUserSlice.reducer

 export function fetchUsers(){
    return async function fetchUsersThunk(dispatch:AppDispatch){
        try {
            const response = await APIWITHTOKEN.get("/auth/users")
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setUsers(response.data.data))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
 }
 export function deleteUsers(UserId:string){
    return async function deleteUsersThunk(dispatch:AppDispatch){
        try {
        const response = await APIWITHTOKEN.delete("/auth/users/" + UserId)
        if(response.status === 200){
            dispatch(setStatus(Status.SUCCESS))
            dispatch(setDeleteUser(UserId))
        }else{
            dispatch(setStatus(Status.ERROR))
        }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
 }