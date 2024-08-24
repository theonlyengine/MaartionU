import React, { useState } from 'react';

const LanguageSelector = ({ onLanguageChange }) => {
    const [selectedLanguage, setSelectedLanguage] = useState('en');

    const handleLanguageChange = (e) => {
        setSelectedLanguage(e.target.value);
        onLanguageChange(e.target.value);
    };

    return (
        <div>
            <label htmlFor="language-select">Choose your language:</label>
            <select id="language-select" value={selectedLanguage} onChange={handleLanguageChange}>
    <option value="en">English</option>
    <option value="es">Spanish</option>
    <option value="fr">French</option>
    <option value="de">German</option>
    <option value="zh">Chinese</option>
    <option value="ar">Arabic</option>
    <option value="ru">Russian</option>
    <option value="pt">Portuguese</option>
    <option value="ja">Japanese</option>
    <option value="ko">Korean</option>
    <option value="it">Italian</option>
    <option value="nl">Dutch</option>
    <option value="sv">Swedish</option>
    <option value="no">Norwegian</option>
    <option value="da">Danish</option>
    <option value="fi">Finnish</option>
    <option value="el">Greek</option>
    <option value="he">Hebrew</option>
    <option value="tr">Turkish</option>
    <option value="pl">Polish</option>
    <option value="cs">Czech</option>
    <option value="hu">Hungarian</option>
    <option value="ro">Romanian</option>
    <option value="th">Thai</option>
    <option value="vi">Vietnamese</option>
    <option value="id">Indonesian</option>
    <option value="ms">Malay</option>
    <option value="tl">Tagalog</option>
    <option value="bn">Bengali</option>
    <option value="ur">Urdu</option>
    <option value="fa">Persian</option>
    <option value="uk">Ukrainian</option>
    <option value="hi">Hindi</option>
    <option value="mr">Marathi</option>
    <option value="ta">Tamil</option>
    <option value="te">Telugu</option>
    <option value="kn">Kannada</option>
    <option value="ml">Malayalam</option>
    <option value="pa">Punjabi</option>
    <option value="gu">Gujarati</option>
    <option value="am">Amharic</option>
    <option value="sw">Swahili</option>
    <option value="yo">Yoruba</option>
    <option value="ig">Igbo</option>
    <option value="ha">Hausa</option>
    <option value="zu">Zulu</option>
    <option value="xh">Xhosa</option>
    <option value="so">Somali</option>
    <option value="km">Khmer</option>
    <option value="lo">Lao</option>
    <option value="my">Burmese</option>
    <option value="si">Sinhala</option>
    <option value="jv">Javanese</option>
    <option value="su">Sundanese</option>
    <option value="fil">Filipino</option>
    <option value="ne">Nepali</option>
    <option value="ps">Pashto</option>
    <option value="tg">Tajik</option>
    <option value="kk">Kazakh</option>
    <option value="uz">Uzbek</option>
    <option value="mn">Mongolian</option>
    <option value="ky">Kyrgyz</option>
    <option value="tk">Turkmen</option>
    <option value="si">Sinhalese</option>
    <option value="rw">Kinyarwanda</option>
    <option value="lg">Ganda</option>
    <option value="ny">Nyanja</option>
    <option value="gn">Guarani</option>
    <option value="ht">Haitian Creole</option>
    <option value="qu">Quechua</option>
    <option value="ay">Aymara</option>
    <option value="sm">Samoan</option>
    <option value="to">Tongan</option>
    <option value="mi">Maori</option>
    <option value="st">Southern Sotho</option>
    <option value="tn">Tswana</option>
    <option value="ve">Venda</option>
    <option value="ts">Tsonga</option>
    <option value="ss">Swazi</option>
    <option value="tk">Turkmen</option>
    <option value="dv">Divehi</option>
    <option value="ln">Lingala</option>
    <option value="mg">Malagasy</option>
    <option value="sn">Shona</option>
    <option value="bi">Bislama</option>
    <option value="fj">Fijian</option>
    <option value="to">Tongan</option>
    <option value="haw">Hawaiian</option>

            </select>
        </div>
    );
};

export default LanguageSelector;
