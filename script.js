var playAudio ;
var time ;

//handles colormode consistency across pages
$(function(){

    if(localStorage.getItem("colormode") == null)
    {
        localStorage.setItem("colormode", "main-content bg-light");
    }
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

    //this is a hack please for the love of god fix it the other 
    //parts are commented below and in packopener.html line:79
    var text2 = document.getElementById("text2");

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
            //nasty hack 
            if(text2){
                text2.style.color = "black"; 
            }
        }
        localStorage.setItem("colormode", "main-content bg-light");
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
            //nasty hack 
            if(text2){
                text2.style.color = "white"; 
            }
        }
        localStorage.setItem("colormode", "main-content bg-dark");
    }
    
    if(who != "script")
        setTimeout(function(){ document.getElementById("color-button").src = "/images/buttonOFF.png"; }, 100);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
  
function generatePackOld(set, cardCount)
{
    for(let i = 1; i < 11; i++)
    {
        do
            var num  = getRandomInt(cardCount);
        while(num == 0)

        document.getElementById(`card${i}`).src = `https://www.pokemon.com/static-assets/content-assets/cms2/img/cards/web/${set}/${set}_EN_${num}.png`;
    }

}

function generatePack(set)
{
    fetch(`http://localhost:3000/packGenerator/${set}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();           
            })
            .then(data => {
                for(let i = 0; i < 10; i++)
                document.getElementById(`card${i+1}`).src = data[i].images.small;

            })
            .catch(error => console.error('Error fetching data:', error));
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

function loadSets()
{
    if(!(document.getElementById('setOption')))
    {
        fetch(`http://localhost:3000/sets`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();           
            })
            .then(data => {
                for(let i = 0; i < data.length; i++)
                {
                    var dropdown = document.getElementById('sets');
                    
                    var option = document.createElement('option');
                    option.value = data[i].id;
                    option.textContent = data[i].name;
                    option.id = "setOption";

                    dropdown.appendChild(option);
                }
                    //console.log(data[i].id);
                

            })
            .catch(error => console.error('Error fetching data:', error));
    }
}