import React from 'react';
import './style.css';

function TechnicalSupport() {
    return (
        <div className="technical-support">
            <h3>Technical Support</h3>
            <div className="support-content">
                <p>NEW ACCOUNTS SINCE 2018</p>
                <p>78% +14</p>
                <div className="graph">
                    {/* Graph image or component */}
                </div>
                <div className="sales-progress">
                    <p>Total Orders: $1896</p>
                    <p>Last year expenses</p>
                    <p>YoY Growth: 100%</p>
                </div>
            </div>
        </div>
    );
}

export default TechnicalSupport;