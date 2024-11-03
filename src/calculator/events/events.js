import React, { useState } from 'react';
import { systemBets, initialEventForm, resultRadioOptions, checkNumber } from '../utils';
import './events.css'; 

const EventsContainer = ({ handleCompute }) => {
    const [events, setEvents] = useState(Array.from({ length: 3 }, (_, index) => (initialEventForm(index))));
    const [stake, setStake] = useState(100)
    const [selectedNum, setSelectedNum] = useState(2)

    const handleOddsBlur = (index) => {
        const newEvents = [...events];
        let value = checkNumber(newEvents[index].odds, 2)
        newEvents[index].odds = value
        setEvents(newEvents);
    };

    const handleSelectChange = (value) => {
        const [combNum, eventsNum] = value.split('out of')
        setEvents(Array.from({ length: parseInt(eventsNum) }, (_, index) => (initialEventForm(index))))
        setSelectedNum(parseInt(combNum))
    }

    const handleChange = (index, value, name) => {
        const newEvents = [...events];
        newEvents[index][name] = value
        setEvents(newEvents);
    }

    const handleStakeOnBlue = () => {
        let value = checkNumber(stake, 100)
        setStake(value)
    }
    return (
        <div className="container" style={{ maxWidth: '600px' }}>
            <div className='top-bar'>
                <div className='select-container'>
                    <label htmlFor="system-bet-select">System Bet:</label>
                    <select id="system-bet-select" className="styled-select" onChange={e => handleSelectChange(e.target.value)}>
                        {Object.keys(systemBets).map(outNumber => (
                            <optgroup label={`${outNumber} events`} key={outNumber}>
                                {systemBets[outNumber].map(bet => (
                                    <option key={bet} value={bet}>
                                        {bet}
                                    </option>
                                ))}
                            </optgroup>
                        ))}
                    </select>
                </div>
                <div className='stake-container'>
                    <label>Total Stake:</label>
                    <input data-testid="stakeInput" onBlur={handleStakeOnBlue} className='stake-input' name="stake" value={stake} onChange={(e) => setStake(e.target.value)} />
                </div>
            </div>


            <table className="events-table">
                <thead>
                    <tr className="header-row">
                        <th className="th" style={{ width: '50%' }}>Event Name</th>
                        <th className="th" style={{ width: '25%', textAlign: 'center' }}>Odds</th>
                        <th className="th" style={{ width: '25%', textAlign: 'center' }}>Result</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event, eventIndex) => (
                        <tr key={eventIndex} className={`row ${eventIndex}`}>
                            <td className="td">
                                {event.name}
                            </td>
                            <td className="td" style={{ textAlign: 'center' }}>
                                <input
                                    data-testid={`oddInput-${eventIndex}`}
                                    type="text"
                                    value={event.odds}
                                    onChange={(e) => handleChange(eventIndex, e.target.value, 'odds')}
                                    className="input"
                                    onBlur={() => handleOddsBlur(eventIndex)}
                                />
                            </td>
                            <td className="td" style={{ textAlign: 'center', display: 'flex' }}>
                                {resultRadioOptions.map((option) => (
                                    <div key={`${event.value}-${option.value}`} className="radio-option">
                                        <input
                                            type="radio"
                                            id={`radio-${option.value}-${eventIndex}`}
                                            name={`radioGroup ${event.name}`}
                                            value={option.value}
                                            checked={event.result === option.value}
                                            onChange={() => handleChange(eventIndex, option.value, 'result')}
                                        />
                                        <label className={`radio-label radio-${option.value}`} htmlFor={`radio-${option.value}-${eventIndex}`}>
                                            {option.label}
                                        </label>
                                    </div>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button className='compute-btn' disabled={!stake} onClick={() => handleCompute(selectedNum, stake, events)}>Compute</button>
        </div>
    );
};

export default EventsContainer;
