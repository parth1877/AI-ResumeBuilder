import React from 'react'

function ExpPreview({resumeInfo}) {
  return (
    <div className='my-6 '>
        <h2 className='text-center font-bold text-sm mb-2' style={{color:resumeInfo?.themeColor}}>
        <i className="fas fa-briefcase" style={{ marginRight: '8px' }}></i>
            Professional Experience</h2>
        <hr style={{borderColor:resumeInfo?.themeColor}}/>
        {resumeInfo?.experience?.map(( experience,index)=>{
            return (
            <div key={index} className='my-5'>
                <h2 className='text-sm font-bold' style={{ color: resumeInfo?.themeColor }}>{experience?.title}</h2>
                <h2 className='text-xs flex justify-between'>{experience?.companyName},{experience?.city},{experience?.state}
                    <span>
                        <i className="fas fa-calendar-alt" style={{ marginRight: '4px' }}></i>
                        {experience?.startDate} {experience?.currentlyWorking? "Present" : ' To '+experience?.endDate}
                    </span>
                </h2>
                

                <div className='text-xs my-2' dangerouslySetInnerHTML={{__html:experience?.workSummary}}/>
                    
              

            </div>
            )
        })}
    </div>
  )
}

export default ExpPreview