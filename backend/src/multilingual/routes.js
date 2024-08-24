const express = require('express');
const router = express.Router();
const { TranslationPipeline, pipeline } = require('transformers');
const { WhisperForConditionalGeneration, WhisperProcessor } = require('transformers');
const { MBartForConditionalGeneration, MBartTokenizer } = require('transformers');

// Translation API using MarianMT or mBART
router.post('/translate', async (req, res) => {
    const { text, targetLang } = req.body;

    try {
        const modelName = `facebook/mbart-large-50-many-to-many-mmt`;
        const tokenizer = MBartTokenizer.from_pretrained(modelName);
        const model = MBartForConditionalGeneration.from_pretrained(modelName);
        const translation_pipeline = pipeline('translation', model=model, tokenizer=tokenizer);

        const translation = await translation_pipeline(text, target_lang=targetLang);
        res.json({ translation });
    } catch (error) {
        console.error('Error translating text:', error);
        res.status(500).json({ message: 'Error translating text' });
    }
});

// Captioning API using Whisper
router.post('/caption', async (req, res) => {
    const { audioFile } = req.body;

    try {
        const model = WhisperForConditionalGeneration.from_pretrained("openai/whisper-large-v2");
        const processor = WhisperProcessor.from_pretrained("openai/whisper-large-v2");

        const inputs = processor(audioFile, return_tensors="pt", sampling_rate=16000);
        const generated_ids = model.generate(inputs.input_ids);
        const transcription = processor.batch_decode(generated_ids, skip_special_tokens=True);

        res.json({ transcription });
    } catch (error) {
        console.error('Error generating captions:', error);
        res.status(500).json({ message: 'Error generating captions' });
    }
});

module.exports = router;
