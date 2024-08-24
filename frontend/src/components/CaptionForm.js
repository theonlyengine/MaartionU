import React, { useState } from 'react';
import axios from 'axios';

const CaptionForm = () => {
    const [audioFile, setAudioFile] = useState(null);
    const [transcription, setTranscription] = useState('');

    const handleCaption = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('audioFile', audioFile);

        try {
            const response = await axios.post('/api/multilingual/caption', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setTranscription(response.data.transcription);
        } catch (error) {
            console.error('Error generating captions:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleCaption}>
                <input type="file" accept="audio/*" onChange={(e) => setAudioFile(e.target.files[0])} required />
                <button type="submit">Generate Captions</button>
            </form>
            {transcription && <div><h3>Transcription:</h3><p>{transcription}</p></div>}
        </div>
    );
};

export default CaptionForm;
