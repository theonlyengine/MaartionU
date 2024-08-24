import React, { useEffect } from 'react';

const VoiceCommands = () => {
    useEffect(() => {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event) => {
            const command = event.results[0][0].transcript.toLowerCase();
            if (command.includes('start')) {
                // Trigger some action
                alert('Starting your journey!');
            }
        };

        recognition.start();

        return () => recognition.stop();
    }, []);

    return <div>Listening for voice commands...</div>;
};

export default VoiceCommands;
