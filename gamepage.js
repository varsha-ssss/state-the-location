//Got help from https://www.geeksforgeeks.org/javascript/how-to-create-stopwatch-using-html-css-and-javascript/

// Get references to start/stop buttons
let startBtn = document.getElementById('start');
let stopBtn = document.getElementById('stop');
let nextBtn = document.getElementById('next');

// Timer variables - tracking hours, minutes, seconds, and centiseconds
let hour = 0;
let minute = 0;
let second = 0;
let count = 0; // Centiseconds (hundredths of a second)
let timer = false; // Controls whether timer is running

// Initialize game when page loads
window.onload = function() {
    startBtn.onclick = startButton;
    stopBtn.onclick = stopButton;
    showState(); // Display first random state
    startButton(); // Auto-start the timer
};

// Start the timer
function startButton() {
    timer = true;
    stopWatch();
    
    // Disable start button, enable stop button
    startBtn.disabled = true;
    stopBtn.disabled = false;
    
    // Enable all state buttons that haven't been clicked
    enableStateButtons();
}

// Stop the timer
function stopButton() {
    timer = false;
    
    // Enable start button, disable stop button
    startBtn.disabled = false;
    stopBtn.disabled = true;
    
    // Disable all state buttons
    disableStateButtons();
}

// Handles time overflow when seconds/minutes exceed 60
function fixTimeOverflow() {
    if (second >= 60) {
        minute = minute + Math.floor(second / 60);
        second = second % 60;
    }

    if (minute >= 60) {
        hour = hour + Math.floor(minute / 60);
        minute = minute % 60;
    }
}

// Main timer function - runs every 10ms
function stopWatch() {
    if (timer) {
        count++; // Increment centiseconds

        // Convert 100 centiseconds to 1 second
        if (count == 100) {
            second++;
            count = 0;
        }

        // Convert 60 seconds to 1 minute
        if (second == 60) {
            minute++;
            second = 0;
        }

        // Convert 60 minutes to 1 hour
        if (minute == 60) {
            hour++;
            minute = 0;
            second = 0;
        }

        // Format time values with leading zeros
        let hrString = hour;
        let minString = minute;
        let secString = second;
        let countString = count;

        if (hour < 10) {
            hrString = "0" + hrString;
        }

        if (minute < 10) {
            minString = "0" + minString;
        }

        if (second < 10) {
            secString = "0" + secString;
        }

        if (count < 10) {
            countString = "0" + countString;
        }

        // Update timer display on page
        document.getElementById('hr').innerHTML = hrString;
        document.getElementById('min').innerHTML = minString;
        document.getElementById('sec').innerHTML = secString;
        document.getElementById('count').innerHTML = countString;
        
        // Call this function again after 10ms
        setTimeout(stopWatch, 10);
    }
}

