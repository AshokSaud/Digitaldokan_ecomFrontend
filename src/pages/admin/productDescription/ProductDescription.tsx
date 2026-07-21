import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import AdminLayout from "../AdminLayout"
import { fetchSingleProduct } from "../../../store/adminProductSlice"
import { useParams } from "react-router-dom"


const ProductDescription = () => {
    const {id} = useParams()
    const dispatch = useAppDispatch()
    const {product} = useAppSelector((store)=>store.adminProduct)
    console.log(product)
    useEffect(()=>{
        id && dispatch(fetchSingleProduct(id))
    },[])
  return (
    <AdminLayout>
        <h1>Productbdsfjusb</h1>
    </AdminLayout>
  )
}

export default ProductDescription
