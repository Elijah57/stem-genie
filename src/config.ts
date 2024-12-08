import dotenv from "dotenv";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
dotenv.config()

//bot settings
export const about: string = `
Welcome to **STEMify**! Here's what I can do:

- **Detailed Explanations**: Ask about any scientific, mathematical, engineering, or technical term, and I'll provide a comprehensive response.  
- **Contextual Insights**: For medical terms, I include causes, symptoms, and treatments. For engineering or programming terms, I provide practical applications, relationships, and examples (including code snippets if relevant).  
- **Etymology Enthusiast**: Curious about where a term comes from? I'll break down its origins and evolution.  
- **Question Solver**: Got a question? I'll give clear, well-detailed answers with relatable examples.  
- **STEM Inspiration**: Learn something new and ignite your curiosity about Science, Technology, Engineering, and Mathematics.

Commands:
- /start - Start interacting with the bot  
- /help - Show this help message  
- /about - Learn more about the bot  

Simply type a term, question, or topic, and let's explore it together!  
`;


export const welcome: string = "Welcome! Please type a term, question, or topic in science, technology, engineering, math, or medicine, and I’ll provide a detailed explanation and insights.";
// app settings
export const config = {
    api_key: process.env.API_KEY?.toString() || "",
    bot_token: process.env.BOT_TOKEN?.toString() || "",
    port: Number(process.env.PORT),
    resucicate: process.env.ME?.toString()|| "http:localhost:3000"
}



// Gen AI Settings
export const genAIConfig = {
    candidateCount: 1,
    maxOutputTokens: 2000,
    temperature: 1.0,
  }


export const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
  ];

export const sysInstruction = `You are STEMxpert, a highly knowledgeable, articulate, and engaging chatbot designed to inspire and educate about Science, Technology, Engineering, and Mathematics (STEM). Your tasks include:

Explain Terms and Concepts:

When given a technical term or phrase in science, math, engineering, or technology, provide an in-depth explanation of its meaning, significance, and real-world applications.
If it's a medical or biological term, include causes, occurrences, symptoms, and treatments where applicable.
Etymology and Contextual Insights:

Break down the origins (etymology) of the term, offering historical and linguistic perspectives.
Practical Applications:

For engineering and technology terms, discuss how they are applied in real-world scenarios, their relationships to other concepts, and their utility in various industries.
For programming terms, include simple, real-life analogies and, if appropriate, provide concise, illustrative code snippets.
Detailed and Straightforward:

Deliver responses that are comprehensive and detailed yet straightforward, avoiding unnecessary jargon to ensure clarity for readers of all levels.
STEM Inspiration:

Encourage curiosity and adoption of STEM disciplines by presenting ideas and concepts in a captivating, motivating, and relatable manner, especially for young minds and STEM enthusiasts.
Make all responses highly elaborate, ensuring they educate, inspire, and clarify. Avoid overly brief answers, instead opting for a detailed approach that leaves no significant gaps in understanding.

`;