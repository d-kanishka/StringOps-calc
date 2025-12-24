
let input = '';
let result = '0';
let is2ndMode = false;
let isRadiansMode = false;
let memory = 0;
let isStringMode = false;
let string2Visible = false;

const inputDisplay = document.getElementById('inputDisplay');
const resultDisplay = document.getElementById('resultDisplay');
const modeText = document.getElementById('modeText');
const toggleBtn = document.getElementById('toggleBtn');
const calcMode = document.getElementById('calcMode');
const stringMode = document.getElementById('stringMode');


function toggleMode() {
    isStringMode = !isStringMode;
    if (isStringMode) {
        calcMode.style.display = 'none';
        stringMode.classList.add('active');
        toggleBtn.textContent = 'Calc';
        modeText.style.visibility = 'hidden';
    } else {
        calcMode.style.display = 'block';
        stringMode.classList.remove('active');
        toggleBtn.textContent = 'String';
        modeText.style.visibility = 'visible';
    }
}


function toggleString2() {
    string2Visible = !string2Visible;
    const section = document.getElementById('string2Section');
    const text = document.getElementById('addStringText');
    if (string2Visible) {
        section.style.display = 'block';
        text.textContent = '- Remove String 2';
    } else {
        section.style.display = 'none';
        text.textContent = '+ Add String 2';
        document.getElementById('string2').value = '';
    }
}

function stringOp(operation) {
    const str1 = document.getElementById('string1').value;
    const str2 = document.getElementById('string2').value;
    const startIdx = parseInt(document.getElementById('startIndex').value) || 0;
    const endIdx = document.getElementById('endIndex').value;
    const findTxt = document.getElementById('findText').value;
    const replaceTxt = document.getElementById('replaceText').value;
    const resultDiv = document.getElementById('stringResult');

    let result = '';

    switch(operation) {
        case 'cat':
            result = str1 + str2;
            break;
        case 'cat+':
            const sep = prompt('Enter separator:', ' ') || ' ';
            result = str1 + sep + str2;
            break;
        case 'lower':
            result = str1.toLowerCase();
            break;
        case 'upper':
            result = str1.toUpperCase();
            break;
        case 'length':
            result = `Length: ${str1.length}`;
            break;
        case 'reverse':
            result = str1.split('').reverse().join('');
            break;
        case 'anagram':
            result = str1.split('').sort().join('');
            break;
        case 'substring':
            const end = endIdx ? parseInt(endIdx) : str1.length;
            result = str1.substring(startIdx, end);
            break;
        case 'replace':
            if (findTxt) {
                result = str1.replaceAll(findTxt, replaceTxt);
            } else {
                result = 'Please enter text to find';
            }
            break;
        case 'clear':
            document.getElementById('string1').value = '';
            document.getElementById('string2').value = '';
            document.getElementById('startIndex').value = '0';
            document.getElementById('endIndex').value = '';
            document.getElementById('findText').value = '';
            document.getElementById('replaceText').value = '';
            result = 'Cleared';
            break;
        default:
            result = 'Unknown operation';
    }

    resultDiv.textContent = result;
}


function updateDisplay() {
    inputDisplay.textContent = input || '';
    resultDisplay.textContent = result;
}


function handleButton(value) {
    if (value === 'AC') {
        input = '';
        result = '0';
    } else if (value === 'DEL') {
        input = input.slice(0, -1);
    } else if (value === '=') {
        if (input) {
            try {
                result = evaluateExpression(input);
            } catch (e) {
                result = 'Error';
            }
        }
    } else if (value === '+/-') {
        input = toggleSign(input);
    } else if (value === '2nd') {
        is2ndMode = !is2ndMode;
        updateButtonLabels();
    } else if (value === 'π') {
        input += 'π';
    } else if (value === 'e') {
        input += 'e';
    } else if (value === 'eˣ') {
        input += 'e^(';
    } else if (['sin', 'cos', 'tan', 'sinh', 'cosh', 'tanh',
               'sin⁻¹', 'cos⁻¹', 'tan⁻¹', 'sinh⁻¹', 'cosh⁻¹', 'tanh⁻¹',
               'ln', 'log', 'log₂', '√', '∛'].includes(value)) {
        input += value + '(';
    } else if (value === 'x²') {
        input += '^2';
    } else if (value === 'x³') {
        input += '^3';
    } else if (value === 'xʸ' || value === 'yˣ') {
        input += '^';
    } else if (value === '1/x') {
        input += '1/(';
    } else if (value === '10ˣ') {
        input += '10^(';
    } else if (value === '2ˣ') {
        input += '2^(';
    } else if (value === 'ʸ√x') {
        input += 'ʸ√x(,)';
    } else if (value === 'logᵧ') {
        input += 'logᵧ(,)';
    } else if (value === 'x!') {
        input += '!';
    } else if (value === 'EE') {
        input += '𝐄';
    } else if (value === 'mc') {
        memory = 0;
    } else if (value === 'm+') {
        memory += parseFloat(result) || 0;
    } else if (value === 'm-') {
        memory -= parseFloat(result) || 0;
    } else if (value === 'mr') {
        input += memory.toString();
    } else if (value === 'Rand') {
        input += Math.random().toFixed(6);
    } else if (value === 'Rad' || value === 'Deg') {
        isRadiansMode = !isRadiansMode;
        modeText.textContent = isRadiansMode ? 'RAD' : 'DEG';
    } else {
        input += value;
    }
    updateDisplay();
}


