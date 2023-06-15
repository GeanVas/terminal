const options = document.querySelectorAll('.terminal-option input');

options.forEach(option => {
    option.addEventListener('change', () => {
        options.forEach(option => {
            option.checked = false;
            option.parentElement.classList.remove('active');
        });
        option.checked = true;
        option.parentElement.classList.add('active');
    });
});

const container = document.querySelector('.terminal-container');
const newLineTemplate = document.querySelector('#new-line-template');
const filesTemplate = document.querySelector('#files-template');
let inputs = document.querySelectorAll('input');

const files = [ 'about', 'contact', 'projects', 'skills' ];

const commands = {
    'ls': () => {
        const newLine = newLineTemplate.content.cloneNode(true);
        const fileContainer = filesTemplate.content.cloneNode(true).firstElementChild;
        files.forEach(file => {
            const fileElement = document.createElement('span');
            fileElement.classList.add('terminal-file');
            fileElement.textContent = file;
            fileContainer.appendChild(fileElement);
        });
        container.appendChild(fileContainer);
        container.appendChild(newLine);
        return;
    },
    'clear': () => {
        container.innerHTML = '';
        const newLine = newLineTemplate.content.cloneNode(true);
        container.appendChild(newLine);
        return;
    }
};

inputs.forEach(input => {
    input.addEventListener('keydown', onEnter);
});

function onEnter(e) {
    if (e.key !== 'Enter') return;

    const input = e.target;
    input.classList.remove('active');

    const command = input.value;
    
    if (commands[command]) {
        if (typeof commands[command] === 'function') {
            commands[command]();
        }
    } else {
        const newLine = newLineTemplate.content.cloneNode(true);
        const file = commands[command].content.cloneNode(true);
        newLine.querySelector('.terminal-line').appendChild(file);
        container.appendChild(newLine);
    }
    inputs = document.querySelectorAll('input');
    const newInput = inputs[inputs.length - 1];
    newInput.addEventListener('keydown', onEnter);
    newInput.classList.add('active');
    newInput.focus();
}