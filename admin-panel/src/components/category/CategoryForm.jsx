import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import {categorySchema} from "../../validations/categorySchema"
import {generateSlug} from "../../hooks/useSlug"
import { addCategory, getCategory } from '../../api/category.api'

const CategoryForm = ({category}) => {
  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(categorySchema),
  })  

  const submitHandler = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if(key === 'image' && data.image?.[0]){
        formData.append('image', data.image[0])
      }else{
        formData.append(key, data[key] ?? '')
      }
    })
    try {
      const res = await addCategory(formData)
      console.log(res.data) 
    } catch (error) {
      console.log(error.response)  
    }
  }
  return (
       <form onSubmit={handleSubmit(submitHandler)}>
        <div className="flex items-start gap-5">
          <div className="basis-8/12">
            <div className="bg-white p-4 shadow-card rounded-lg">
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-1">
                  <label htmlFor="cat-name" className="text-sm">Category Name</label>
                  <input
                    type="text"
                    id="cat-name"
                    className="w-full rounded-md border border-slate-200 text-sm px-3 py-2 outline-0"
                    {...register('name')}
                  />
                  {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                </div>
                   <div className="flex flex-col gap-1">
                  <label htmlFor="cat-name" className="text-sm">Category Slug</label>
                  <input
                    type="text"
                    id="cat-name"
                    className="w-full rounded-md border border-slate-200 text-sm px-3 py-2 outline-0"
                    {...register('slug')}
                  />
                  {errors.slug && <p className='text-red-500'>{errors.slug.message}</p>}
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="parent-cat" className="text-sm">Parent Category</label>
                  <select
                    id="parent-cat"
                    className="w-full rounded-md border border-slate-200 text-sm px-3 py-2 outline-0"
                    {...register('parentId')}
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    {category
                      .map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      ))}
                  </select>
                  {errors.parentId && <p className='text-red-500'>{errors.parentId.message}</p>}
                </div>
              </div>
            </div>
          </div>
          <div className="basis-4/12">
            <div className="bg-white p-4 shadow-card rounded-lg">
              <div className="flex flex-col gap-1">
                <label htmlFor="product-image" className="text-sm">Product Image</label>
                <div className="flex justify-center items-center relative w-full rounded-md cursor-pointer border-dashed border border-slate-200 text-sm px-3 py-2 outline-0 overflow-hidden h-20">
                  <input
                    type="file"
                    className="absolute top-0 left-0 w-full h-full opacity-0"
                    {...register('image')}
                  />
                  <p>Upload Image</p>
                </div>
                {errors.image && <p className='text-red-500'>{errors.image.message}</p>}
              </div>
            </div>
          </div>
        </div>
        <button type='submit'>Submit</button>
      </form>
  )
}

export default CategoryForm