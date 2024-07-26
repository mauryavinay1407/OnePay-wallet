import React from 'react'

export const InputBox = ({label,placeholder,onChange,value,styles,readOnly}) => {
  return (
   <div>
    <div className='text-sm font-medium text-left py-2' >{label}</div>
    <input onChange={onChange} className=' border-gray-200 w-full p-1 border-1 rounded text-sm outline-1' type="text" placeholder={placeholder} value={value} style={styles} readOnly={readOnly}/>
   </div>
  )
}