function updateButtonLabels() {
    document.getElementById('secondBtn').classList.toggle('second-mode', is2ndMode);
    document.getElementById('expBtn').textContent = is2ndMode ? 'yˣ' : 'eˣ';
    document.getElementById('powerBtn').textContent = is2ndMode ? '2ˣ' : '10ˣ';
    document.getElementById('lnBtn').textContent = is2ndMode ? 'logᵧ' : 'ln';
    document.getElementById('logBtn').textContent = is2ndMode ? 'log₂' : 'log';
    document.getElementById('sinBtn').textContent = is2ndMode ? 'sin⁻¹' : 'sin';
    document.getElementById('cosBtn').textContent = is2ndMode ? 'cos⁻¹' : 'cos';
    document.getElementById('tanBtn').textContent = is2ndMode ? 'tan⁻¹' : 'tan';
    document.getElementById('sinhBtn').textContent = is2ndMode ? 'sinh⁻¹' : 'sinh';
    document.getElementById('coshBtn').textContent = is2ndMode ? 'cosh⁻¹' : 'cosh';
    document.getElementById('tanhBtn').textContent = is2ndMode ? 'tanh⁻¹' : 'tanh';
}


function toggleSign(exp) {
    if (!exp) return exp;
    const regex = /(-?\d+\.?\d*)$/;
    const match = exp.match(regex);
    if (match) {
        const num = match[0];
        const toggled = num.startsWith('-') ? num.substring(1) : '-' + num;
        return exp.substring(0, match.index) + toggled;
    }
    return exp;
}


function toRadians(degrees) {
    return isRadiansMode ? degrees : degrees * (Math.PI / 180);
}

function fromRadians(radians) {
    return isRadiansMode ? radians : radians * (180 / Math.PI);
}


function evaluateExpression(exp) {
    if (exp.includes('𝐄')) return exp;
    let sanitized = exp
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, Math.PI.toString())
        .replace(/e(?!xp)/g, Math.E.toString());
    
    sanitized = processScientificFunctions(sanitized);
    sanitized = processPowerFunctions(sanitized);
    sanitized = processSpecialFunctions(sanitized);
    
    const tokens = [];
    let currentNumber = '';
    
    for (let i = 0; i < sanitized.length; i++) {
        const char = sanitized[i];
        if (char === ' ') continue;
        if ('+-*/%^!'.includes(char)) {
            if (currentNumber) {
                tokens.push(parseFloat(currentNumber));
                currentNumber = '';
            }
            tokens.push(char);
        } else {
            currentNumber += char;
        }
    }
    if (currentNumber) tokens.push(parseFloat(currentNumber));
    
  
    let i = 0;
    while (i < tokens.length) {
        if (tokens[i] === '^') {
            tokens.splice(i - 1, 3, Math.pow(tokens[i - 1], tokens[i + 1]));
        } else {
            i++;
        }
    }
    

    i = 0;
    while (i < tokens.length) {
        if (tokens[i] === '!') {
            const left = tokens[i - 1];
            if (left < 0 || left !== Math.floor(left)) throw new Error('Factorial error');
            let factorial = 1;
            for (let j = 2; j <= left; j++) factorial *= j;
            tokens.splice(i - 1, 2, factorial);
        } else {
            i++;
        }
    }
    
    i = 0;
    while (i < tokens.length) {
        if (tokens[i] === '*' || tokens[i] === '/' || tokens[i] === '%') {
            const left = tokens[i - 1];
            const right = tokens[i + 1];
            const op = tokens[i];
            let value;
            if (op === '*') value = left * right;
            else if (op === '/') value = left / right;
            else value = left % right;
            tokens.splice(i - 1, 3, value);
        } else {
            i++;
        }
    }
    
    
    let val = tokens[0];
    for (let i = 1; i < tokens.length; i += 2) {
        const op = tokens[i];
        const next = tokens[i + 1];
        if (op === '+') val += next;
        else if (op === '-') val -= next;
    }
    
    return val === Math.floor(val) ? val.toString() : val.toString();
}

