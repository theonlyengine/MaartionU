import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateProjectForm = ({ courseId }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [members, setMembers] = useState([]);
    const [selectedMembers, setSelectedMembers] = useState([]);

    useEffect(() => {
        const fetchMembers = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(`/api/collaboration/course/${courseId}/members`, config);
            setMembers(response.data);
        };
        fetchMembers();
    }, [courseId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('/api/collaboration/create-project', {
                title,
                description,
                courseId,
                dueDate,
                memberIds: selectedMembers,
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTitle('');
            setDescription('');
            setDueDate('');
            setSelectedMembers([]);
            alert('Project created successfully!');
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Project Title" required />
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Project Description" required />
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
            <label>Select Members:</label>
            <select multiple value={selectedMembers} onChange={(e) => setSelectedMembers([...e.target.selectedOptions].map(option => option.value))}>
                {members.map((member) => (
                    <option key={member._id} value={member._id}>{member.name}</option>
                ))}
            </select>
            <button type="submit">Create Project</button>
        </form>
    );
};

export default CreateProjectForm;
