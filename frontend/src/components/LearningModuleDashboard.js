import React from 'react';

const LearningModuleDashboard = ({ modules }) => {
    return (
        <div>
            <h2>Your Learning Modules</h2>
            <ul>
                {modules.map(module => (
                    <li key={module.id}>{module.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default LearningModuleDashboard;
