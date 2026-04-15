import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { contactSchema } from "../validations/contact.schema";
import countryData from "../data/country.json"
import Select from "react-select/base";
import { Controller } from "react-hook-form";

const Contact = () => {
  const [role, setRole] = useState("Importer");
  const [state, setState] = useState(null)
  const {register, watch, handleSubmit, control, formState: {errors}} = useForm({resolver: yupResolver(contactSchema)})
  const onSubmit = (data) => {
    console.log("data", data)
  }
  console.log(errors)
  console.log(watch("country"))

  const changeState = (value) => {
    const country = countryData.find((country) => country.iso3 === value)
    setState(country.states)
  }

  return (
    <>
      <div className="p-8">
        <div className="bg-white border border-gray-100 rounded-2xl p-8 max-w-2xl mx-auto shadow-sm">
          <div className="mb-7">
            <h2 className="text-xl font-medium text-text-primary">Get in touch</h2>
            <p className="text-sm text-text-secondary mt-1">We'll get back to you within 24 hours.</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 flex flex-col gap-2">
              <label className="text-xs font-medium text-text-secondary uppercase tracking-wide" htmlFor="usertype">
                I am
              </label>
              <div className="flex flex-wrap gap-2">
                {["Importer", "Exporter", "Aspirant"].map((option) => (
                  <button key={option} type="button" onClick={() => setRole(role)} className={`px-4 py-2 rounded-full text-sm border transition-all duration-150 ${role === option ? "bg-primary/50 border-primary-hover font-medium" : "bg-gray-50 border-gray-50 text-text-secondary hover:border-gray-300 hover:text-gray-500"}`}>
                    {option}
                  </button>
                ))}
                <input type="hidden" value={role.toLocaleLowerCase()} {...register("userType")} />
              </div>
            </div>
            <div className="col-span-2 h-px bg-gray-100 my-1" />
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-text-secondary uppercase tracking-wide" htmlFor="name">
                Full Name
              </label>
              <input type="text" name="name" id="name" placeholder="Jane Smith" {...register("name")} className="w-full bg-gray-50 border border-gray-200 rounded-lg h-11 px-3.5 text-sm text-gray-900 outline-none transition-all focus:bg-white focus:border-gray-400 focus:ring-2 focus:ring-blue-100" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-400 uppercase tracking-wide" htmlFor="email">
                Email
              </label>
              <input type="email" name="email" id="email" placeholder="jane@example.com" {...register("email")} className="w-full bg-gray-50 border border-gray-200 rounded-lg h-11 px-3.5 text-sm text-gray-900 outline-none transition-all focus:bg-white focus:border-gray-400 focus:ring-2 focus:ring-blue-100" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-400 uppercase tracking-wide" htmlFor="country">
                Country
              </label>
              <select name="country" id="country" {...register("country", {onChange: (e) => changeState(e.target.value)})} className="w-full bg-gray-50 border border-gray-200 rounded-lg h-11 px-3.5 text-sm text-gray-900 outline-none transition-all focus:bg-white focus:border-gray-400 focus:ring-2 focus:ring-blue-100">
                <option value="">Select country</option>
                {countryData?.map((option) => (
                  <option key={option.iso2} value={option.iso3}>{option.name}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-400 uppercase tracking-wide" htmlFor="state">
                State / Region
              </label>
              <select name="state" id="state" {...register("state")} className="w-full bg-gray-50 border border-gray-200 rounded-lg h-11 px-3.5 text-sm text-gray-900 outline-none transition-all focus:bg-white focus:border-gray-400 focus:ring-2 focus:ring-blue-100">
                <option value="">Select state</option>
                {state?.map((option) => (
                  <option key={option.state_code} value={option.state_code}>{option.name}</option>
                ))}

              </select>
            </div>
            <div className="col-span-2 flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-400 uppercase tracking-wide" htmlFor="phone">
                Phone number
              </label>
              <div className="flex gap-2">
                <select name="countryCode" id="countryCode" {...register("countryCode")} className="w-28 bg-gray-50 border border-gray-200 rounded-lg h-11 px-3 text-sm text-gray-900 outline-none transition-all focus:bg-white focus:border-gray-400 focus:ring-2 focus:ring-blue-100">
                  <option value="+91">+91 IN</option>
                  <option value="+1">+1 US</option>
                  <option value="+44">+44 UK</option>
                  <option value="+49">+49 DE</option>
                  <option value="+65">+65 SG</option>
                </select>
                <input type="tel" name="phone" id="phone" {...register("mobile")} placeholder="8130988753" className="flex-1 bg-gray-50 border border-gray-200 rounded-lg h-11 px-3.5 text-sm text-gray-900 outline-none transition-all focus:bg-white focus:border-gray-400 focus:ring-2 focus:ring-blue-100" />
              </div>
            </div>
            <div className="col-span-2 flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-400 uppercase tracking-wide" htmlFor="message">
                Message
              </label>
              <textarea name="message" id="message" {...register("message")} placeholder="Tell us how we can help you…" className="w-full bg-gray-50 border border-gray-200 rounded-lg h-28 p-3.5 text-sm text-gray-900 outline-none transition-all focus:bg-white focus:border-gray-400 focus:ring-2 focus:ring-blue-100 resize-none" />
            </div>
            <div className="col-span-2 flex justify-end mt-1">
              <button type="submit" className="h-11 px-7 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors duration-150">
                Send message
              </button>
            </div>
          </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
