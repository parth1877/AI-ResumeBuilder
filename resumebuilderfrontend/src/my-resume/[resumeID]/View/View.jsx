import { Header } from '@/components/Header/Header'
import { Button } from '@/components/ui/button'
import { ResumeinfoContext } from '@/context/ResumeinfoContext'
import ResumePreview from '@/dashboard/resume/components/ResumeReview'
import React, { useContext, useEffect, useState } from 'react'
import GlobalApi from '../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { RWebShare } from 'react-web-share'



function View() {

    const [resumeInfo, setResumeinfo] = useState();
    const { resumeID } = useParams();

    useEffect(() => {
        getResumeInfo()
    }, [])


    const getResumeInfo = () => {
        GlobalApi.getResumeByID(resumeID).then((res) => {
            setResumeinfo(res.data.data)
        }, (error) => {
            console.log(error)
        })
    }

    const HandleDownload = () => {
        window.print();
    }

    return (
        <ResumeinfoContext.Provider value={{ resumeInfo, setResumeinfo }} >
            <div id='non-print-area'>
                <Header />
                <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
                    <h2 className='text-center text-2xl font-medium'>Your Resume is ready !</h2>
                    <p className='text-center text-gray-400'>You can download you resume or share your resume</p>
                    <div className='flex justify-between mx-44 my-10'>
                        <Button onClick={HandleDownload}>Download</Button>
                        <RWebShare
                            data={{
                                text: "Please click here to see resume",
                                url: import.meta.env.VITE_BASE_URL+"/my-resume"+resumeID+"/view",
                                title: resumeInfo?.firstName+" "+resumeInfo?.lastName,
                            }}
                            onClick={() => console.log("shared successfully!")}
                        >
                            <Button>Share 🔗</Button>
                        </RWebShare>
                    </div>
                </div>

            </div>
            <div id='print-area' className='my-10 mx-10 md:mx-20 lg:mx-36'>
                <ResumePreview />
            </div>
        </ResumeinfoContext.Provider>
    )
}

export default View