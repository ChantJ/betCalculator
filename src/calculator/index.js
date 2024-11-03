import React, { useState } from 'react';
import EventsContainer from './events/events';
import { getCombinations } from './utils';
import Combinations from './combinations/combinations';
import "./style.css"
const Calculator = () => {
    const [combinations, setCombinations] = useState({ data: [], totalStake: 100, selectedNum: 2 })
    const handleCompute = (selectedNum, stake, events) => {
        const combs = getCombinations(events, selectedNum)
        setCombinations({ data: combs, totalStake: stake, selectedNum })
        localStorage.setItem('maxWin', 0)
    }

    return (
        <div>
            <EventsContainer handleCompute={handleCompute} />
            {combinations.data.length > 0 && <Combinations combinations={combinations} />}
        </div>
    )
}
export default Calculator