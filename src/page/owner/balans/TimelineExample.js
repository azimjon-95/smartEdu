import React from 'react';
import './style.css';

function TimelineExample() {
    return (
        <div className="timeline-example">
            <h3>Timeline Example</h3>
            <ul>
                <li>All Hands Meeting</li>
                <li>Yet another one, at 15:00 PM</li>
                <li>Build the production release</li>
                <li>Something not important</li>
                {/* Add more timeline items here */}
            </ul>
            <button className="view-messages-btn">View All Messages</button>
        </div>
    );
}

export default TimelineExample;