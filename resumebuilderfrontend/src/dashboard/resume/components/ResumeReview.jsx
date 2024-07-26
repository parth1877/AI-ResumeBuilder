import { ResumeinfoContext } from '@/context/ResumeinfoContext'
import React, { useContext } from 'react'
import { PersonalDetailPreview } from './Preview/PersonalDetailPreview'
import SummaryPreview from './Preview/SummaryPreview'
import ExpPreview from './Preview/ExpPreview'
import EducationalPreview from './Preview/EducationalPreview'
import SkillsPreview from './Preview/SkillsPreview'

const ResumePreview = () => {

    const {resumeInfo,setResumeInfo} = useContext(ResumeinfoContext)
  return (
    <div className={`shadow-lg h-full p-14 border-t-[20px]`} style={{
        borderColor:resumeInfo?.themeColor
    }}>
        {/* Personal Detail */}
        <PersonalDetailPreview resumeInfo={resumeInfo}/>

        {/* Summary */}
        <SummaryPreview resumeInfo={resumeInfo}/>

        {/* Professional Experience */}
        <ExpPreview resumeInfo={resumeInfo}/>

        {/* Educational Details */}
        <EducationalPreview resumeInfo={resumeInfo}/>

        {/* Skills */}
        <SkillsPreview resumeInfo={resumeInfo}/>
    </div>
  )
}

export default ResumePreview