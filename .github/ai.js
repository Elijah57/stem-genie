"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const generative_ai_1 = require("@google/generative-ai");
const config_1 = require("../dist/config");
const genAI = new generative_ai_1.GoogleGenerativeAI(config_1.config.api_key);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: config_1.genAIConfig,
    safetySettings: config_1.safetySettings,
    systemInstruction: config_1.sysInstruction
});
function genAIResponse(content) {
    return __awaiter(this, void 0, void 0, function* () {
        const prompt = `Provide a detailed and comprehensive response to the following input: ${content}. Depending on the nature of the input:

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
            Your response should be well-detailed, engaging, and tailored to promote curiosity and understanding, especially for those interested in STEM fields.`;
        const result = yield model.generateContent(prompt);
        console.log(result.response.candidates[0].safetyRatings);
        return result.response.text();
    });
}
exports.default = genAIResponse;
