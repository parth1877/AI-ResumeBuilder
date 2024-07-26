
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import RichTextEditor from '../RichTextEditor'
import { ResumeinfoContext } from '@/context/ResumeinfoContext'
import { useParams } from 'react-router-dom'
import { LoaderCircle } from 'lucide-react'
import GlobalApi from '../../../../../service/GlobalApi';
import { toast } from 'react-toastify';



const formField = {
  title: '',
  companyName: '',
  city: '',
  state: '',
  startDate: '',
  endDate: '',
  workSummary: '',
}

export default function Experience() {

  const [experienceList, setexperienceList] = useState([formField])
  const { resumeInfo, setResumeinfo } = useContext(ResumeinfoContext)
  const params = useParams();
  const [loading, setLoading] = useState(false);


  function handleChange(index, e) {
    const newEntries = experienceList.slice();
    const { name, value } = e.target;
    newEntries[index][name] = value;
    setexperienceList(newEntries);
  }


  useEffect(()=>{
    resumeInfo?.experience?.length>0 && setexperienceList(resumeInfo?.experience)
  },[])

  const addExp = () => {
    setexperienceList([...experienceList, {
      title: '',
      companyName: '',
      city: '',
      state: '',
      startDate: '',
      endDate: '',
      workSummary: '',
    }])
  }

  const removeExp = () => {
    setexperienceList(experienceList => experienceList.slice(0, -1))
  }

  useEffect(() => {
    setResumeinfo({
      ...resumeInfo,
      experience: experienceList
    })

  }, [experienceList])

  function handleRichTextEditor(e, name, index) {
    const newEntries = experienceList.slice();
    newEntries[index][name] = e.target.value
    setexperienceList(newEntries)
  }

  const onSave = () => {
    setLoading(true)
    const data = {
      data: {
        experience: experienceList.map(({ id, ...rest }) => rest)
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

  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Professional Experience</h2>
        <p>Add you previous Job experience</p>

        <div>
          {experienceList.map((item, index) => {
            return <div key={index} >
              <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                <div>
                  <label className='text-xs'>Position Title</label>
                  <Input name="title" defaultValue={item?.title} onChange={(e) => { handleChange(index, e) }} />
                </div>

                <div>
                  <label className='text-xs'>Company Name</label>
                  <Input name="companyName" defaultValue={item?.companyName} onChange={(e) => { handleChange(index, e) }} />
                </div>


                <div>
                  <label className='text-xs'>City</label>
                  <Input name="city" defaultValue={item?.city} onChange={(e) => { handleChange(index, e) }} />
                </div>


                <div>
                  <label className='text-xs'>State</label>
                  <Input name="state" defaultValue={item?.state} onChange={(e) => { handleChange(index, e) }} />
                </div>


                <div>
                  <label className='text-xs'>Start Date</label>
                  <Input type="date" name="startDate" defaultValue={item?.startDate} onChange={(e) => { handleChange(index, e) }} />
                </div>

                <div>
                  <label className='text-xs'>End Date</label>
                  <Input type="date" name="endDate" defaultValue={item?.endDate} onChange={(e) => { handleChange(index, e) }} />
                </div>

                <div className='col-span-2'>
                  <RichTextEditor index={index} defaultValue={item.workSummary}  onRichTexteditorChange={(e) => handleRichTextEditor(e, 'workSummary', index)} />
                </div>

              </div>



            </div>

          })}

        </div>



        <div className='flex justify-between'>
          <div className='flex gap-2'>
            <Button variant="outline" className="text-primary" onClick={addExp}>+ Add More Experience</Button>
            <Button variant="outline" className="text-primary" onClick={removeExp}>- Remove</Button>
          </div>
          <Button onClick={()=>onSave()}  disabled={loading}>
            {
              loading ? <LoaderCircle className='animate-spin' /> : "Save"
            }
          </Button>
        </div>


      </div>

    </div>

  )

}
