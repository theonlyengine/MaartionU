const { GPT2LMHeadModel, GPT2Tokenizer, pipeline } = require('transformers');

const modelPath = "path_to_finetuned_model"; // Path to your fine-tuned LLM model
const model = GPT2LMHeadModel.from_pretrained(modelPath);
const tokenizer = GPT2Tokenizer.from_pretrained(modelPath);
const llmPipeline = pipeline('text-generation', model=model, tokenizer=tokenizer);

class LLMService {
    static async generateFeedback(progress) {
        const input = `Provide feedback based on the following progress: ${progress.progressPercentage}% completed, scores: ${progress.quizScores.map(score => `Quiz ${score.quiz}: ${score.score}`).join(', ')}`;
        const feedbackResponse = await llmPipeline(input, max_length=100, num_return_sequences=1);
        return feedbackResponse[0].text;
    }

    static async generateScore(progress) {
        const input = `Calculate a score based on the following progress: ${progress.progressPercentage}% completed, scores: ${progress.quizScores.map(score => `Quiz ${score.quiz}: ${score.score}`).join(', ')}`;
        const scoreResponse = await llmPipeline(input, max_length=10, num_return_sequences=1);
        return parseInt(scoreResponse[0].text, 10);
    }
}

module.exports = LLMService;
