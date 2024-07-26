import { NotebookIcon } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MoreVertical } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Loader2Icon } from 'lucide-react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import GlobalApi from '../../../service/GlobalApi'
import { toast } from 'react-toastify'


export const ResumeCardItem = ({ resume , refreshData}) => {

  const navigate = useNavigate();
  const [openAlert,setOpenAlert] = useState(false);
  const [loading,setLoading]=useState(false);


  

  const onDelete = ()=>{
    setLoading(true);
   
    GlobalApi.deleteResumeByID(resume?.documentId).then((res)=>{
      
      toast.success("Resume Deleted !")
      refreshData()
      setLoading(false);
      setOpenAlert(false);
    },(error)=>{
      console.log(error)
      setLoading(false);
      
    })
  }

  return (
    <div className='hover:scale-105 transition-all hover:shadow-md shadow-primary'>


      <Link to={`/dashboard/resume/${resume.documentId}/edit`}>
        <div className='p-14 bg-gradient-to-b
          from-pink-100 via-purple-200 to-blue-200
        h-[280px] 
          rounded-t-lg border-t-4 flex justify-center items-center border-primary
      '>
          <img src="/cv.png" width={80} height={80} />
        </div>

      </Link>

      <div className='border p-3 flex justify-between text-white rounded-b-lg shadow-lg ' style={{background:resume?.themeColor}}>
        <h2 className='text-center my-1'>{resume?.Title}</h2>


        <DropdownMenu>
          <DropdownMenuTrigger><MoreVertical className='h-4 w-4 cursor-pointer' /></DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem onClick={()=>navigate(`/dashboard/resume/${resume?.documentId}/edit`)}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={()=>navigate(`/my-resume/${resume?.documentId}/view`)}>View</DropdownMenuItem>
            <DropdownMenuItem onClick={()=>navigate(`/my-resume/${resume?.documentId}/view`)}>Download</DropdownMenuItem>
            <DropdownMenuItem onClick={()=>{setOpenAlert(true)}}>Delete</DropdownMenuItem>
          </DropdownMenuContent>

        </DropdownMenu>


        <AlertDialog open={openAlert}>
          
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={()=>{setOpenAlert(false)}}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} disabled={loading}>
                {loading? <Loader2Icon className='animate-spin'/>:'Delete'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>


      </div>

    </div>
  )
}