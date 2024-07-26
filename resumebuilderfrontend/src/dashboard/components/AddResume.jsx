import { Loader2, PlusSquare } from 'lucide-react'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {v4 as uuidv4} from "uuid"
import GlobalApi from '../../../service/GlobalApi';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';


const API_KEY = import.meta.env.VITE_STRAPI_API_KEY

function AddResume() {

  const [openDialogue,setOpenDialogue] = useState(false); 
  const [resumeTitle,setResumeTitle] = useState("");
  const [loading,setLoading] = useState(false);
  const navigation =  useNavigate()

  const {user} = useUser();

  const onCreate=()=>{
    setLoading(true)
    const uuid = uuidv4();
    const data  = {
      data:{
        Title : resumeTitle,
        resumeID : uuid,
        userEmail : user?.primaryEmailAddress?.emailAddress,
        userName :user?.fullName
      }
    }

   

    GlobalApi.CreateResume(data).then((res)=>{
      
      if(res){
        setLoading(false)
        setOpenDialogue(false)
        navigation(`/dashboard/resume/${res.data.data.documentId}/edit`)
      }
    },(error)=>{
      setLoading(false)
    })
  }
  return (
    <div>
      <div className='p-14 py-24 border items-center flex justify-center bg-secondary rounded-lg h-[280px]
        hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dotted'
        onClick={()=>{setOpenDialogue(true)}}
        >
        <PlusSquare />



      </div>

      <Dialog open={openDialogue} >
        
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new resume</DialogTitle>
            <DialogDescription>
              <p>Add a title for your resume</p>
              <Input className="mt-2 text-black font-sans" placeholder="Ex.Machine Learning" onChange={(e)=>{setResumeTitle(e.target.value)}}/>
            </DialogDescription>
            <div className='flex justify-end gap-4'>
              <Button variant="ghost" onClick={()=>{setOpenDialogue(false)}}>Cancel</Button>
              <Button onClick={onCreate} disabled={!resumeTitle || loading}>
                {
                  loading? <Loader2 className='animate-spin'/>:"Create"
                }
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>


    </div>
  )
}

export default AddResume