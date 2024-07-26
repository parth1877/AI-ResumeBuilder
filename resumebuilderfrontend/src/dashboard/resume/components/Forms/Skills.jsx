import { Input } from '@/components/ui/input';
import React, { useState } from 'react'
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { useContext,useEffect } from 'react';
import { ResumeinfoContext } from '@/context/ResumeinfoContext';
import GlobalApi from '../../../../../service/GlobalApi';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';


function Skills() {

    const [skillList, setSkillList] = useState([{
        name: "",
        rating: 0
    }]);

    const [loading, setLoading] = useState(false);
    const params = useParams();
    const { resumeInfo, setResumeinfo } = useContext(ResumeinfoContext)



    function handleChange(index, name, value) {
        const newEntries = skillList.slice();
        newEntries[index][name] = value;
        setSkillList(newEntries);
    }

    const addSkill = () => {
        setSkillList([...skillList, {
            name: "",
            rating: 0
        }])
    }

    const removeSkill = () => {
        setSkillList(skillList => skillList.slice(0, -1))
    }

    useEffect(()=>{
        resumeInfo?.skills?.length>0 && setSkillList(resumeInfo?.skills)
      },[])

    useEffect(() => {
        setResumeinfo({
            ...resumeInfo,
            skills: skillList
        })

    }, [skillList])

    const onSave = () => {
        setLoading(true)
        const data = {
          data: {
            skills: skillList.map(({ id, ...rest }) => rest)
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
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Skills</h2>
            <p>Add Your Skills</p>


            <div className='mt-3'>
                {skillList?.map((item, index) => {
                    return <div key={index} className='flex justify-between mb-2 border rounded-lg p-3'>
                        <div>
                            <label className="text-xs">Name</label>
                            <Input className="w-full" defaultValue={item?.name} onChange={(e) => handleChange(index, "name", e.target.value)} />
                        </div>

                        <Rating style={{ maxWidth: 120 }} value={item?.rating} onChange={(v) => handleChange(index, "rating", v)} />
                    </div>
                })}
            </div>

            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <Button variant="outline" className="text-primary" onClick={addSkill}>+ Add More Skills</Button>
                    <Button variant="outline" className="text-primary" onClick={removeSkill}>- Remove</Button>
                </div>
                <Button onClick={() => onSave()} disabled={loading}>
                    {
                        loading ? <LoaderCircle className='animate-spin' /> : "Save"
                    }
                </Button>
            </div>
        </div>
    )
}

export default Skills