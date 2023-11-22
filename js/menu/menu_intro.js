
//////*  Background element   *//////
var bodyElement = document.body;
var backgroundImgUrl = new Image();
backgroundImgUrl.src = "assets/Background/background_castle_no_fog.png";
var backgroundSize = "cover";
var backgroundRepeat = "repeat-x";

bodyElement.style.backgroundImage = `url(${backgroundImgUrl.src})`;
bodyElement.style.backgroundSize = backgroundSize;
bodyElement.style.backgroundRepeat = backgroundRepeat;
