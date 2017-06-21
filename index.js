//Guessing game tutorial - opensourceseo.org
//author: dsottimano@gmail.com


// *******
// start custom function / formula
function GuessGame (guess) {
  var correctNumber = getRandomInt(1,5)
  guess = parseInt(guess)
  if (guess == correctNumber) {
    return "You guessed the number correctly! It was " + correctNumber 
  } else {
    return "Sorry, that's not the right number. It was " + correctNumber
  }
}
//**********
//end custom function / formula



//**********
//begin guessing game in apps script
var getRandomInt = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
} 

var userAnswerBox = function(msg,guessCount) {
  var msg = msg || "Welcome to the Guessing Game! Guess a number between 1 and 5"
  var response = SpreadsheetApp.getUi().prompt(msg, SpreadsheetApp.getUi().ButtonSet.OK_CANCEL)
  
  if (response.getSelectedButton() == SpreadsheetApp.getUi().Button.CANCEL || response.getSelectedButton() == SpreadsheetApp.getUi().Button.NO) return false
  
  var guessedNumber = parseInt(response.getResponseText())
  
  if (guessedNumber > 0 && guessedNumber < 6) {
    return guessedNumber
  }   
  else {    
    response = userAnswerBox("The number has to be between 1 and 5, try again")
  }
}

function guessingGame() {
  
  var correctNumber = getRandomInt(1,5),
      userAnswer = userAnswerBox(),
      guesses = 0
  
  try {
    
  if (!userAnswer) return Browser.msgBox("Fine then, I'll play by myself")
  
    while(guesses < 2) {
      if (!userAnswer) return Browser.msgBox("Fine then, I'll play by myself")
      
      if (correctNumber != userAnswer) {
        guesses++
         userAnswer = userAnswerBox("Guess again, you have " + (3 - guesses) + " left")
      } else { 
        return Browser.msgBox("You guessed correctly! The number is " + correctNumber)   
      }
      
    }
  }
  catch(e) {
    
    return Browser.msgBox("Error: ", e)
  }
  
  return Browser.msgBox("Sorry, you've run out of guesses! Next time...!")
}
//********** 
//end guessing game  



