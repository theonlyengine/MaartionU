import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CertificationDashboard = () => {
    const [certifications, setCertifications] = useState([]);

    useEffect(() => {
        const fetchCertifications = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get('/api/certifications/user-certifications', config);
            setCertifications(response.data);
        };
        fetchCertifications();
    }, []);

    const handleMintNFT = async (certificationId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('/api/certifications/mint-nft', { certificationId }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('NFT minted successfully!');
            setCertifications(certifications.map(cert => 
                cert._id === certificationId ? response.data : cert
            ));
        } catch (error) {
            console.error('Error minting NFT:', error);
        }
    };

    return (
        <div>
            <h2>Your Certifications</h2>
            <ul>
                {certifications.map(certification => (
                    <li key={certification._id}>
                        <h3>{certification.course.title}</h3>
                        <p>Issued on: {new Date(certification.issueDate).toLocaleDateString()}</p>
                        <p>Blockchain: {certification.blockchain}</p>
                        <p>Certification Hash: {certification.certificationHash}</p>
                        {certification.nftTokenId ? (
                            <p>NFT Token ID: {certification.nftTokenId}</p>
                        ) : (
                            <button onClick={() => handleMintNFT(certification._id)}>Mint NFT</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CertificationDashboard;
