import type { Status } from "../../globals/types/type";

interface ICartProduct{
    id : string,
    productName : string,
    productPrice : number,
    productImageUrl : string
}

export interface ICartItem{
    id : string,
    productId : string,
    quantity : number,
    Product : ICartProduct
}


export interface ICartInitialState {
items : ICartItem[],
status : Status
}

export interface ICartUpdateItem{
    productId : string,
    quantity : number
}