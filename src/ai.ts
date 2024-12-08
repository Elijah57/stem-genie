import { GoogleGenerativeAI } from "@google/generative-ai";
import  {config, genAIConfig, safetySettings, sysInstruction } from "./config";

const genAI = new GoogleGenerativeAI(config.api_key);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: genAIConfig,
    safetySettings: safetySettings,
    systemInstruction: sysInstruction
});

async function genAIResponse(content: string){

    const prompt = `Provide a detailed and comprehensive response to the following input, not exceding 4000 charcters: ${content}. Depending on the nature of the input:

            If it’s a term or concept:

            Define and explain its meaning clearly.
            Include its origins or etymology (if applicable).
            Discuss its relevance, usefulness, and real-world applications.
            Provide specific details based on the context:
            For medical terms: causes, occurrences, symptoms, and treatments.
            For engineering or technical terms: applications, relationships, and practical uses.
            For programming terms: relatable explanations, use cases, and code examples if appropriate.
            If it’s a question:

            Answer directly and thoroughly, ensuring clarity and accuracy.
            Offer additional context, examples, or explanations to enhance understanding.
            If it’s an open-ended prompt or discussion topic:

            Explore it deeply, covering all relevant aspects, perspectives, and implications.
            Provide insightful and engaging commentary that educates and inspires.
            Your response should be well-detailed, engaging, and tailored to promote curiosity and understanding, especially for those interested in STEM fields.`
            ;
    
    const result = await model.generateContent(prompt);
    // console.log(result.response.candidates[0].safetyRatings);
    return result.response.text();
}

export default genAIResponse;