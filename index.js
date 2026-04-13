/*saveImage3.html, Mr. DeRuiter*/
function nextPage(mode){
	sessionStorage.setItem('gameMode', mode);
	location.replace('gamepage.html');
}

function instructionsPage(){
	location.replace ('instructions.html');
}
