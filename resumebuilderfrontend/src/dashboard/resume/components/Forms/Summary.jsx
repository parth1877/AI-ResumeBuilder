import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeinfoContext } from '@/context/ResumeinfoContext'
import { Brain, LoaderCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import GlobalApi from '../../../../../service/GlobalApi';
import { AIchatSession } from '../../../../../service/AIModel';


const prompt = "Job Title: {jobTitle} , Depends on job title give me list of  summery for 3 experience level, Mid Level and Freasher level in 5-6 lines in array format, With summery and experience_level Field in JSON Format"



const Summary = ({ enableNext }) => {

    const { resumeInfo, setResumeinfo } = useContext(ResumeinfoContext)
   
    const [summary, setSummary] = useState('');
    const [loading, setloading] = useState(false);
    const [aiGeneratedSummary,setaiGeneratedSummary] = useState();
    const params = useParams();

    useEffect(() => {
        summary && setResumeinfo({
            ...resumeInfo,
            summary: summary
        })
    }, [summary])

    const GenerateSummaryFromAI = async () => {
        setloading(true)
        const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle)
        const result = await AIchatSession.sendMessage(PROMPT)
        console.log(JSON.parse(result.response.text()))
        setaiGeneratedSummary(JSON.parse([result.response.text()]))
        setloading(false)
    }

    

    function handleInputChange(e) {
        enableNext(false)
        setSummary(e.target.value);
    }

    function onSave(e) {
        e.preventDefault();
        setloading(true)
        const data = {
            data: {
                summary: summary
            }
        }

        console.log(data)

        GlobalApi.updateResumeDetail(data, params?.resumeId).then((res) => {
            
            enableNext(true)
            setloading(false)
            toast.success('Details saved successfully!')
        }, (error) => {
            console.error(error)
            setloading(false)
            toast.error("Something went wrong!,Try again later")
        })
    }
    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4'>
                <h2 className='font-bold text-lg'>Summary</h2>
                <p>Add summary for your job title</p>

                <form className='mt-7' onSubmit={onSave}>
                    <div className='flex justify-between items-end'>
                        <label>Add Summary</label>
                        <Button variant="outline" onClick={() => GenerateSummaryFromAI()}
                            type="button" size="sm" className="border-primary text-primary flex gap-2">
                            <Brain className='h-4 w-4' />  Generate from AI
                        </Button>   
                        
                    </div>

                    <Textarea className="mt-5" onChange={handleInputChange} required defaultValue={resumeInfo?.summary} />
                    <div className='mt-5 flex items-end justify-end'>
                        <Button type="submit" disabled={loading}>
                            {
                                loading ? <LoaderCircle className='animate-spin' /> : "Save"
                            }

                        </Button>
                    </div>
                </form>


            </div>

            {aiGeneratedSummary && 
            <div>
                <h2 className='font-bold text-lg'>Suggestions</h2>
                {aiGeneratedSummary.map((item,index)=>{
                    return<div key={index}>
                        <h2 className='font-bold my-1'>Level : {item?.experience_level}</h2>
                        <p>{item?.summary}</p>
                    </div>
                })}
            </div>}

            


        </div>
    )
}

export default Summary