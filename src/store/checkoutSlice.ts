import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IData, IOrder, IOrderItems } from "../pages/checkout/types";
import { Status } from "../globals/types/type";
import type { AppDispatch } from "./store";
import { APIWITHTOKEN } from "../http";
import { OrderStatus, type IOrderDetail } from "../pages/my-orders-detail/types";

const initialState:IOrder={
    status:Status.LOADING,
    items: [],
    khaltiUrl : null,
    orderDetails:[]

}

const orderSlice = createSlice({
    name : "orders",
    initialState,
    reducers:{
        setItems(state:IOrder,action:PayloadAction<IOrderItems[]>){
            state.items = action.payload
        },
        setOrderDetails(state:IOrder,action:PayloadAction<IOrderDetail[]>){
            state.orderDetails = action.payload
        },
        setStatus(state:IOrder,action:PayloadAction<Status>){
            state.status = action.payload
        },
        setKhaltiUrl(state:IOrder,action:PayloadAction<string>){
            state.khaltiUrl = action.payload
        },
        updateOrderStatusToCancel(state:IOrder,action:PayloadAction<{orderId:string}>){
            const orderId = action.payload.orderId
            const datas = state.orderDetails.find((order)=>order.orderId === orderId)
            datas ? datas.Order.OrderStatus = OrderStatus.Cancelled : ""
        }

    }
})
export const{setItems,setStatus,setKhaltiUrl,setOrderDetails,updateOrderStatusToCancel } = orderSlice.actions
export default orderSlice.reducer

export function orderItem(data:IData){
    return async function orderItemThunk(dispatch:AppDispatch){

        try {
            const response = await APIWITHTOKEN.post("/order",data)
            if(response.status == 200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setItems(response.data.data))
                if(response.data.url){
                    setKhaltiUrl(response.data.url)
                    window.location.href = response.data.url
                }
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}

export function fetchMyOrders(){
    return async function fetchMyOrdersThunk(dispatch:AppDispatch){
        try {
            const response = await APIWITHTOKEN.get("/order")
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
export function fetchMyOrderDetails(id:string){
    return async function fetchMyOrderDetailThunk(dispatch:AppDispatch){
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
export function cancelOrderAPI(id:string){
    return async function cancelOrderAPIThunk(dispatch:AppDispatch){
        try {
            const response = await APIWITHTOKEN.patch("/order/cancel-order/" + id)
            if(response.status == 200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(updateOrderStatusToCancel({orderId: id}))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
    }
}
