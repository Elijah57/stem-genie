import TelegramBot from "node-telegram-bot-api";
import  {about, config, welcome} from "./config";
import genAIResponse from "./ai";
import { GoogleGenerativeAIResponseError } from "@google/generative-ai";


const bot = new TelegramBot(config.bot_token, {polling: true});

bot.onText(/\/start/, (msg: TelegramBot.Message)=>{
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, welcome, {parse_mode: "Markdown"})
})

bot.onText(/\/help|\/about/, (msg: TelegramBot.Message) => {
    const chatId = msg.chat.id;
    const helpText = about;
    bot.sendMessage(chatId, helpText, { parse_mode: "Markdown" });
});

// bot.on("message", async (msg: TelegramBot.Message)=>{
//     const chatId = msg.chat.id;
//     const userInput = msg.text;

//     if (userInput?.startsWith("/")){
//         return ;
//     }

//     if (userInput){
//         // const sentMessage = await bot.sendMessage(chatId, "Bot is generating a response", {parse_mode: "Markdown"});
//         try{

//             await bot.sendChatAction(chatId, "typing");
//             let response = await genAIResponse(userInput);
//             // console.log(response)
//             // await bot.editMessageText(response, {chat_id: chatId, message_id: sentMessage.message_id})
//             await bot.sendMessage(chatId, response, {parse_mode: "Markdown"});
       
//         }catch(error){
//             if (error instanceof GoogleGenerativeAIResponseError){
//                 const response = "Content is unsafe"
//                 await bot.sendMessage(chatId, response)
//             }
//             // console.log("Error", error)
//         }     
//     }
// });


bot.on("message", async (msg: TelegramBot.Message) => {
    const chatId = msg.chat.id;
    const userInput = msg.text;

    // Ignore commands starting with "/"
    if (userInput?.startsWith("/")) {
        return;
    }

    if (userInput) {
        const sentMessage = await bot.sendMessage(chatId, "Bot is generating a response...", { parse_mode: "Markdown" });

        try {
            
            await bot.sendChatAction(chatId, "typing");

            
            const response = await genAIResponse(userInput);
            console.log("AI Response:", response);

            const textChunks = splitMessage(response);
                textChunks.forEach(chunk => {
                    bot.sendMessage(chatId, chunk, { parse_mode: 'Markdown' });
                });

            
        } catch (error) {
            // Handle errors specifically for unsafe content
            if (error instanceof GoogleGenerativeAIResponseError) {
                const response = "The content provided is deemed unsafe. Please try asking something else.";
                await bot.editMessageText(response, {
                    chat_id: chatId,
                    message_id: sentMessage.message_id,
                    parse_mode: "Markdown",
                });
            } else {
                // Generic error handling and logging
                console.error("Error processing user input:", error);
                await bot.editMessageText("An error occurred while processing your request. Please try again later.", {
                    chat_id: chatId,
                    message_id: sentMessage.message_id,
                    parse_mode: "Markdown",
                });
            }
        }
    }
});


function splitMessage(text, chunkSize = 4000) {
    const chunks = [];
    for (let i = 0; i < text.length; i += chunkSize) {
        chunks.push(text.slice(i, i + chunkSize));
    }
    return chunks;
}

// Usage

