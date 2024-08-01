import React from 'react';
import './style.css';
import PortfolioPerformance from './Performance';
import TechnicalSupport from './Support';
import TimelineExample from './TimelineExample';

function Balans() {
    return (
        <div className="dashboard">
            <PortfolioPerformance />
            <div className="content_balans">
                <TechnicalSupport />
                <TimelineExample />
            </div>
        </div>
    );
}

export default Balans;