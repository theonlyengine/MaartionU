import React, { useState } from 'react';
import axios from 'axios';

const TranslationForm = () => {
    const [text, setText] = useState('');
    const [targetLang, setTargetLang] = useState('fr'); // Default to French
    const [translation, setTranslation] = useState('');

    const handleTranslate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/multilingual/translate', { text, targetLang });
            setTranslation(response.data.translation);
        } catch (error) {
            console.error('Error translating text:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleTranslate}>
                <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text for translation" required />
                <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
                    <option value="fr">French</option>
                    <option value="es">Spanish</option>
                    <option value="de">German</option>
                    {/* Add more language options here */}
                </select>
                <button type="submit">Translate</button>
            </form>
            {translation && <div><h3>Translation:</h3><p>{translation}</p></div>}
        </div>
    );
};

export default TranslationForm;
