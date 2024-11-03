import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EventsContainer from './events/events';
import Combinations from './combinations/combinations';
import { getCombinations } from './utils'

describe('Bet Calculator', () => {
    test('correct input handling', () => {
        const handleChange = jest.fn();

        render(<EventsContainer handleCompute={handleChange} />);

        const oddsInput = screen.getByTestId('oddInput-0');
        const stakeInput = screen.getByTestId('stakeInput');

        //valid
        fireEvent.change(oddsInput, { target: { value: '2.00' } });
        fireEvent.blur(oddsInput)
        expect(oddsInput.value).toBe('2.00');

        //invalid
        fireEvent.change(oddsInput, { target: { value: 'hello2' } });
        fireEvent.blur(oddsInput)
        expect(oddsInput.value).toBe('2.00');

        //negative stake
        fireEvent.change(stakeInput, { target: { value: '-10' } });
        fireEvent.blur(stakeInput)
        expect(stakeInput.value).toBe('100.00');

        //negative odd
        fireEvent.change(oddsInput, { target: { value: '-10' } });
        fireEvent.blur(oddsInput)
        expect(oddsInput.value).toBe('2.00');

        //no odd
        fireEvent.change(oddsInput, { target: { value: '' } });
        fireEvent.blur(oddsInput)
        expect(oddsInput.value).toBe('2.00');
    });

    test('combination accuracy', () => {
        const combinations = getCombinations([1, 2, 3], 2);
        expect(combinations).toEqual([[1, 2], [1, 3], [2, 3]]);

        const combinations2 = getCombinations([1, 2, 3, 4], 3);
        expect(combinations2).toEqual([[1, 2, 3], [1, 2, 4], [1, 3, 4], [2, 3, 4]]);
    });

    test('Payout calculation all win', () => {

        //all win
        const data = [[
            { name: '1', odds: '2.00', result: 'w' },
            { name: '2', odds: '2.00', result: 'w' },
        ],
        [
            { name: '1', odds: '2.00', result: 'w' },
            { name: '3', odds: '2.00', result: 'w' },
        ],
        [
            { name: '2', odds: '2.00', result: 'w' },
            { name: '3', odds: '2.00', result: 'w' },
        ],
        ]

        render(<Combinations combinations={{ data, totalStake: 100, selectedNum: 2 }} />);
        const comb1 = screen.getByTestId('comb-0');
        const comb2 = screen.getByTestId('comb-1');
        const comb3 = screen.getByTestId('comb-2');
        expect(comb1.textContent).toBe('133.32');
        expect(comb2.textContent).toBe('133.32')
        expect(comb3.textContent).toBe('133.32')

    })

    test('Payout calculation all lost', () => {
        //all bets lost
        const data = [[
            { name: '1', odds: '2.00', result: 'l' },
            { name: '2', odds: '2.00', result: 'l' },
        ],
        [
            { name: '1', odds: '2.00', result: 'l' },
            { name: '3', odds: '2.00', result: 'l' },
        ],
        [
            { name: '2', odds: '2.00', result: 'l' },
            { name: '3', odds: '2.00', result: 'l' },
        ],
        ]

        render(<Combinations combinations={{ data: data, totalStake: 100, selectedNum: 2 }} />);
        const comb1 = screen.getByTestId('comb-0');
        const comb2 = screen.getByTestId('comb-1');
        const comb3 = screen.getByTestId('comb-2');
        expect(comb1.textContent).toBe('0.00');
        expect(comb2.textContent).toBe('0.00')
        expect(comb3.textContent).toBe('0.00')
    })

    test('Payout calculation partial win', () => {
        //all bets lost
        const data = [[
            { name: '1', odds: '2.00', result: 'l' },
            { name: '2', odds: '2.00', result: 'w' },
        ],
        [
            { name: '1', odds: '2.00', result: 'l' },
            { name: '3', odds: '2.00', result: 'w' },
        ],
        [
            { name: '2', odds: '2.00', result: 'w' },
            { name: '3', odds: '2.00', result: 'w' },
        ],
        ]

        render(<Combinations combinations={{ data: data, totalStake: 100, selectedNum: 2 }} />);
        const comb1 = screen.getByTestId('comb-0');
        const comb2 = screen.getByTestId('comb-1');
        const comb3 = screen.getByTestId('comb-2');
        expect(comb1.textContent).toBe('0.00');
        expect(comb2.textContent).toBe('0.00')
        expect(comb3.textContent).toBe('133.32')
    })

    test('System handling test, edge case no win ', () => {
        localStorage.setItem('maxWin', 0)

        //all bets lost
        const data = [[
            { name: '1', odds: '2.00', result: 'l' },
            { name: '2', odds: '2.00', result: 'l' },
        ],
        [
            { name: '1', odds: '2.00', result: 'l' },
            { name: '3', odds: '2.00', result: 'l' },
        ],
        [
            { name: '2', odds: '2.00', result: 'l' },
            { name: '3', odds: '2.00', result: 'l' },
        ],
        ]

        render(<Combinations combinations={{ data: data, totalStake: 100, selectedNum: 2 }} />);
        const comb1 = screen.getByTestId('max-win');
        expect(comb1.textContent).toBe('Max possible winnings: 0.00');
    })

    test('System handling test, edge case all bets win ', () => {
        localStorage.setItem('maxWin', 0)

        //all bets lost
        const data = [[
            { name: '1', odds: '2.00', result: 'w' },
            { name: '2', odds: '2.00', result: 'w' },
        ],
        [
            { name: '1', odds: '2.00', result: 'w' },
            { name: '3', odds: '2.00', result: 'w' },
        ],
        [
            { name: '2', odds: '2.00', result: 'w' },
            { name: '3', odds: '2.00', result: 'w' },
        ],
        ]

        render(<Combinations combinations={{ data: data, totalStake: 100, selectedNum: 2 }} />);
        const comb1 = screen.getByTestId('max-win');
        expect(comb1.textContent).toBe('Max possible winnings: 399.96');
    })
});
