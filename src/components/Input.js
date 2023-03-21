import React from 'react'

export default function Input({ placeholder, onChange, type, label }) {
  if(type == "textarea"){
    return (
      <div className="flex flex-col space-y-2">
     {label && <label className="text-gray-700 font-medium">{label}</label>}
     <textarea
        className="border border-gray-400 rounded-md py-2 px-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cornflower"
        placeholder={placeholder}
        onChange={onChange}
        type={type}
     />
   </div> )
  }
  else {
     return (
       <div className="flex flex-col space-y-2">
         {label && <label className="text-gray-700 font-medium">{label}</label>}
         <input
           className="border border-gray-400 rounded-md py-2 px-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cornflower"
           placeholder={placeholder}
           onChange={onChange}
           type={type}
         />
       </div>
     );
  }
 
}
