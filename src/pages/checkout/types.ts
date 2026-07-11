import type { Status } from "../../globals/types/type";
import type { IOrderDetail } from "../my-orders-detail/types";

export interface IProduct{
    productId :string,
    productQty: number,
    OrderStatus?: string,
    totalAmount?:number,
    Payment? :{
        paymentMethod : PaymentMethod
    }
}
export interface IOrderItems extends IProduct{
    id: string,
    orderId: string
}
export interface IOrder{
    status:Status,
    items: IOrderItems[],
    khaltiUrl : string | null,
    orderDetails: IOrderDetail[]
}
export enum PaymentMethod{
    Esewa = "esewa",
    Khalti = "khalti",
    Cod = "cod"

}
export interface IData{
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    city:string,
    state:string,
    zipCode:string,
    AddressLine:string,
    totalAmount:number,
    paymentMethod: PaymentMethod,
    products:IProduct[]
}