function processScientificFunctions(exp) {
    let processed = exp;
    const functions = {
        'sin⁻¹': x => { if (x < -1 || x > 1) throw new Error(); return fromRadians(Math.asin(x)); },
        'cos⁻¹': x => { if (x < -1 || x > 1) throw new Error(); return fromRadians(Math.acos(x)); },
        'tan⁻¹': x => fromRadians(Math.atan(x)),
        'sinh⁻¹': x => Math.log(x + Math.sqrt(x * x + 1)),
        'cosh⁻¹': x => { if (x < 1) throw new Error(); return Math.log(x + Math.sqrt(x * x - 1)); },
        'tanh⁻¹': x => { if (x <= -1 || x >= 1) throw new Error(); return 0.5 * Math.log((1 + x) / (1 - x)); },
        'sin': x => Math.sin(toRadians(x)),
        'cos': x => Math.cos(toRadians(x)),
        'tan': x => Math.tan(toRadians(x)),
        'sinh': x => (Math.exp(x) - Math.exp(-x)) / 2,
        'cosh': x => (Math.exp(x) + Math.exp(-x)) / 2,
        'tanh': x => (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x)),
        'ln': x => { if (x <= 0) throw new Error(); return Math.log(x); },
        'log₂': x => { if (x <= 0) throw new Error(); return Math.log(x) / Math.log(2); },
        'log': x => { if (x <= 0) throw new Error(); return Math.log(x) / Math.log(10); },
        '√': x => { if (x < 0) throw new Error(); return Math.sqrt(x); },
        '∛': x => x < 0 ? -Math.pow(-x, 1/3) : Math.pow(x, 1/3)
    };
    for (const [name, func] of Object.entries(functions)) {
        processed = processFunction(processed, name, func);
    }
    return processed;
}

function processFunction(exp, name, func) {
    let result = exp;
    const maxIter = 10;
    for (let iter = 0; iter < maxIter; iter++) {
        const start = result.indexOf(name + '(');
        if (start === -1) break;
        let openCnt = 1, end = start + name.length + 1;
        while (end < result.length && openCnt > 0) {
            if (result[end] === '(') openCnt++;
            if (result[end] === ')') openCnt--;
            end++;
        }
        if (openCnt === 0) {
            try {
                const inner = result.substring(start + name.length + 1, end - 1);
                const val = parseFloat(evaluateExpression(inner));
                const funcRes = func(val);
                if (isNaN(funcRes) || !isFinite(funcRes)) throw new Error();
                result = result.substring(0, start) + funcRes + result.substring(end);
            } catch {
                return 'Error';
            }
        } else break;
    }
    return result;
}

function processPowerFunctions(exp) {
    let result = exp;
    result = result.replace(/(\d+\.\d+)\^\(([^)]+)\)/g, (m, b, e) => {
        try {
            const base = parseFloat(b);
            const exp = parseFloat(evaluateExpression(e));
            return Math.abs(base - Math.E) < 0.000001 ? Math.exp(exp).toString() : Math.pow(base, exp).toString();
        } catch { return m; }
    });
    result = result.replace(/10\^\(([^)]+)\)/g, (m, e) => {
        try { return Math.pow(10, parseFloat(evaluateExpression(e))).toString(); } catch { return m; }
    });
    result = result.replace(/2\^\(([^)]+)\)/g, (m, e) => {
        try { return Math.pow(2, parseFloat(evaluateExpression(e))).toString(); } catch { return m; }
    });
    return result;
}

function processSpecialFunctions(exp) {
    let result = exp;
    result = result.replace(/logᵧ\(([^,]+),([^)]+)\)/g, (m, b, v) => {
        try {
            const base = parseFloat(evaluateExpression(b));
            const val = parseFloat(evaluateExpression(v));
            if (val <= 0 || base <= 0 || base === 1) throw new Error();
            return (Math.log(val) / Math.log(base)).toString();
        } catch { return 'Error'; }
    });
    result = result.replace(/ʸ√x\(([^,]+),([^)]+)\)/g, (m, r, v) => {
        try {
            const root = parseFloat(evaluateExpression(r));
            const val = parseFloat(evaluateExpression(v));
            if (root === 0) throw new Error();
            if (val < 0 && root % 2 === 0) throw new Error();
            return Math.pow(val, 1 / root).toString();
        } catch { return 'Error'; }
    });
    return result;
}

// Keyboard Support
document.addEventListener('keydown', (e) => {
    const keyMap = {
        '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
        '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
        '+': '+', '-': '-', '*': '×', '/': '÷',
        '.': '.', 'Enter': '=', 'Escape': 'AC',
        'Backspace': 'DEL', '%': '%'
    };
    if (keyMap[e.key]) {
        e.preventDefault();
        handleButton(keyMap[e.key]);
    }
});

updateDisplay();