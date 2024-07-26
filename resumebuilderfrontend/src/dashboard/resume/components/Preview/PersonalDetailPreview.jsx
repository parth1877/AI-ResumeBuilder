import React from 'react'

export const PersonalDetailPreview = ({ resumeInfo }) => {
  return (
    <div>
      <h2 className='font-bold text-xl text-center mb-2' style={{ color: resumeInfo?.themeColor }}>
        <i className="fas fa-user-circle" style={{ marginRight: '8px' }}></i>
        {resumeInfo?.firstName} {resumeInfo?.lastName}</h2>
      <h2 className='text-center text-sm font-medium mb-2'>
        <i className="fas fa-briefcase" style={{ marginRight: '4px' }}></i>{resumeInfo?.jobTitle}
      </h2>
      <h2 className='text-center font-normal text-xs mb-3'>
        <i className="fas fa-map-marker-alt" style={{ marginRight: '4px' }}></i>
        {resumeInfo?.address}
      </h2>

      <div className='flex justify-between mb-3'>
        <h2 className='font-normal text-xs' style={{ color: resumeInfo?.themeColor }}><i className="fas fa-phone-alt" style={{ marginRight: '8px' }}></i>{resumeInfo?.phone}</h2>
        <h2 className='font-normal text-xs' style={{ color: resumeInfo?.themeColor }}><i className="fas fa-envelope" style={{ marginRight: '8px' }}></i>{resumeInfo?.email}</h2>
      </div>
      <hr className='border-[1.5px] my-2 ' style={{ borderColor: resumeInfo?.themeColor }} />
    </div>
  )
}
