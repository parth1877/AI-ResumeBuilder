import React, { useContext, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Link, Navigate, useParams } from 'react-router-dom'
import PersonalDetail from './Forms/PersonalDetail'
import { ArrowRight, LayoutGrid,ArrowLeft, Home, View } from 'lucide-react'
import Summary from './Forms/Summary'
import { ResumeinfoContext } from '@/context/ResumeinfoContext'
import Experience from './Forms/Experience'
import { useEffect } from 'react'
import Education from './Forms/Education'
import Skills from './Forms/Skills'
import ThemeColor from './ThemeColor'

function FormSection() {


  const [activeFormindex, setActiveformindex] = useState(() => {
    const savedIndex = localStorage.getItem('activeFormindex');
    return savedIndex !== null ? Number(savedIndex) : 1;
  });

  const {resumeId} = useParams()
  
  const [enableNext, setEnableNext] = useState(() => {
    const savedEnableNext = localStorage.getItem('enableNext');
    return savedEnableNext !== null ? savedEnableNext === 'true' : false;
  });

  useEffect(() => {
    localStorage.setItem('activeFormindex', activeFormindex);
  }, [activeFormindex]);

  useEffect(() => {
    localStorage.setItem('enableNext', enableNext);
  }, [enableNext]);

  const handleResetFormIndex = () => {
    setActiveformindex(1);
    setEnableNext(false);
  };


  return (
    <div>
      <div className='flex justify-between items-center mb-8'>
        <div className='flex gap-5'>
          <Link to={"/dashboard"} onClick={handleResetFormIndex}>
            <Button><Home/></Button>
          </Link>
          
          <ThemeColor/>
          
        </div>
        
        <div className='flex gap-2'>
          {activeFormindex>1 && <Button  size="sm" onClick={()=>{setActiveformindex(activeFormindex-1)} } disabled={!enableNext}><ArrowLeft/></Button>}
          <Button className="flex gap-2" size="sm" disabled={!enableNext} onClick={()=>{setActiveformindex(activeFormindex+1)}}>
            Next <ArrowRight/>
          </Button>
        </div>
      </div>
      {activeFormindex==1 ? <PersonalDetail enableNext={(v)=>setEnableNext(v)}/> : 
      activeFormindex==2 ? <Summary enableNext={(v)=>setEnableNext(v)}/>
      :activeFormindex==3 ? <Experience  enableNext={(v)=>setEnableNext(v)}/>
      :activeFormindex==4 ? <Education  enableNext={(v)=>setEnableNext(v)}/>
      :activeFormindex==5 ? <Skills  enableNext={(v)=>setEnableNext(v)}/>
      :activeFormindex==6 ? <Navigate to={ "/my-resume/"+resumeId+"/view"}/>
      :null}
    </div>
  )
}

export default FormSection