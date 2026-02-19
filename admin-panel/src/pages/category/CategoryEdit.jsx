import React, { useEffect } from 'react'
import { getCategoryById } from '../../api/category.api'
import { useParams } from 'react-router-dom'

const CategoryEdit = () => {
  const {id} = useParams()
  const getCategory = async() => {
    const res = await getCategoryById(id)
    console.log(res.data)
  }

  useEffect(() => {
   getCategory()
  },[])

  return (
    <div>
      category edit page
    </div>
  )
}

export default CategoryEdit
