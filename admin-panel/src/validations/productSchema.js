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
    .test("fileSize", "Image too large (max 2MB)", (value) => {
      if (!value) return true;
      if (typeof value === "string") return true;
      if (value instanceof FileList && value.length > 0) {
        return value[0].size <= 5 * 1024 * 1024;
      }
      return true;
    })
    .test("fileType", "Unsupported file format", (value) => {
      if (!value) return true;
      if (typeof value === "string") return true;
      if (value instanceof FileList && value.length > 0) {
        return ["image/jpeg", "image/png", "image/webp"].includes(value[0].type);
      }
      return true;
    }),
    
    shortDescription: yup
    .string()
    .min(10, 'Description should be at least 10 characters')
    .max(200, 'Description should not exceed 200 characters')
    .required('Short description is required'),
    
    isActive: yup
    .boolean(),

    showInHome: yup
    .boolean()
})