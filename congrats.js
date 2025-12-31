// Run when page loads
window.onload = function() {
	// Get time from session storage
	let finalHour = parseInt(sessionStorage.getItem('finalHour')) || 0;
	let finalMinute = parseInt(sessionStorage.getItem('finalMinute')) || 0;
	let finalSecond = parseInt(sessionStorage.getItem('finalSecond')) || 0;
	
	// Call the function with actual parameters
	displayCongratulations(finalHour, finalMinute, finalSecond);
	
	// Trigger confetti animation
	launchConfetti();
};

/* This function takes in parameters, uses an array, has a loop,
and an if or if-else. */
// Function to display congratulations message with final time
// Takes final time as parameters and formats the congratulations message
function displayCongratulations(finalHour, finalMinute, finalSecond) {
	// Array of congratulatory messages
	let messages = [
		"Congratulations!",
		"Amazing Work!",
		"You Did It!",
		"Perfect Score!",
		"Excellent Job!",
		"Outstanding!",
		"Incredible!"
	];
	
	// Pick a random congratulations message using a loop
	let randomMessage = "";
	let randomIndex = Math.floor(Math.random() * messages.length);
	for (let i = 0; i < messages.length; i++) {
		if (i === randomIndex) {
			randomMessage = messages[i];
			break;
		}
	}
	
	// Format the time strings with leading zeros using if statements
	let hourStr = finalHour;
	let minStr = finalMinute;
	let secStr = finalSecond;
	
	if (finalHour < 10) {
		hourStr = "0" + finalHour;
	}
	
	if (finalMinute < 10) {
		minStr = "0" + finalMinute;
	}
	
	if (finalSecond < 10) {
		secStr = "0" + finalSecond;
	}
	
	// Create the final time string
	let timeString = hourStr + ":" + minStr + ":" + secStr;
	
	// Display the congratulations message and time
	document.getElementById("congratsMessage").innerHTML = randomMessage;
	document.getElementById("finalTime").innerHTML = timeString;
}

// Play the song when button is clicked
function playSong() {
	// get the audio element from the page
	let song = document.getElementById("song");
	// start playing the audio
	song.play();
}

// Navigate to play again (game page)
function playAgain() {
	location.replace('gamepage.html');
}

// Navigate to home page
function goHome() {
	location.replace('index.html');
}


// Launch confetti animation
// Code from https://codepen.io/murtazajafari/pen/eYNrWgd
function launchConfetti() {
	// set timer for 5 seconds
	var end = Date.now() + (5 * 1000);
	
	// choose confetti colors: pink, light yellow, white
	var colors = ['#FF69B4', '#FDF8B6', '#FFFFFF'];
	
	// start the animation loop
	(function frame() {
		// left side confetti burst
		confetti({
			particleCount: 5,     // 5 particles/pieces per frame
			angle: 60,            // aim to the right
			spread: 55,           // how wide the burst spreads
			origin: {
				x: 0              // starts from left 
			},
			colors: colors        // uses our color palette
		});
		
		// right side confetti burst
		confetti({
			particleCount: 5,     // 5 particles/pieces per frame
			angle: 120,           // aim to the left
			spread: 55,           // how wide the burst spreads
			origin: {
				x: 1              // starts from right 
			},
			colors: colors        // uses our color palette
		});
		
		// check if we should keep animating
		if (Date.now() < end) {
			requestAnimationFrame(frame);  // call frame again on next paint
		}
	}());  // immediately invoke the function
}
