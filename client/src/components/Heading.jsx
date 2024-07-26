import React from 'react'

export const Heading = ({label,styles}) => {
  return (
    <div className='text-3xl font-bold pt-2' style={styles} >{label}</div>
  )
}

