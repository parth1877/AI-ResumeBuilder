import { Button } from '@/components/ui/button';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useState } from 'react'
import {
    BtnBold,
    BtnBulletList,
    BtnClearFormatting,
    BtnItalic,
    BtnNumberedList,
    BtnRedo,
    BtnUndo,
    Separator,
    Toolbar,
    Editor,
    EditorProvider
} from 'react-simple-wysiwyg';
import { AIchatSession } from '../../../../service/AIModel';
import { ResumeinfoContext } from '@/context/ResumeinfoContext';
import { toast } from 'react-toastify';
import { useContext } from 'react';

const prompt='position titile: {positionTitle} , Depends on position title give me 5-7 bullet points for me in resume,Please do not give any type of array or json objects,give me result strictly in HTML tags and in string format'



function RichTextEditor({onRichTexteditorChange,index,defaultValue}) {


    const { resumeInfo, setResumeinfo } = useContext(ResumeinfoContext)
    
    const [loading,setLoading] = useState(false)

    
    const [value, setValue] = useState(defaultValue)




    const GenerateSummaryFromAI = async () => {
        
        if(resumeInfo?.experience[index].title === ''){
            toast.error("Please add position title");
            return;
        }

        setLoading(true)
        const PROMPT = prompt.replace("{positionTitle}", resumeInfo?.experience[index].title)
        const result = await AIchatSession.sendMessage(PROMPT)
        

        console.log(result.response.text());
        const resp=result.response.text()
        setValue(resp.replace(`${'"'}`,'').replace(`${'"'}`,''));
        setLoading(false);
        
        setLoading(false)
    }


    return (
        <div>
            <div className='flex justify-between my-2 items-center'>
                <label className='text-xs'>Summary</label>
                <Button variant="outline"  className="flex gap-2 border-primary text-primary " onClick={GenerateSummaryFromAI}>{loading ? <LoaderCircle className='animate-spin'/> :<><Brain className='h-4 w-4'/>Generate from AI</> }</Button>
            </div>
            <EditorProvider>
                <Editor value={value} onChange={(e) => { setValue(e.target.value);
                    onRichTexteditorChange(e)
                 }}>
                    <Toolbar>
                        <BtnUndo />
                        <BtnRedo />

                        <Separator />

                        <BtnBold />
                        <BtnItalic />
                        
                        
                        <Separator />

                        <BtnNumberedList />
                        <BtnBulletList />
                        
                        <Separator />
                       
                        <BtnClearFormatting />
                       
                        
                    </Toolbar>
                </Editor>
            </EditorProvider>
        </div>
    )
}

export default RichTextEditor