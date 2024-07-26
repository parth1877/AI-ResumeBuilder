import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from '../../components/FormSection';
import ResumePreview from '../../components/ResumeReview';
import { ResumeinfoContext } from '@/context/ResumeinfoContext';
import dummy from '@/data/dummy';
import GlobalApi from '../../../../../service/GlobalApi';

export const EditResume = () => {

  

  const [resumeInfo,setResumeinfo] = useState();
  const params = useParams();
  


  useEffect(() => {
    getResumeInfo();
  }, [])

  const getResumeInfo = ()=>{
    GlobalApi.getResumeByID(params?.resumeId).then(res=>{
      
      setResumeinfo(res.data.data)
    })
  }


  return (
    <ResumeinfoContext.Provider value={{resumeInfo,setResumeinfo}}>
      <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
        <FormSection />
        <ResumePreview />
      </div>
    </ResumeinfoContext.Provider>

  )
}
