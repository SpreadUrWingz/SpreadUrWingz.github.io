var playAudio ;
var time ;

function selectSound(sound)
{
    if(sound == "trumpIM")
    {
        playAudio = new Audio ("/audio/trumpIm.mp3") ;
    }
    return;
}

function stopButton(id)
{
    document.getElementById(id).src = "/images/buttonOFF.png";
}

function buttonPress(id, sound, time)
{
    if(playAudio)
    {
        playAudio.pause();
    }

    selectSound(sound);

    playAudio.play();
    if(playAudio)
    {
        document.getElementById(id).src = "/images/buttonON.png";
    }
    
    setTimeout(function(){ stopButton(id); }, time);
}

function nextCard(src)
{
    const startURL = document.getElementById("fluid").src;
    
    if(startURL.length == 90){
        var baseURL = (document.getElementById("fluid").src).substring(0, startURL.length-5);
        var startNum =  (document.getElementById("fluid").src).substring(startURL.length-5, startURL.length-4);
    }
    if(startURL.length == 91){
        var baseURL = (document.getElementById("fluid").src).substring(0, startURL.length-6);
        var startNum =  (document.getElementById("fluid").src).substring(startURL.length-6, startURL.length-4);
    }
    if(startURL.length == 92){
        var baseURL = (document.getElementById("fluid").src).substring(0, startURL.length-7);
        var startNum =  (document.getElementById("fluid").src).substring(startURL.length-7, startURL.length-4);
    }
    parseInt(startNum);
    startNum++;
    document.getElementById("fluid").src = `${baseURL}${startNum}.png`;
}

function changeColorMode()
{
    document.getElementById("color-button").src = "/images/buttonON.png";

    var main = document.getElementById("main");
    var text = document.getElementById("text");
    var label = document.getElementById("mode-label");
    var navbar = document.getElementById("nav");
    
    if(main.className == "main-content bg-dark")
    {
            main.className = "main-content bg-light"
            label.textContent = "Dark Mode";
            label.style.color = "black";
            navbar.className = "navbar navbar-expand-lg navbar-light bg-light";
        if(text){
        text.style.color = "black"; 
        }
    }
    else
    {
            main.className = "main-content bg-dark"
            label.textContent = "Light Mode";
            label.style.color = "white";
            navbar.className = "navbar navbar-expand-lg navbar-dark";
            navbar.style = "background-color: #333333"

        if(text){ 
            text.style.color = "white";
        }
    }
    setTimeout(function(){ document.getElementById("color-button").src = "/images/buttonOFF.png"; }, 100);
    


}