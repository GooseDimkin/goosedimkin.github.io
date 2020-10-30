"use strict"

document.addEventListener('DOMContentLoaded', () => {
    let userScore = 0;
    let computerScore = 0;
    const userScore_span = document.getElementById('user-score');
    const computerScore_span = document.getElementById('computer-score');
    const scoreBoard_div = document.querySelector('.score-board');
    const result_p = document.querySelector('.result > p');
    const rock_div = document.getElementById('r');
    const paper_div = document.getElementById('p');
    const scissors_div = document.getElementById('s');

    function getComputerChoice() {
        const choices = ['r', 'p', 's'];
        const randomNumber = Math.floor(Math.random() * 3);

        return choices[randomNumber];
    }

    function convertToWord(letter) {
        if(letter == 'r') return 'Rock';
        if(letter == 'p') return 'Paper';
        if(letter == 's') return 'Scissors';
    }

    function win(userChoice, computerChoice) {
        userScore++;
        userScore_span.innerHTML = userScore;

        result_p.innerHTML = convertToWord(userChoice) + ' beats ' + convertToWord(computerChoice) + '.<br \/>' + ' You win!';
        document.getElementById(userChoice).classList.add('green-glow');
        setTimeout(function() { document.getElementById(userChoice).classList.remove('green-glow') }, 300);
    }

    function lose(userChoice, computerChoice) {
        computerScore++;
        computerScore_span.innerHTML = computerScore;

        result_p.innerHTML = convertToWord(userChoice) + ' loses to ' + convertToWord(computerChoice) + '.<br \/>' + ' Computer wins!';
        document.getElementById(userChoice).classList.add('red-glow');
        setTimeout(function() { document.getElementById(userChoice).classList.remove('red-glow') }, 300);
    }

    function draw(userChoice, computerChoice) {
        result_p.innerHTML = convertToWord(userChoice) + ' beats ' + convertToWord(computerChoice) + '.<br \/>' + ' Draw!';
        document.getElementById(userChoice).classList.add('gray-glow');
        setTimeout(function() { document.getElementById(userChoice).classList.remove('gray-glow') }, 300)
    }

    function game(userChoice) {
        const computerChoice = getComputerChoice();

        switch(userChoice + computerChoice) {
            case 'pr':
            case 'rs':
            case 'sp':
                win(userChoice, computerChoice);
                break;
            case 'rp':
            case 'sr':
            case 'ps':
                lose(userChoice, computerChoice);
                break;
            case 'rr':
            case 'ss':
            case 'pp':
                draw(userChoice, computerChoice);
                break;
        }
    }

    function main() {
        rock_div.addEventListener('click', function(){
            game('r');
        });
    
        paper_div.addEventListener('click', function(){
            game('p');
        });
    
        scissors_div.addEventListener('click', function(){
            game('s');
        });
    }

    main();
}) 