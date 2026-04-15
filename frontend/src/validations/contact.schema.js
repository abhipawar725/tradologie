import * as yup from "yup"
import CountryData from "../data/country.json"

const contactSchema = yup.object().shape({
    userType: yup
    .mixed()
    .oneOf(["importer", "exporter", "aspirant"], "Invalid user type")
    .required("User Type is required"),

    name: yup
    .string()
    .required("Name is required")
    .min(3, 'Minimum 3 characters')
    .max(200, 'Max 200 characters'),

    email: yup
    .string()
    .trim()
    .lowercase()
    .email("Invalid email format")
    .required("Email is required"),

    mobile: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Must be 10 digit"),

    countryCode: yup
    .string()
    .required("Country code is required"),

    country: yup
    .string()
    .required("Country is required")
    .test("match-country-code", "Country must match with country code",
        function(country){
           const {countryCode} = this.parent;
           if(!countryCode || !country) return true;
           const match = CountryData.find((c) => c.country === country);
           return match?.dialCode === countryCode
        } 
    ),
    state: yup
    .string()
    .trim()
    .required("State is required")
    .test("match-country", "State must be belong to country", function(state){
      const {country} = this.parent;
      if(!country || !state) return true;
      const match = CountryData.find((c) => c.country === country);
      return match?.states?.includes(state) ?? false;     
    }),

    message: yup
    .string()
    .optional()
})