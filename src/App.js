import { useLayoutEffect, useState } from 'react';
import './App.css';


function App() {
    const [outPut, setOutPut] = useState('0');

    const getClickedBtn = (e) => {
        const clickedBtn = e.target.textContent === '÷' ? "/" : e.target.textContent;
        if (clickedBtn === 'AC') {
            setOutPut('0');
            return;
        } else if (clickedBtn === '=') {
            const parsedString = parseOutput(outPut);
            const computeResultStr = computeResult(parsedString);
            setOutPut(computeResultStr);
            return;
        }
        setOutPut((prev) => {
            if (prev === "0") {
                return clickedBtn;
            } else {
                return prev + clickedBtn;
            }
        });
    }

    const computeResult = (arrayToCalculate) => {

        // --- Perform a calculation expressed as an array of operators and numbers
        const operatorPrecedence = [{ '^': (a, b) => Math.pow(a, b) },
        { 'x': (a, b) => a * b, '/': (a, b) => a / b },
        { '+': (a, b) => a + b, '-': (a, b) => a - b }];
        let operatorFn;
        for (let operator of operatorPrecedence) {
            const newarrayToCalculate = [];
            for (let token of arrayToCalculate) {
                if (token in operator) {
                    operatorFn = operator[token];
                } else if (operatorFn) {
                    newarrayToCalculate[newarrayToCalculate.length - 1] =
                        operatorFn(newarrayToCalculate[newarrayToCalculate.length - 1], token);
                    operatorFn = null;
                } else {
                    newarrayToCalculate.push(token);
                }
            }
            arrayToCalculate = newarrayToCalculate;
        }
        return arrayToCalculate;
    }

    const parseOutput = (string) => {
        // --- Parse a calculation string into an array of numbers and operators
        const response = [];
        let token = '';
        for (const character of string) {
            if ('^x/+-'.includes(character)) {
                response.push(parseFloat(token), character);
                token = '';
            } else {
                token += character;
            }
        }
        if (token !== '') {
            response.push(parseFloat(token));
        }
        return response;
    }

    const reduceOneChar = () => {
        setOutPut(prev => {
            return prev.slice(0,-1);
        });
    }


    return (
        <div className='calculator'>
            <div className="calculator__output" onClick = {() => reduceOneChar()}>{outPut}</div>
            <div className="calculator__keys" onClick={(e) => getClickedBtn(e)}>
                <button className="calculator__key calculator__key--operator">+</button>
                <button className="calculator__key calculator__key--operator">-</button>
                <button className="calculator__key calculator__key--operator">x</button>
                <button className="calculator__key calculator__key--operator">÷</button>
                <button className="calculator__key">7</button>
                <button className="calculator__key">8</button>
                <button className="calculator__key">9</button>
                <button className="calculator__key">4</button>
                <button className="calculator__key">5</button>
                <button className="calculator__key">6</button>
                <button className="calculator__key">1</button>
                <button className="calculator__key">2</button>
                <button className="calculator__key">3</button>
                <button className="calculator__key">0</button>
                <button className="calculator__key">.</button>
                <button className="calculator__key">AC</button>
                <button className="calculator__key calculator__key--enter">=</button>
            </div>
        </div>
    )
}

export default App;
