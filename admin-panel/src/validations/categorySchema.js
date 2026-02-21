import * as yup from "yup";
export const categorySchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must not be ecxeed 50 characters")
    .required("category name is required"),

  slug: yup
    .string()
    .trim()
    .matches(/^[a-z0-9-]+$/, "Slug must be lowercase and hyphen separated")
    .required("Slug is required"),

  parentId: yup.string().nullable(),

  image: yup
    .mixed()
.test("fileSize", "Image too large (max 2MB)", (value) => {
    if (!value) return true;

    // if editing and value is string (existing image URL)
    if (typeof value === "string") return true;

    // if FileList
    if (value instanceof FileList && value.length > 0) {
      return value[0].size <= 2 * 1024 * 1024;
    }

    return true;
  })
.test("fileType", "Unsupported file format", (value) => {
    if (!value) return true;

    if (typeof value === "string") return true;

    if (value instanceof FileList && value.length > 0) {
      return ["image/jpeg", "image/png", "image/webp"].includes(
        value[0].type
      );
    }

    return true;
  }),
  isActive: yup.boolean(),

  showInHome: yup.boolean(),
});
