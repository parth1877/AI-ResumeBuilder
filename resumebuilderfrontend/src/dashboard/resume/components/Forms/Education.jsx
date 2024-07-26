import { Input } from '@/components/ui/input';
import React,{useState,useEffect} from 'react'
import { Button } from '@/components/ui/button';
import { useContext } from 'react';
import { ResumeinfoContext } from '@/context/ResumeinfoContext';
import { Textarea } from '@/components/ui/textarea';
import { useParams } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';
import GlobalApi from '../../../../../service/GlobalApi';
import { toast } from 'react-toastify';


export default function Education() {

  const [educationalList,setEducationalList] = useState([{
    universityName:'',
    degree:'',
    major:'',
    startDate:'',
    endDate:'',
    description:''
  }]);

  const { resumeInfo, setResumeinfo } = useContext(ResumeinfoContext)
  const params = useParams();
  const [loading, setLoading] = useState(false);


  const onSave = () => {
    setLoading(true)
    const data = {
      data: {
        education: educationalList.map(({ id, ...rest }) => rest)
      }
    }

    

    GlobalApi.updateResumeDetail(data,params?.resumeId).then(res => {
      
      setLoading(false);
      toast.success('Details updated !')
    }, (error) => {
      console.log(error)
      setLoading(false);
      toast.error("Something went wrong!,Try again later")
    })

  }




  function handleChange(e,index){
    const newEntries = educationalList.slice();
    const { name, value } = e.target;
    newEntries[index][name] = value;
    setEducationalList(newEntries);
  }

  useEffect(()=>{
    resumeInfo&&setEducationalList(resumeInfo?.education)
  },[])

  const addEdu = () => {
    setEducationalList([...educationalList,{
        universityName:'',
        degree:'',
        major:'',
        startDate:'',
        endDate:'',
        description:''
      } ])
  }

  

  useEffect(() => {
    setResumeinfo({
      ...resumeInfo,
      education: educationalList
    })
   
  }, [educationalList])

  const removeEdu = () => {
    setEducationalList(educationalList => educationalList.slice(0, -1))
  }

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Education</h2>
        <p>Add Your Educational details</p>

        <div>
            {educationalList.map((item,index)=>(
                 <div key={index}>
                    <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                        <div>
                            <label className='text-xs'>University Name</label>
                            
                            <Input name="universityName" defaultValue={item?.universityName} onChange={(e)=>handleChange(e,index)}/>
                        </div>

                        <div>
                            <label className='text-xs'>Degree</label>
                            <Input name="degree" defaultValue={item?.degree} onChange={(e)=>handleChange(e,index)}/>
                        </div>

                        <div>
                            <label className='text-xs'>Major</label>
                            <Input name="major" defaultValue={item?.major} onChange={(e)=>handleChange(e,index)}/>
                        </div>

                        <div>
                            <label className='text-xs'>Start Date</label>
                            <Input type="date" name="startDate" defaultValue={item?.startDate} onChange={(e)=>handleChange(e,index)}/>
                        </div>

                        <div>
                            <label className='text-xs'>End Date</label>
                            <Input type="date" name="endDate" defaultValue={item?.endDate} onChange={(e)=>handleChange(e,index)}/>
                        </div>

                        <div className='col-span-2'>
                            <label className='text-xs'>Description</label>
                            <Textarea   name="description" defaultValue={item?.description} onChange={(e)=>handleChange(e,index)}/>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <div className='flex justify-between'>
          <div className='flex gap-2'>
            <Button variant="outline" className="text-primary" onClick={addEdu}>+ Add More Experience</Button>
            <Button variant="outline" className="text-primary" onClick={removeEdu}>- Remove</Button>
          </div>
          <Button onClick={()=>onSave()}  disabled={loading}>
            {
              loading ? <LoaderCircle className='animate-spin' /> : "Save"
            }
          </Button>
        </div>
    </div>
  )
}
