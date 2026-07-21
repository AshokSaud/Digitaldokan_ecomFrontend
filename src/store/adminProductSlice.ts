import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../globals/types/type";
import type { AppDispatch, RootState } from "./store";
import { API, APIWITHTOKEN } from "../http";
import Product from "../pages/product/Product";
import type { IProduct } from "../pages/admin/products/components/ProductModal";
import { act } from "react";



interface ICategory{
    id:string,
    categoryName:string
}

 export interface IProductDetail{
id: string,
productName:string,
productDescription:string,
productPrice:number,
productTotalStock:number,
discount:number,
productImageUrl:string,
createdAt:string,
updatedAt:string,
categoryId:string,
Category:ICategory
}

interface IAdminProduct{
    products: IProductDetail[],
    status: Status,
    product: null | IProductDetail
}

const initialState:IAdminProduct ={
    products: [],
    status:Status.LOADING,
    product : null
}

const adminProductSlice = createSlice({
    name: "adminProduct",
    initialState,
    reducers:{
        setProducts(state:IAdminProduct,action:PayloadAction<IProductDetail[]>){
            state.products = action.payload
        },
        addProducts(state:IAdminProduct,action:PayloadAction<IProductDetail>){
            state.products.push(action.payload) 
        },
        setSingleProduct(state:IAdminProduct,action:PayloadAction<IProductDetail>){
            state.product = action.payload
        },
        setStatus(state:IAdminProduct,action:PayloadAction<Status>){
            state.status = action.payload
        },
        setDeleteProducts(state:IAdminProduct,action:PayloadAction<string>){
            const index = state.products.findIndex(product=>product.id === action.payload)
            if(index !== -1){
                state.products.splice(index,1)
            }
        }
    }
})
export const {setProducts,setStatus,setDeleteProducts,addProducts,setSingleProduct} = adminProductSlice.actions
export default adminProductSlice.reducer

export function fetchAdminProducts(){
    return async function fetchAdminProductsThunk(dispatch:AppDispatch){
        try {
            const response = await API.get("/product")
            if(response.status === 200){
               
                dispatch(setProducts(response.data.data))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}
export function deleteAdminProducts(id:string){
    return async function deleteAdminProductsThunk(dispatch:AppDispatch){
        try {
            const response = await APIWITHTOKEN.delete("/product/" + id)
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setDeleteProducts(id))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}
export function addProduct(data : IProduct){
    return async function addProductThunk(dispatch:AppDispatch){
        try {
            const response = await APIWITHTOKEN.post("/product",data,{
                headers:{
                    "Content-Type" : "multipart/form-data"     //backend ma product add garda image gayera xa vaney headers multipart/form-data rakhney
                }
            })
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(addProducts(response.data.data))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}
export function fetchSingleProduct(id:string){
    return async function fetchSingleProductThunk(dispatch:AppDispatch,getState:()=>RootState ){  //yo RootState ./store dekhi aako ho not from redux toolkit
        const store = getState()
        const productExists = store.adminProduct.products.find((product:IProductDetail)=>product.id === id)
        if(productExists){
            dispatch(setSingleProduct(productExists))
            dispatch(setStatus(Status.SUCCESS))
        }else{

            try {
                const response = await APIWITHTOKEN.get("/product/" + id)
                if(response.status === 200){
                    dispatch(setStatus(Status.SUCCESS))
                    dispatch(setSingleProduct(response.data.data.length >0 && response.data.data[0]))
                }else{
                    dispatch(setStatus(Status.ERROR))
                }
            } catch (error) {
                console.log(error)
                dispatch(setStatus(Status.ERROR))
            }
        }
    }
}
