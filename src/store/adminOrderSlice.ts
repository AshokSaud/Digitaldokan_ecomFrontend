import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../globals/types/type";
import type { AppDispatch } from "./store";
import { APIWITHTOKEN } from "../http";
import {  PaymentMethod, PaymentStatus, type IOrderDetail } from "../pages/my-orders-detail/types";

export interface IAdminOrder{
    id : string,
    OrderStatus?: string,
    totalAmount?:number,
    Payment? :{
        paymentMethod : PaymentMethod,
        paymentStatus : PaymentStatus
    }
}
interface IInitialState{
    items : IAdminOrder[],
    status : Status,
    orderDetails : IOrderDetail[]
}

const initialState:IInitialState={
    status:Status.LOADING,
    items: [],
    orderDetails : []

}

const adminOrderSlice = createSlice({
    name : "Adminorders",
    initialState,
    reducers:{
        setItems(state:IInitialState,action:PayloadAction<IAdminOrder[]>){
            state.items = action.payload
        },
        setOrderDetails(state:IInitialState,action:PayloadAction<IOrderDetail[]>){
            state.orderDetails = action.payload
        },
        setStatus(state:IInitialState,action:PayloadAction<Status>){
            state.status = action.payload
        },
        // updateOrderStatusToCancel(state:IOrder,action:PayloadAction<{orderId:string}>){
        //     const orderId = action.payload.orderId
        //     const datas = state.orderDetails.find((order)=>order.orderId === orderId)
        //     datas ? datas.Order.OrderStatus = OrderStatus.Cancelled : ""
        // }

    }
})
export const{setItems,setStatus,setOrderDetails } = adminOrderSlice.actions
export default adminOrderSlice.reducer


export function fetchOrders(){
    return async function fetchOrdersThunk(dispatch:AppDispatch){
        try {
            const response = await APIWITHTOKEN.get("/order/all")
            if(response.status == 200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setItems(response.data.data))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
    }
}
export function fetchAdminOrderDetails(id:string){
    return async function fetchAdminOrderDetailThunk(dispatch:AppDispatch){
        try {
            const response = await APIWITHTOKEN.get("/order/" + id)
            if(response.status == 200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setOrderDetails(response.data.data))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
    }
}
// export function cancelOrderAPI(id:string){
//     return async function cancelOrderAPIThunk(dispatch:AppDispatch){
//         try {
//             const response = await APIWITHTOKEN.patch("/order/cancel-order/" + id)
//             if(response.status == 200){
//                 dispatch(setStatus(Status.SUCCESS))
//                 dispatch(updateOrderStatusToCancel({orderId: id}))
//             }else{
//                 dispatch(setStatus(Status.ERROR))
//             }
//         } catch (error) {
//             console.log(error)
//             dispatch(setStatus(Status.ERROR))
//         }
//     }
// }
