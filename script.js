var playAudio ;
var time ;

//loads cookies
$(function(){

    //handles colormode consistency across pages
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
function generatePackHelper(cards)
{
    let commons = [];
    let uncommons = [];
    let rares = [];
    let holoRares = [];
    let radiants = [];
    let ruleBoxes = [];
    let ultraRares = [];
    let secretRares = [];
    let devnull = [];

    let pack = [];

    for(let i = 0; i < cards.length; i++)
    {
        
        const pattern = /^Rare Holo .*/;

        if(cards[i].rarity == "Common")
            commons.push(cards[i]);
        else if(cards[i].rarity == "Uncommon")
            uncommons.push(cards[i]);
        else if(cards[i].rarity == "Rare")
            rares.push(cards[i]);
        else if(cards[i].rarity == "Rare Holo")
            holoRares.push(cards[i]);
        else if(pattern.test(cards[i].rarity))
            ruleBoxes.push(cards[i]);
        else if(cards[i].rarity == "Radiant Rare")
            radiants.push(cards[i]);
        else if(cards[i].rarity == "Rare Ultra")
            ultraRares.push(cards[i]);
        else if(cards[i].rarity == "Rare Secret" || cards[i].rarity == "Rare Rainbow")
            secretRares.push(cards[i]);
        else
            devnull.push(cards[i]);
    }

    // common slots
    for(let i = 0; i < 5; i++)
    {
        let rand = Math.floor((Math.random()) * ((commons.length- 1) + 1));
        pack.push(commons[rand]);
    }

    // uncommon slots
    for(let i = 0; i < 3; i++)
    {
        let rand = Math.floor((Math.random()) * ((uncommons.length- 1) + 1));
        pack.push(uncommons[rand]);
    }

    // reverse slot
    const rarity = Math.floor((Math.random()) * (16)) + 1;
    //4/16 chance for uncommon
    if(rarity > 2 && rarity < 7)
    {
        let rand = Math.floor((Math.random()) * ((uncommons.length - 1) + 1));
        pack.push(uncommons[rand]);
    }
    //2/16 chance for rare
    else if(rarity == 1 || rarity == 2)
    {
        let rand = Math.floor((Math.random()) * ((rares.length- 1) + 1));
        pack.push(rares[rand]); 
    }
    //1/16 chance for radiant if it exists in set
    else if(radiants[0] && rarity == 9)
    {
        let rand = Math.floor((Math.random()) * ((radiants.length- 1) + 1));
        pack.push(radiants[rand]); 
    }
    //other 9/16 for commons
    else
    {
        let rand = Math.floor((Math.random()) * ((commons.length- 1 + 1)));
        pack.push(commons[rand]);
    }

    //rare slot

    const rareRarity = Math.floor((Math.random()) * (36)) + 1;
    //one chance at a secret rare every 36 packs,
    if(rareRarity == 1 && secretRares[0])
    {
        //50/50 chance, either pushes a secret rare or an ultra rare
        let rand = Math.floor((Math.random()) * ((2) + 1));
        if(rand == 1)
        {
            rand = Math.floor((Math.random()) * ((secretRares.length- 1) + 1));
            pack.push(secretRares[rand]); 
        }
        else
        {
            let rand = Math.floor((Math.random()) * ((ultraRares.length - 1) + 1));
            pack.push(ultraRares[rand]); 
        }
    }
    // ~3 ultra rares per 36 packs (rareRarity = 2, 3, or 4)
    else if(rareRarity > 1 && rareRarity < 5 && ultraRares[0])
    {
        let rand = Math.floor((Math.random()) * ((ultraRares.length - 1) + 1));
        pack.push(ultraRares[rand]); 
    }
    //otherwise default to regular rare, and 1/3 chance at holo, 1/6 at rulebox
    else
    {
        let rand = Math.floor((Math.random()) * ((6) + 1));
        if(rand == 1 || rand == 2)
        {
            rand = Math.floor((Math.random()) * ((holoRares.length - 1) + 1));
            pack.push(holoRares[rand]); 
        }
        else if(rand == 3 && ruleBoxes[0])
        {
            rand = Math.floor((Math.random()) * ((ruleBoxes.length - 1) + 1));
            pack.push(ruleBoxes[rand]); 
        }
        else
        {
            rand = Math.floor((Math.random()) * ((rares.length - 1) + 1));
            pack.push(rares[rand]); 
        }
    }

    //output contents of pack array in readable way

    console.log("\ngenerated cards:");
    for(let i = 0; i < pack.length; ++i)
    {
        if(i == 8)
        {
            if(pack[i].rarity != "Radiant Rare")
                console.log(`#${i+1}: ${pack[i].name} ${pack[i].number} (${pack[i].rarity} Reverse)`);
            else
                console.log(`#${i+1}: ${pack[i].name} ${pack[i].number} (${pack[i].rarity})`);

        }
        else
            console.log(`#${i+1}: ${pack[i].name} ${pack[i].number} (${pack[i].rarity})`);
    }

    if(devnull[0])
    {
        console.log("\ncards not supported from set:\n");
        for(let i = 0; i < devnull.length; ++i)
            {
                    console.log(`#${i+1}: ${devnull[i].name} ${devnull[i].number} (${devnull[i].rarity})`);
            
            }
    }
    for(let i = 0; i < 10; i++)
    {
        document.getElementById(`card${i+1}`).style = "";
        document.getElementById(`card${i+1}`).src = pack[i].images.small;
    }

}

function generatePack(set)
{
    for(let i = 0; i < 10; i++)
    {
        document.getElementById(`card${i+1}`).src = "https://images.pokemontcg.io/";
        document.getElementById(`card${i+1}`).style = "border-radius: 15px";
    }

    if((JSON.parse(localStorage.getItem("loadedSet"))[0].set.id) != set || localStorage.getItem("loadedSet") == "null")
    {
        fetch(`https://pokemontcgsdknodejsapp.onrender.com/cards/${set}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();           
                })
                .then(cards => {
                   generatePackHelper(cards);
                   localStorage.setItem("loadedSet", JSON.stringify(cards));
                })
                .catch(error => console.error('Error fetching data:', error));
    }
    else{

        setTimeout(() => {
            generatePackHelper(JSON.parse(localStorage.getItem("loadedSet")));
        }, 750);
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

function loadSets(who)
{
    if(!(document.getElementById('setOption')) && who != "script")
    {
        fetch(`https://pokemontcgsdknodejsapp.onrender.com/sets`)
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
    else if(who != script)
    {

    }
}