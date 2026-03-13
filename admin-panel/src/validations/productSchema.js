import * as yup from "yup"

const FILE_SIZE = 5 * 1024 * 1024
const SUPPORT_FORMAT = ['image/png', 'image/jpg', 'image/webp']

export const productSchema = yup.object({
    name: yup
    .string()
    .trim()
    .min(3, 'Name must be at least 3 characters')
    .max(100, 'Name must not be extent 100 characters')
    .required('Product name is required'),

    category: yup
    .string()
    .required('Category is required'),

    slug: yup
    .string()
    .trim()
    .required('Slug is required')
    .matches(/^[a-z0-9-]+$/, 'Slug must be lowercase'),

    image: yup
    .mixed()
    .required('Image is required')
    .test('fileSize', 'File size is too large(max 5mb)', (value) => {
        return !value | (value && value.size <= FILE_SIZE)
    })
    .test('fileFormat', 'Unsupported file format', (value) => {
        return !value | (value && SUPPORT_FORMAT.includes(value.type))
    })    
})