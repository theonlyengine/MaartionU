const axios = require('axios');

class LocalizationService {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.apiUrl = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0';
    }

    async translate(text, targetLanguage) {
        const response = await axios.post(this.apiUrl, [{
            text: text,
        }], {
            headers: {
                'Ocp-Apim-Subscription-Key': this.apiKey,
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Region': 'your-region',
            },
            params: {
                to: targetLanguage,
            },
        });

        return response.data[0].translations[0].text;
    }
}

module.exports = LocalizationService;
