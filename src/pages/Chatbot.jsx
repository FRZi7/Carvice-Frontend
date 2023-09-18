import React, { useState, useEffect } from 'react';
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from "@chatscope/chat-ui-kit-react";
import Navbar from './Navbar';
const API_KEY = "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";

function Chatbot() {
  const [typing, setTyping] = useState(false);
  const [initialMessages, setInitialMessages] = useState([
    {
      message: `I am Autobot, your personal assistant. I can answer questions based on quantum physics.

      Answer questions based on the passage given below.
      
      User : What all services do you provide?
      ChatGPT : we provide 3 services. carwash, carservice and mechanic. you can book your slot and we'll take care of the rest. ;)
      
      User : can i contact the admin?
      ChatGPT : If you have any enquiries, please send us a mail at admin@gmail.com.

      User : What are the costs of each service ? 
      ChatGPT : The cost of each service varies. Carwash is 200 rupees. Carservice is 500 rupees and any mechanical work costs according to that particular mechanic.
    
      User : When will i get my car back ? 
      ChatGPT : Don't woory about that, we'll handle your car with all care and we will let you know once it's ready sir. 
      
      User: Hi
      ChatGPT: Hi, How can I help you ?`,
      sender: "ChatGPT",
    },
    // Add more initial messages and responses here
  ]);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    // Display the initial messages when the component mounts
    setMessages(initialMessages);
  }, [initialMessages]);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing",
    };
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setTyping(true);
    await processMessageTOChatGPT(newMessages);
  };
    async function processMessageTOChatGPT(chatMessages){
            let apiMessage = chatMessages.map((messageObject)=>{
                let role = ""
                if(messageObject.sender === "ChatGPT"){
                    role = "assistant"
                }else{
                    role = "user"
                }
                return{
                    role:role, content:messageObject.message
                }
    })

    const systemMessage = {
        role : "system",
        content :"explain to me in 50 words or less"
    }

    const apiRequestBody={
            "model":"gpt-3.5-turbo",
            "messages":[
                systemMessage,
                ...apiMessage
            ]
        }

    await fetch("https://api.openai.com/v1/chat/completions",{
            method:"POST",
            headers:{
                "Authorization": "Bearer " + API_KEY,
                "Content-Type" : "application/json"
            },
            body:JSON.stringify(apiRequestBody)
            })
            .then((data)=>{
                return data.json()
            })
            .then((data)=>{
                // console.log(data)
                // console.log(data.choices[0].message.content)
                setMessages([
                    ...chatMessages,{
                        message:data.choices[0].message.content
                        ,sender:"ChatGPT"
                    }
                ])
                setTyping(false)
            })
    }
  return (
    <div>
        <div className='home m-9 h-9 '>
        <a href='/'>HOME</a>
        </div>
        <div style={{position:"relative", height:"500px",width:"700px", margin:"10px"}}>
            <MainContainer>
                <ChatContainer>
                    <MessageList
                        typingIndicator={typing ? <TypingIndicator content="Autobot is typing"/> : null}
                    >
                        {messages.map((message,i)=>{
                            if(i!=0){
                            return <Message key={i} model={message}/>
                            }
                        })}
                    </MessageList>
                    <MessageInput placeholder='type message here...' onSend={handleSend}/>
                </ChatContainer>
            </MainContainer>
        </div>
    </div>
  )
}

export default Chatbot