// Game variables
let output = "";
let statesList = ["Alabama", "Alaska", "Arizona", "Arkansas", 
"California", "Colorado", "Connecticut", "Delaware", "Florida", 
"Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", 
"Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", 
"Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", 
"Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", 
"North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", 
"Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", 
"Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];

// Tracks which states have been completed (true = not done, false = done)
let stateBoolean = [true, true, true, true, true, true, true, true, true, 
    true, true, true, true, true, true, true, true, true, true, true, 
	true, true, true, true, true, true, true, true, true, true, true, true, 
	true, true, true, true, true, true, true, true, true, true, true, true, 
	true, true, true, true, true, true];

let stateNum = Math.floor(Math.random() * 50); // Index of current target state
let completed = 0; // Number of states completed

// Displays a random uncompleted state
function showState()
{	
	// Check if any states are left to complete
	let anyLeft = false;
	for (let i = 0; i < stateBoolean.length; i++) {
		if (stateBoolean[i]) {
			anyLeft = true;
		}
	}
	
	// If all states are done, stop timer and go to congrats page
	if (!anyLeft) {
		stopButton();
		// Save the final time to session storage
		saveFinalTime(hour, minute, second);
		startBtn.disabled = true;
		stopBtn.disabled = true;
		nextBtn.disabled = false;
		document.getElementById("result").innerHTML = "<br>All states complete!";
		return;
	}
	
	// Pick a random uncompleted state
	stateNum = Math.floor(Math.random() * 50);
	while (stateBoolean[stateNum] == false) {
		stateNum = Math.floor(Math.random() * 50);
	}
	
	// Display the state name in the yellow box
	output = statesList[stateNum];		
	document.getElementById("result").innerHTML = "<br>" + output;
}

// Function to save final time to session storage
// Takes final time as parameters and stores them
// Inspiration from Mr. DeRuiter's saveImage.html
function saveFinalTime(finalHour, finalMinute, finalSecond) {
	// Store each time component in session storage
	sessionStorage.setItem('finalHour', finalHour);
	sessionStorage.setItem('finalMinute', finalMinute);
	sessionStorage.setItem('finalSecond', finalSecond);
}

// Handles clicks on state buttons on the map
// Main coding and structure done by us, error fixes done by Claude
function stateClicked(stateName, postalCode) {
	// Ignore clicks if timer is paused
	if (!timer) {
		return;
	}
	
	// Check if clicked state matches the target state
	if (statesList[stateNum] == stateName) {
		// Correct! Mark state as completed
		stateBoolean[stateNum] = false;
		
		// Update progress counter
		completed = completed + 1;
		document.getElementById("progress").innerHTML = completed + "/50";
		
		// Update progress bar width
		let percent = (completed / 50) * 100;
		document.getElementById("fill").style.width = percent + "%";
		
		// Find and update the clicked button
		let buttonClass = postalCode + "-button";
		let allButtons = document.getElementsByClassName("state-button"); //finds all elements with that class and stores them in a live HTMLCollection.
		
		// Loop through all buttons to find the matching one
		for (let i = 0; i < allButtons.length; i++) {
			let button = allButtons[i];
			
			// Check if this button matches the postal code
			if (button.className.indexOf(buttonClass) != -1) {
				button.innerHTML = postalCode; // Show postal code
				button.className = button.className + " clicked"; // Add clicked styling
				button.disabled = true; // Prevent further clicks
			}
		}
		
		// Show next random state
		showState();
		
	} 
	else {
		// Wrong! Add 3 second penalty
		second = second + 3;
		
		// Fix any time overflow from penalty
		fixTimeOverflow();
		
		// Flash the wrong button red
		let buttonClass = postalCode + "-button";
		let allButtons = document.getElementsByClassName("state-button"); //finds all elements with that class and stores them in a live HTMLCollection.
		
		// Find the button that was clicked
		for (let i = 0; i < allButtons.length; i++) {
			let button = allButtons[i];
			
			// Check if this is the clicked button
			if (button.className.indexOf(buttonClass) != -1) {
				// Turn red temporarily
				button.style.backgroundColor = "rgba(255, 0, 0, 0.6)"; //red-green-blue-alpha; controls transparency
				
				// Return to gray after 300ms
				setTimeout(function() {
					button.style.backgroundColor = "rgba(128, 128, 128, 0.6)";
				}, 300);
			}
		}
	}
}

// Enable all state buttons that haven't been completed
function enableStateButtons() {
	let allButtons = document.getElementsByClassName("state-button");
	
	for (let i = 0; i < allButtons.length; i++) {
		let button = allButtons[i];
		
		// Only enable if it hasn't been clicked correctly yet
		if (button.className.indexOf("clicked") == -1) {
			button.disabled = false;
		}
	}
}

// Disable all state buttons
function disableStateButtons() {
	let allButtons = document.getElementsByClassName("state-button");
	
	for (let i = 0; i < allButtons.length; i++) {
		allButtons[i].disabled = true;
	}
}

function nextClicked() {
	// Navigate to congrats page
	location.replace('congrats.html');
}
