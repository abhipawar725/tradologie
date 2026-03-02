const FormInput = ({ label, name, register, errors, type = "text", onChange, ...rest }) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm">{label}</label>
      <input
        type={type}
        id={name}
        className="w-full rounded-md border border-slate-200 text-sm px-3 py-2 outline-0"
        {...register(name, {onChange})}
        {...rest}
      />
      {errors?.[name] && <p className="text-red-500">{errors[name]?.message}</p>}
    </div>
  );
};

export default FormInput;
