import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../globals/types/type";
import type { AppDispatch } from "./store";
import { API, APIWITHTOKEN } from "../http";

interface ICategoryDetails{
    id:string,
    categoryName:string
}
interface ICategory{
    category:ICategoryDetails[],
    status: Status
}

const initialState:ICategory ={
    category:[],
    status:Status.LOADING
}

const adminCategorySlice = createSlice({
    name:"categories",
    initialState,
    reducers:{
        setCategory(state:ICategory,action:PayloadAction<ICategoryDetails[]>){
            state.category =action.payload
        },
        addCategoriesToCategory(state:ICategory,action:PayloadAction<ICategoryDetails>){
            state.category.push(action.payload)
        },
        setStatus(state:ICategory,action:PayloadAction<Status>){
            state.status = action.payload
        },
        setDeleteCategory(state:ICategory,action:PayloadAction<string>){
                    const index = state.category.findIndex(item=>item.id == action.payload)
                    if(index !== -1){
                        state.category.splice(index,1)
                    }
        },
        resetStatus(state:ICategory){
            state.status = Status.LOADING
        }
        
    }
})
export const {setCategory,setStatus,setDeleteCategory,addCategoriesToCategory,resetStatus} = adminCategorySlice.actions
export default adminCategorySlice.reducer

export function addCategory(categoryName:string){
    return async function addCategoryThunk(dispatch:AppDispatch){
        try {
        const response = await APIWITHTOKEN.post("/category",{categoryName:categoryName})
        if(response.status === 200){
            dispatch(setStatus(Status.SUCCESS))
            dispatch(addCategoriesToCategory(response.data.data))
        }else{
            dispatch(setStatus(Status.ERROR))
        }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}
export function fetchCategory(){
    return async function fetchCategoryThunk(dispatch:AppDispatch){
        try {
            const response = await API.get("/category")
        if(response.status === 200){
            dispatch(setCategory(response.data.data))
            dispatch(setStatus(Status.SUCCESS))
        }else{
            dispatch(setStatus(Status.ERROR))
        }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}
export function deleteCategories(categoryId:string){
    return async function deleteCategoriesThunk(dispatch:AppDispatch){
        try {
            const response = await APIWITHTOKEN.delete("/category/" + categoryId)
        if(response.status === 200){
            dispatch(setDeleteCategory(categoryId))
            dispatch(setStatus(Status.SUCCESS))
        }else{
            dispatch(setStatus(Status.ERROR))
        }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}
