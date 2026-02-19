import { useForm } from "react-hook-form";

const UserCreate = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <input {...register("firstname")} className="w-full rounded-md border border-slate-200 text-sm px-3 py-2 outline-0 bg-white"/>
      <select {...register("gender")} className="w-full rounded-md border border-slate-200 text-sm px-3 py-2 outline-0 bg-white">
        <option value="male">male</option>
        <option value="female">female</option>
      </select>
      <button type="submit">submit</button>
    </form>
  );
};

export default UserCreate;
