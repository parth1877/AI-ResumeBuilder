import { ResumeinfoContext } from '@/context/ResumeinfoContext';
import { Input } from '@/components/ui/input';
import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { useParams } from 'react-router-dom';
import GlobalApi from '../../../../../service/GlobalApi';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'
import 'react-notifications-component/dist/theme.css'; // Import default CSS theme
import { store as notificationStore, useNotification } from 'react-notifications-component';


const PersonalDetail = ({enableNext}) => {

    const params = useParams();

    const { resumeInfo, setResumeinfo } = useContext(ResumeinfoContext);

    const [formdata,setFormdata] = useState({});
    const [loading,setloading] = useState(false);

    
   

    function handleInputChange(e){
        enableNext(false)
        const {name,value} = e.target;
        setFormdata({
            ...formdata,
            [name]:value
        })
        setResumeinfo({
            ...resumeInfo,
            [name]:value
        })
    }

    function onSave(e){
        e.preventDefault();
        setloading(true)
        const data = {
            data:formdata
        }
       
       
        GlobalApi.updateResumeDetail(data,params?.resumeId).then((res)=>{
            
            enableNext(true)
            setloading(false)
            toast.success('Details saved successfully!')
        },(error)=>{
            console.log(error)
            setloading(false)
            toast.error("Something went wrong!,Try again later")
        })
        
    }

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4'>
            <h2 className='font-bold text-lg'>Personal Details</h2>
            <p>Get started with basic information</p> 

            <form onSubmit={onSave}>
                <div className='grid grid-cols-2 mt-5 gap-3'>
                    <div>
                        <label>First Name</label>
                        <Input name="firstName" defaultValue={resumeInfo?.firstName} className="text-sm" onChange={handleInputChange} require/>
                    </div>

                    <div>
                        <label>Last Name</label>
                        <Input name="lastName" defaultValue={resumeInfo?.lastName} className="text-sm" onChange={handleInputChange} require/>
                    </div>

                    <div className='col-span-2'>
                        <label>Job Title</label>
                        <Input name="jobTitle" className="text-sm" defaultValue={resumeInfo?.jobTitle} onChange={handleInputChange} require/>
                    </div>

                    <div className='col-span-2'>
                        <label>Address</label>
                        <Input name="address" className="text-sm" defaultValue={resumeInfo?.address} onChange={handleInputChange} require/>
                    </div>

                    <div className='col-span-2'>
                        <label>Phone</label>
                        <Input name="phone" className="text-sm" defaultValue={resumeInfo?.phone} onChange={handleInputChange} require/>
                    </div>

                    <div className='col-span-2'>
                        <label>Email</label>
                        <Input name="email" className="text-sm" defaultValue={resumeInfo?.email} onChange={handleInputChange} require/>
                    </div>
                </div>

                <div className='mt-3 flex justify-end'>
                        <Button type="submit" disabled={loading}>
                            
                            {
                                loading?<LoaderCircle className='animate-spin'/>:"Save"
                            }
                        </Button>
                </div>
            </form>
        </div>
    )
}

export default PersonalDetail