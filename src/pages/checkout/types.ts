import type { Status } from "../../globals/types/type";

export interface IProduct{
    productId :string,
    productQty: number
}
export interface IOrderItems extends IProduct{
    orderId: string
}
export interface IOrder{
    status:Status,
    items: IOrderItems[],
    khaltiUrl : string | null
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