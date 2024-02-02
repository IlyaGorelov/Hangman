function Welcome() {
    let result = confirm("Здравствуйте!\nХотели бы вы ознакомиться с правилами?");
    if (result) {
        alert("Загадывается слово, на экране выводятся закрытые буквы");
        alert("Cлово - имя существительное, нарицательное в именительном падеже единственного числа, либо множественного числа при отсутствии у слова формы единственного числа.");
        alert("Игрок предлагает букву, которая может входить в это слово. Если такая буква есть в слове, то буква открывается столько раз, сколько она встречается в слове. Если такой буквы нет, то к виселице добавляется элемент.");
        alert("Игра продолжается до тех пор, пока не будет отгадано слово или не будет дорисована виселица");
    }
}
function Restart() {
    window.location.href = "gameWithoutWelcome.html"
}

let countOfSteps = 11;
let canDoAlert = false;
function changeStep() {
    document.getElementById('countOfSteps').textContent = 'Осталось ходов: ' + String(countOfSteps);
}
let stringForWords = `феникс
прожектор
дыня
загадка
альфонс
манеж
горилла
плод
алебастр
видеокассета
девушка
прапор
вывеска
плечо
кузнец
эскадрон
ложе
женьшень
завеса
автопокрышка
копоть
кость
кружево
бутон
афганец
бацилла
роща
сыр
жук
плотина
бильярд
мотоцикл
тоннель
пруд
комок
хвоя
жид
завет
перо
крона
вакса
бляха
видеозапись
пиво
массаж
мегафон
кат
подвал
кукушка
храм
голень
муляж
джем
дракон
знак
ствол
кабель
салфетка
трибуна
восток
рама
Исландия
студия
катер
австралия
пергамент
колготки
пудель
паспорт
акведук
заяц
барак
вешалка
можжевельник
подкова
накипь
заместитель
монокль
кандалы
патрон
позвонок
мундир
дуло
корень
ампула
джунгли
наковальня
медь
кисточка
фасад
клин
автобус
озеро
Египет
кайма
камыш
кувшин
винт
нектар
вал`;
let words = stringForWords.split('\n');
let wrong = [];
let rand;
let isRight = false;
function getLength() //Создает длину случайного слова
{
    let max = words.length;
    rand = Math.floor(Math.random() * (max - 0 + 1) + 0);
    if (rand < 0 || rand === words.length)
        rand = 0;
    return words[rand].length;
}
function createLetters(rand) //Создает ячейки для букв
{
    for (let i = 0; i < rand; i++)
        document.getElementById('word').innerHTML += `<button id="let${i}">?</button>`;
}
function check() {
    let isAllLettersOpened = true;
    let isRight = false;
    let letter = document.getElementById('input').value;
    letter = String(letter).toUpperCase();
    if (letter != '') {
        word = words[rand];
        word = word.toUpperCase();
        console.log(word);
        for (let i = 0; i < word.length; i++) {
            if (word[i] == letter) {
                document.getElementById(`let${i}`).textContent = letter; //Открыает букву если она угадана
                isRight = true;
            }
            if (document.getElementById(`let${i}`).textContent == '?')
                isAllLettersOpened = false;
        }
        if (!isRight && countOfSteps != 0 && !wrong.includes(letter)) {
            isRight = true
            countOfSteps -= 1;
            changeStep();
            wrong.push(letter);
            document.getElementById('wrongLetters').innerHTML += `<s>${letter}</s>` + ' ';
            document.getElementById('image').innerHTML = `<img src="img/img${10 - countOfSteps}.png" alt="Виселица">`;
        }
        else if (wrong.includes(letter)) {
            alert("Такая буква уже была");
        }
        else if (countOfSteps == 0) //Проигрыш
        {
            document.getElementById("win").src = "lose.png";
            document.getElementById("win").style.visibility = 'visible';
            document.getElementById("Answer").textContent = `Ответ: ${words[rand]}`;
        }
        document.getElementById('input').value = '';

        if (isAllLettersOpened) //Победа
        {

            document.getElementById("win").style.visibility = 'visible';
        }
    }
    else {
        alert('Вы не ввели букву');
    }
}

function index() {
    alert("До свидания!!");
    window.location.href = "index.html"
}

let randWordLength = getLength();
changeStep();
createLetters(randWordLength);
