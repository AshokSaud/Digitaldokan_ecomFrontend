
import AdminLayout from "../AdminLayout"
import CategoryTable from "./components/Table"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { fetchCategory } from "../../../store/adminCategorySlice"

export interface ICategory{
    id:string,
    categoryName:string
}

function Categories(){
    const dispatch = useAppDispatch()
    const {category:categories} = useAppSelector((store)=>store.categories)
    useEffect(()=>{
        dispatch(fetchCategory())
    },[])
    return(
        <AdminLayout>
            <CategoryTable categories={categories} />

        </AdminLayout>
    )
}
export default Categories