import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LocalizedContent = ({ text }) => {
    const [translatedText, setTranslatedText] = useState('');
    const [targetLanguage, setTargetLanguage] = useState('en'); // Default to English

    useEffect(() => {
        const translateText = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.post('/api/localization/translate', {
                text,
                targetLanguage,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTranslatedText(response.data.translatedText);
        };

        if (text && targetLanguage) {
            translateText();
        }
    }, [text, targetLanguage]);

    return (
        <div>
            <p>{translatedText || text}</p>
        </div>
    );
};

export default LocalizedContent;
