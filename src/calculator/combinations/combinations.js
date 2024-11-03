import React, { useEffect, useState } from 'react'
import { displayNumber } from '../utils'
import './combinations.css'

const Combinations = ({ combinations }) => {
    const [test, setTest] = useState(0)
    const { data, totalStake, selectedNum } = combinations
    const stakePerComb = displayNumber(totalStake / data.length)

    useEffect(() => {
        let localStorageWinning = localStorage.getItem('maxWin')
        setTest(localStorageWinning)
    }, [data])

    const displayFields = (events, index) => {
        let localStorageWinning = parseFloat(localStorage.getItem('maxWin'))
        const lostEvent = events.some(item => item.result === 'l');
        const totOdds = lostEvent ? 0 : events
            .filter(item => item.result !== 'v')
            .reduce((odds, item) => odds * item.odds, 1);
    
        const winnings = totOdds * stakePerComb;
        localStorage.setItem('maxWin', localStorageWinning + winnings);
        return (
            <React.Fragment>
                <td>{displayNumber(totOdds)}</td>
                <td>{stakePerComb}</td>
                <td className={totOdds ? 'w' : 'l'} data-testid={`comb-${index}`}>{displayNumber(winnings)}</td>
            </React.Fragment>
        )

    }

    return (
        <div className='container'>
            <div data-testid="max-win">Max possible winnings: {displayNumber(test)}</div>
            <table className='combination-table'>
                <thead>
                    <tr className="header-row">
                        <th className="th" style={{ width: '5%' }}>#</th>
                        <th className="th" colSpan={selectedNum} style={{ textAlign: 'center' }}>Events</th>
                        <th className="th" >Odds</th>
                        <th className="th" >Stake</th>
                        <th className="th" >Winnings</th>
                    </tr>
                </thead>
                <tbody>{
                    data.map((eventsArray, index) => (
                        <tr key={`comb-${index}`} >
                            <td>{index + 1}</td>
                            {
                                eventsArray.map((event, eventIndex) => (
                                    <td key={`event-${eventIndex}`} className={event.result}>
                                        <div>{event.name}</div>
                                        <div>{event.odds}</div>
                                    </td>
                                ))
                            }
                            {displayFields(eventsArray, index)}
                        </tr>

                    ))
                }
                </tbody>
            </table>
        </div>)
}

export default Combinations