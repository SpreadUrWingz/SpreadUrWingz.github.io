var playAudio ;
var time ;

function selectSound(id)
{
    if(id == "trumpIM")
    {
        playAudio = new Audio ("/audio/trumpIm.mp3") ;
    }
    return;
}

function stopButton(id)
{
    document.getElementById("button").src = "/images/buttonOFF.png";
}

function buttonPress(id, time)
{
    if(playAudio)
    {
        playAudio.pause();
    }

    selectSound(id);

    playAudio.play();
    if(playAudio)
    {
        document.getElementById("button").src = "/images/buttonON.png";
    }
    
    setTimeout(function(){ stopButton(id); }, time);
}

function nextCard(src)
{
    document.getElementById("fluid").src = "https://www.pokemon.com/static-assets/content-assets/cms2/img/cards/web/SV01/SV01_EN_156.png";
}
