import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

const fetchData = async() => {
   console.log("API start");
   const res = await fetch("https://jsonplaceholder.typicode.com/comments")
   if(!res.ok){
    throw new Error("api failed")
   }

   const data = await res.json()
   console.log("api response")
   return data
}

const Test = () => {
    const {data, isLoading, error, isFetching} = useQuery({
        queryKey: ["comments"],
        queryFn: fetchData,
    })

    if(isLoading) return <p>loading...</p>;
    if(error) return <p>{error.message}</p>;
  return (
    <>
    {isFetching && <p>Background updating</p>}
      <ul className="flex gap-4 flex-wrap">
        {data.map((item) => (
          <li key={item.id} className="border p-2">
            {item.name}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Test;
