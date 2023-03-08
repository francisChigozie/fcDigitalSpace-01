   /*
    GAME FUNCTION
    - Player must guess a number between min and max
    - Player gets a certain amount of guesses
    - Notify player of guesses remaining
    - Notify the player of the current answer if loose
    - Let Player choose to play again
    */

            //Game values
            let min = 1,
                max = 10,
                winningNum = getRandomNum(min, max),
                guessesLeft = 3;

            //UI Elements
            const playAgain = document.querySelector('#game'),
                minNum = document.querySelector('.min-num'),
                maxNum = document.querySelector('.max-num'),
                guessBtn = document.querySelector('#guess-btn'),
                guessInput = document.querySelector('#guess-input'),
                message = document.querySelector('.message');

            //Asign UI min and max
            minNum.textContent = min;
            maxNum.textContent = max;

            //Play Again event listener
            playAgain.addEventListener('mousedown', function (e) {
                if (e.target.className === 'play-again') {
                    window.location.reload();
                }
            })

            //Listen for guess
            guessBtn.addEventListener('click', function () {
                let guess = parseInt(guessInput.value)

                //Validate  the input guess
                if (isNaN(guess) || guess < min || guess > max) {
                    //Change border color
                    guessInput.style.borderColor = 'yellow';
                    setMessage(`Please enter a number between ${min} and ${max}`, 'yellow')
                } else {
                    //Check if won
                    if (guess === winningNum) {
                        //Game Over = WON
                        gameOver(true, `YOU WIN ! The number ${winningNum} is correct`)
                    } else {
                        //Wrong number
                        guessesLeft -= 1;
                        if (guessesLeft === 0) {
                            //game Over = LOST
                            gameOver(false, `Game Over ! The correct number was ${winningNum}`)
                        } else {
                            //Change border color
                            guessInput.style.borderColor = 'red';
                            //Clear Input
                            guessInput.value = '';
                            //Game continues - answer wrong
                            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red')
                        }
                    }
                }

            })

            //Game Over
            function gameOver(won, msg) {
                let color;
                won === true ? color = 'gold' : color = 'red';
                //Disable input
                guessInput.disabled = true;
                //Change border color
                guessInput.style.borderColor = color;
                //Set text color
                message.style.color = color;
                //Set message
                setMessage(msg)

                //Play Again
                guessBtn.value = 'Play Again';
                guessBtn.className += 'play-again';
            }

            //Get Winning Number
            function getRandomNum(min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min)
            }

            //Set Massage
            function setMessage(msg, color) {
                message.style.color = color;
                message.textContent = msg;
            }