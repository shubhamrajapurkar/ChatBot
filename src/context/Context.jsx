import { createContext, useState } from "react";
import run from "../config/chatbot";

export const Context = createContext();

const ContextProvider=(props)=>{

    const [input,setInput]=useState("");
    const [recentPrompt,setRecentPrompt]=useState("");
    const [prevPrompt,setPrevPrompt]=useState([]);
    const [showResult,setShowResult]=useState(false);
    const [loading,setLoading]=useState(false);
    const [resultData,setResultData]=useState("");

    const delayPara=(index,nextWord)=>{
        setTimeout(() => {
            setResultData(prev=>prev+nextWord)
        }, 75*index);
    }

    const newChat =()=>{
        setLoading(false);
        setShowResult(false);
    }

    const onSent = async (prompt)=>{

        setResultData("");
        setLoading(true);
        setShowResult(true);

        let response;
        if(prompt !== undefined){
            response = await run(prompt);
            setRecentPrompt(prompt)
        }
        else{
            setPrevPrompt(prev=>[...prev,input]);
            setRecentPrompt(input);
            response=await run(input);
        }
        
       
        // const response = await run(input);

        let responseArr=response.split("**");
        let newResponse="";
        for(let i=0;i<responseArr.length;i++){
            if(i==0 || i%2 !==1){
                newResponse +=responseArr[i];
            }
            else{
                newResponse+="<b>"+responseArr[i]+"</b>";
            }
        }
        newResponse=newResponse.split("*").join("</br>")

        let newResponseArr=newResponse.split(" ");
        for(let i=0;i<newResponseArr.length;i++){
            const newWord=newResponseArr[i];
            delayPara(i,newWord+" ");
        }
        setLoading(false);
        setInput("");
    }


    const contextValue={
        prevPrompt,
        setPrevPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;