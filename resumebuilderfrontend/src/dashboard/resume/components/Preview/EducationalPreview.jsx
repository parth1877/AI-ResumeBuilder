import React from 'react'

function EducationalPreview({resumeInfo}) {
    return (
        <div className='my-6'>
        <h2 className='text-center font-bold text-sm mb-2'
        style={{
            color:resumeInfo?.themeColor
        }}
        ><i className="fas fa-graduation-cap" style={{ marginRight: '8px' }}></i>
            Education</h2>
        <hr style={{
            borderColor:resumeInfo?.themeColor
        }} />
    
        {resumeInfo?.education?.map((education,index)=>(
            <div key={index} className='my-5'>
                <h2 className='text-sm font-bold'
                    style={{
                        color:resumeInfo?.themeColor
                    }}
                >{education.universityName}</h2>
                <h2 className='text-xs flex justify-between'>{education?.degree} in {education?.major}
                <span>
                    <i className="fas fa-calendar-alt" style={{ marginRight: '4px' }}></i>
                    {education?.startDate} - {education?.endDate}
                </span>
                </h2>
                <p className='text-xs my-2'>
                    {education?.description}
                </p>
            </div>
        ))}
    
        </div>
      )
}

export default EducationalPreview