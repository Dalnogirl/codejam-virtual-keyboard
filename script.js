let textarea = document.createElement('textarea');
document.body.insertBefore(textarea, document.querySelector('script'));
let symbolCounter = 1;
let _this;
class Claviature {
    constructor() {
        this.buttonsRu = [
            ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
            ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Delete'],
            ['CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'],
            ['Shift', '\\', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '/', '^', 'Shift'],
            ['Control', 'Win', 'Alt', 'Space', 'Alt', 'Control', '<', '|', '>']
        ];
        this.buttonsEng = [
            ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
            ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Delete'],
            ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'],
            ['Shift', '\\', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '^', 'Shift'],
            ['Control', 'Win', 'Alt', 'Space', 'Alt', 'Control', '<', '|', '>']
        ];
        this.numSymbolsRus = ['!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', ''];
        this.numSymbolEng = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', ''];
        this.pressedSet = new Set();
    }


    create() {
        _this = this;
        console.log(typeof this.pressedSet)
        let a = symbolCounter % 2 === 1 ? this.buttonsRu : this.buttonsEng;

        if (document.querySelectorAll('.row').length !== 0) {
            for (let i = 0; i < 5; i++) {
                document.body.removeChild(document.querySelector('.row'))
            }
        }

        for (let i = 0; i < 5; i++) {
            let row = document.createElement('div');
            row.classList.add('row');
            document.body.insertBefore(row, document.querySelector('script'));

            for (let k = 0; k < a[i].length; k++) {
                let button = document.createElement('div');
                let arg = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].includes(a[i][k]) ? 'n' + a[i][k] : a[i][k].toLowerCase();
                button.classList.add("button", arg);
                button.innerHTML = a[i][k];
                button.addEventListener('mousedown', _this.typing)
                row.append(button);

                if (i === 0 && k > 0 && k < 13) {
                    let topSymbol = document.createElement('div');
                    topSymbol.classList.add('top-symbol')
                    let symbolArr = symbolCounter % 2 === 1 ? _this.numSymbolsRus : _this.numSymbolEng;
                    topSymbol.innerHTML = symbolArr[k - 1]
                    console.log(symbolCounter)
                    button.append(topSymbol)

                }
            }
        }
        symbolCounter++;
    }


    press(e) {
        if (e.key === ' ') {
            document.querySelector('.space').classList.add('pressed');
        } else if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].includes(e.key)) {
            document.querySelector(`.n${e.key}`).classList.add('pressed');
        } else if (Array.from(document.querySelectorAll('.top-symbol')).map(i => i = i.innerHTML).includes(e.key)) {
            let m = Array.from(document.querySelectorAll('.top-symbol')).map(i => i = i.innerHTML).indexOf(e.key)
            let buttons = document.querySelectorAll('.button')
            buttons[m + 1].classList.add('pressed');
        } else {
            document.querySelector(`.${e.key.toLowerCase()}`).classList.add('pressed');
        }



        _this.pressedSet.add(e.code);
        for (let code of ['ShiftLeft', 'AltLeft']) {
            if (!_this.pressedSet.has(code)) return;
        }

        _this.pressedSet.clear();

        _this.create();

        textarea.addEventListener('keyup', function (event) {
            _this.pressedSet.delete(event.code);
        });
    }

    unpress(e) {
        if (e.key === ' ') {
            document.querySelector('.space').classList.remove('pressed');
        } else if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].includes(e.key)) {
            document.querySelector(`.n${e.key}`).classList.remove('pressed');
        } else if (Array.from(document.querySelectorAll('.top-symbol')).map(i => i = i.innerHTML).includes(e.key)) {
            let m = Array.from(document.querySelectorAll('.top-symbol')).map(i => i = i.innerHTML).indexOf(e.key)
            let buttons = document.querySelectorAll('.button')
            buttons[m + 1].classList.remove('pressed');
        } else {
            document.querySelector(`.${e.key.toLowerCase()}`).classList.remove('pressed');
        }

    }

    typing() {
        if (this.innerHTML === '|' | this.innerHTML === '^') {
            return
        }
        else if (this.innerHTML.length === 1) {
            textarea.value += this.innerHTML;
        }
        else if (this.innerHTML === 'Backspace') {
            textarea.value = textarea.value.slice(0, -1);
        }
        else if (this.innerHTML === 'Space') {
            textarea.value += ' ';
        } else if (this.innerHTML === 'Enter') {
            textarea.value += '\n'
        } else if (this.innerHTML.length > 12) {
            textarea.value += this.innerHTML.split('>')[0][0]
            console.log(this.innerHTML.split('>'))
        }

    }




}

let clav = new Claviature();
clav.create()
textarea.onkeydown = textarea.onkeypress = clav.press;
textarea.onkeyup = clav.unpress;






