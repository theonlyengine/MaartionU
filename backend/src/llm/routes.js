const express = require('express');
const router = express.Router();
const { GPT2LMHeadModel, GPT2Tokenizer } = require('transformers');
const { pipeline } = require('transformers');

const modelPath = "path_to_save_finetuned_model";
const model = GPT2LMHeadModel.from_pretrained(modelPath);
const tokenizer = GPT2Tokenizer.from_pretrained(modelPath);
const chatbot = pipeline('text-generation', model=model, tokenizer=tokenizer);

router.post('/chat', async (req, res) => {
    const { userInput } = req.body;

    try {
        const response = await chatbot(userInput, max_length=50, num_return_sequences=1);
        res.json({ response: response[0].text });
    } catch (error) {
        console.error('Error with chatbot response:', error);
        res.status(500).json({ message: 'Error processing request' });
    }
});

module.exports = router;
