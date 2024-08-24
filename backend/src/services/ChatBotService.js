const { Configuration, OpenAIApi } = require('openai');

class ChatbotService {
    constructor() {
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        this.openai = new OpenAIApi(configuration);
    }

    async askQuestion(question) {
        const response = await this.openai.createChatCompletion({
            model: 'gpt-3.5-turbo',  // You can choose the specific model or use an equivalent from Hugging Face
            messages: [{ role: 'system', content: 'You are a helpful assistant for an educational platform.' }, { role: 'user', content: question }],
            max_tokens: 150,
        });
        return response.data.choices[0].message.content;
    }
}

module.exports = ChatbotService;
