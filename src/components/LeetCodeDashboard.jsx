// LeetCodeDashboard.jsx
import React, { useState } from 'react';
import '../style/LeetCodeDashboard.css';




const LeetCodeDashboard = () => {
    const [username, setUsername] = useState('');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (username.trim() === '') {
            alert('Username should not be empty');
            return;
        }

        const regex = /^[a-zA-Z0-9_]{3,16}$/;
        if (!regex.test(username)) {
            alert('Invalid username');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
            if (!response.ok) {
                throw new Error('Unable to fetch user data');
            }
            const parsedData = await response.json();
            setData(parsedData);
        } catch (error) {
            alert('Failed to fetch user details');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h1>LeetCode Metrics Dashboard</h1>
            <div className="user-input-container">
                <input
                    type="text"
                    id="user-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter LeetCode Username"
                />
                <button
                    id="search-button"
                    onClick={handleSearch}
                    disabled={loading}
                    className={loading ? 'animate' : ''}
                >
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </div>
            {data && (
                <div className="metrics-container">
                    <div className="additional-info">
                        <p><strong>Total Solved:</strong> {data.totalSolved}</p>
                        <p><strong>Acceptance Rate:</strong> {data.acceptanceRate}%</p>
                        <p><strong>Ranking:</strong> #{data.ranking}</p>
                    </div>
                    <div className="progress">
                        <div className="circle" style={{ '--progress-degree': `${(data.easySolved / data.totalEasy) * 100}%` }}>
                            <span>{data.easySolved}/{data.totalEasy}</span>
                        </div>
                        <p className="caption">Easy</p>
                        <div className="circle" style={{ '--progress-degree': `${(data.mediumSolved / data.totalMedium) * 100}%` }}>
                            <span>{data.mediumSolved}/{data.totalMedium}</span>
                        </div>
                        <p className="caption">Medium</p>
                        <div className="circle" style={{ '--progress-degree': `${(data.hardSolved / data.totalHard) * 100}%` }}>
                            <span>{data.hardSolved}/{data.totalHard}</span>
                        </div>
                        <p className="caption">Hard</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LeetCodeDashboard;
