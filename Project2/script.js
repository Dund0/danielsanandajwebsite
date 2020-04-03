$(function() { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.
    
    // Called function to update the name, happiness, and weight of our pet in our HTML
    checkAndUpdatePetInfoInHtml();
  
    // When each button is clicked, it will "call" function for that button (functions are below)
    $('.treat-button').click(clickedTreatButton);
    $('.play-button').click(clickedPlayButton);
    $('.exercise-button').click(clickedExerciseButton);
    $('.rest-button').click(clickedRestButton);
  

  
    
  })
  
    // Add a variable "pet_info" equal to a object with the name (string), weight (number), and happiness (number) of your pet
    var pet_info = {name:"Blorgo", weight: 15, happiness: 10, notification:"", button:""};
    var soundEffect = document.getElementById("soundEffect");

    function play() {
      soundEffect.play();
    }

    function clickedTreatButton() {
      // Increase pet happiness
      pet_info.happiness++;
      // Increase pet weight
      pet_info.weight+=2;
      //set notification
      pet_info.notification = "BLORGOOOOOOOOOOOOOO!";
      //set button
      pet_info.button = "treat"
      checkAndUpdatePetInfoInHtml();
    }
    
    function clickedPlayButton() {
      // Increase pet happiness
      pet_info.happiness++;
      // Decrease pet weight
      pet_info.weight-=0.5;
      //set notification
      pet_info.notification = "BLLLROOOOGO!";
      //set button
      pet_info.button = "play"
      checkAndUpdatePetInfoInHtml();
    }
    
    function clickedExerciseButton() {
      // Decrease pet happiness
      pet_info.happiness-=0.5;
      // Decrease pet weight
      pet_info.weight--;
      //set notification
      pet_info.notification = "BBBBBLORGO!";
      //set button
      pet_info.button = "exercise"
      checkAndUpdatePetInfoInHtml();
    }

    function clickedRestButton() {
      // Decrease pet happiness
      pet_info.happiness+=0.25;
      // Decrease pet weight
      pet_info.weight-=0.5;
      //set notification
      pet_info.notification = "blorg";
      //set button
      pet_info.button = "rest"
      checkAndUpdatePetInfoInHtml();
    }
  
    function checkAndUpdatePetInfoInHtml() {
      checkWeightAndHappinessBeforeUpdating();  
      updatePetInfoInHtml();
    }
    
    function checkWeightAndHappinessBeforeUpdating() {
      // Add conditional so if weight is lower than zero, set it back to zero
      if(pet_info.weight < 0) {
        pet_info.weight = 0;
      }
    }
    
    // Updates your HTML with the current values in your pet_info dictionary
    function updatePetInfoInHtml() {
      $('.name').text(pet_info['name']);
      $('.weight').text(pet_info['weight']);
      $('.happiness').text(pet_info['happiness']);
      $('.notification').text(pet_info['notification']);
      if(pet_info.button == "treat" || pet_info.button == "play") {
        document.getElementById("pet-image").src = "assets/gigaPetAnimation.gif"
      }
      else if (pet_info.button == "rest") {
        document.getElementById("pet-image").src = "assets/sleepingGIgaPet.png"
      }
      else {
        document.getElementById("pet-image").src = "assets/baseGigaPet.png"
      }
    }
  
