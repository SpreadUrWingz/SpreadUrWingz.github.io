var playAudio ;
var time ;

//handles colormode consistency across pages
$(function(){

    console.log(localStorage.getItem("colormode"));
    if(localStorage.getItem("colormode") == null)
    {
        localStorage.setItem("colormode", "main-content bg-light");
    }
    console.log(localStorage.getItem("colormode"));

    if(localStorage.getItem("colormode") != document.getElementById("main").className)
        changeColorMode("script");

});


function selectSound(sound)
{
    if(sound == "trumpIM")
    {
        playAudio = new Audio ("/audio/trumpIm.mp3") ;
    }
    else if(sound == "scream")
    {
        playAudio = new Audio ("/audio/scream.mp3")
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

function changeColorMode(who)
{
    if(who != "script")
        document.getElementById("color-button").src = "/images/buttonON.png";
    
    var main = document.getElementById("main");
    var text = document.getElementById("text");
    var label = document.getElementById("mode-label");
    var navbar = document.getElementById("nav");

    var mode;
    
    if(main.className == "main-content bg-dark")
    {
        main.className = "main-content bg-light";
        label.textContent = "Dark Mode";
        label.style.color = "black";
        navbar.className = "navbar navbar-expand-lg navbar-light";
        navbar.style = "background-color: #ffffff";

        if(text){
            text.style.color = "black"; 
        }
        localStorage.setItem("colormode", "main-content bg-light");
        mode = "light";
    }
    else
    {
        main.className = "main-content bg-dark";
        label.textContent = "Light Mode";
        label.style.color = "white";
        navbar.className = "navbar navbar-expand-lg navbar-dark";
        navbar.style = "background-color: #333333";
    
        if(text){ 
            text.style.color = "white";
        }
        localStorage.setItem("colormode", "main-content bg-dark");
        mode = "dark";
    }
    
    if(who != "script")
        setTimeout(function(){ document.getElementById("color-button").src = "/images/buttonOFF.png"; }, 100);

    return mode;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
  
function generatePack(set, cardCount)
{
    for(let i = 1; i < 11; i++)
    {
        do
            var num  = getRandomInt(cardCount);
        while(num == 0)

        document.getElementById(`card${i}`).src = `https://www.pokemon.com/static-assets/content-assets/cms2/img/cards/web/${set}/${set}_EN_${num}.png`;
    }

}

function jumpscare()
{
    if(playAudio)
        {
            playAudio.pause();
        }
    
    document.getElementById("jumpscare").src = "/images/chippy.png"
    selectSound("scream");
    playAudio.play();
    
    setTimeout(
        function(){ 
            document.getElementById("jumpscare").src = "";
            playAudio.pause();
        }
    , 500);

}