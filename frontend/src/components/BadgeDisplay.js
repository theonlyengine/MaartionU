import React from 'react';

const BadgeDisplay = ({ badges }) => {
    return (
        <div>
            <h3>Your Badges</h3>
            <ul>
                {badges.map((badge) => (
                    <li key={badge._id}>
                        <h4>{badge.title}</h4>
                        <p>{badge.description}</p>
                        {badge.iconUrl && <img src={badge.iconUrl} alt={badge.title} />}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BadgeDisplay;
