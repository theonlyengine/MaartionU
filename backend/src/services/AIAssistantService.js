const { GPT2LMHeadModel, GPT2Tokenizer, pipeline } = require('transformers');

const modelPath = "path_to_finetuned_model"; // Use your fine-tuned model here
const model = GPT2LMHeadModel.from_pretrained(modelPath);
const tokenizer = GPT2Tokenizer.from_pretrained(modelPath);
const aiAssistantPipeline = pipeline('text-generation', { model, tokenizer });

class AIAssistantService {
    static async generateRecommendation(userPreferences, interactionHistory) {
        const input = `User preferences: ${JSON.stringify(userPreferences)}. Interaction history: ${JSON.stringify(interactionHistory)}. Provide personalized learning recommendations.`;
        const response = await aiAssistantPipeline(input, { max_length: 150, num_return_sequences: 1 });
        return response[0].text;
    }

    static async answerQuestion(question) {
        const response = await aiAssistantPipeline(question, { max_length: 150, num_return_sequences: 1 });
        return response[0].text;
    }
}

module.exports = AIAssistantService;
