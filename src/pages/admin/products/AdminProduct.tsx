import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import AdminLayout from "../AdminLayout"
import AdminProductTable from "./components/AdminProductTable"
import { fetchAdminProducts } from "../../../store/adminProductSlice"


function AdminProduct (){
  const dispatch = useAppDispatch()
  const {products} = useAppSelector((store)=>store.adminProduct)
  useEffect(()=>{
    dispatch(fetchAdminProducts())
  },[])
  return (
    <AdminLayout>
        <AdminProductTable products={products}/>
    </AdminLayout>
  )
}

export default AdminProduct
