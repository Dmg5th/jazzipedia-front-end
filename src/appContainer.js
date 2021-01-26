class AppContainer {
    static artists = [];
    eras = [];
    url = "http://localhost:3000/" 
    discoverArtists = {};

    bindEventListeners(){
      const button = document.querySelector("#create-discover")
      button.addEventListener("click", this.getRandomArtists)
    };

    getRandomArtists(){
        debugger
      let randomArtists = []
        for (let index = 0; index < 4; index++) {
           //build this out to cover functionality to randomize each era for discovery 
            randomArtists.push(AppContainer.artists[Math.floor(Math.random() * AppContainer.artists.length)]);
        }
      return randomArtists
    }
    
    getArtists(){
       //make a fetch request to artists
        fetch(this.url + 'artists')
        .then(resp => resp.json())
         //populate artists and eras properties with the returned data
        .then(data =>  {
            // console.log(data)
            data.forEach(artist => {
                new Artist(artist.name, artist.era) 
             });
        this.renderArtists()
        }) 
        .catch(err => alert(err));   
    };
    renderArtists(){
        //create DOM nodes and the insert data into them 
        const earlySelect = document.querySelector("#Early")
        const swingSelect = document.querySelector("#Swing")
        const bebopSelect = document.querySelector("#Bebop")
        const coolSelect = document.querySelector("#Cool")
        const hardBopSelect = document.querySelector("#Hard")
        const freeJazzSelect = document.querySelector("#Free")
        const fusionSelect = document.querySelector("#Fusion")
        const eclecticSelect = document.querySelector("#Eclectic")
        
        AppContainer.artists.forEach(artist => {
            const option = document.createElement("option")
            option.innerText = artist.name;
              //where appended will depend on what era its in 
            switch(artist.era.name) {
            case "Early Jazz/New Orleans and Chicago Dixieland":
                earlySelect.appendChild(option)
              break;
            case "Swing/Big Band":
                swingSelect.appendChild(option)
              break;
            case "Bebop":
                bebopSelect.appendChild(option)
              break;
            case "Cool":
                coolSelect.appendChild(option)
              break;
            case "Hard Bop":
                hardBopSelect.appendChild(option)
              break;
            case "Free Jazz/Avant Garde":
                freeJazzSelect.appendChild(option)
              break;
            case "Fusion/Jazz-Rock":
                fusionSelect.appendChild(option)
              break;
            case "Eclecticisim":
                eclecticSelect.appendChild(option)
              break;
            default:
            `Not here yo`
        }
    })
        // document.body.append(ul)
    }





}



