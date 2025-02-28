let gameSeq = [];
let userSeq = [];
let btnColors = ['red', 'green', 'purple', 'yellow'];

let start = false;
let level = 0;

let h2 = document.querySelector('h2');
let body = document.querySelector('body');

document.addEventListener('keypress', function() {
    if(start === false)
    {
        start = true;
        
        levelUp();
    }
})

function gameFlash(btn)
{
    btn.classList.add('gameFlash');
    setTimeout(function() {
        btn.classList.remove('gameFlash');
    }, 250);
}

function userFlash(btn)
{
    btn.classList.add('userFlash');
    setTimeout(function() {
        btn.classList.remove('userFlash');
    }, 250);
}

function gameOverFlash()
{
    body.classList.add('gameOver')
    setTimeout(function() {
        body.classList.remove('gameOver')
    }, 300);
}

function checkAns(idx)
{
    if(userSeq[idx] === gameSeq[idx])
    {
        if(userSeq.length === gameSeq.length)
        {
            setTimeout(levelUp, 1000);
        }
        
    }
    else
    {
        h2.innerHTML = `Game over! Your score was <b> ${level} <b> <br> Press any key to start.`;
        gameOverFlash()
        reset();
    }
}

function levelUp()
{
    userSeq = []; // reseting the sequence.
    level++;
    h2.innerText = `Level ${level}`;

    // generate random button.
    let randomIdx = Math.floor(Math.random()*3);
    let randomColor = btnColors[randomIdx];
    let randomBtn = document.querySelector(`.${randomColor}`);
    gameFlash(randomBtn);

    // add to game sequence.
    gameSeq.push(randomColor);
    console.log(gameSeq);
}

function btnPress()
{
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute('id');
    // add to user sequence.
    userSeq.push(userColor);
    console.log(userSeq);

    checkAns(userSeq.length-1);
}

let allButtons = document.querySelectorAll('.btn');

for (btn of allButtons)
{
    btn.addEventListener('click', btnPress);
}

function reset()
{
    gameSeq = [];
    userSeq = [];
    start = false;
    level = 0;
}