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
        const early = document.querySelector("#Early")
        const swing = document.querySelector("#Swing")
        const bebop = document.querySelector("#Bebop")
        const cool = document.querySelector("#Cool")
        const hardBop = document.querySelector("#Hard")
        const freeJazz = document.querySelector("#Free")
        const fusion = document.querySelector("#Fusion")
        const eclectic = document.querySelector("#Eclectic")
        
        AppContainer.artists.forEach(artist => {
            const option = document.createElement("option")
            option.innerText = artist.name;

            switch(artist.era.name) {
            case "Early Jazz/New Orleans and Chicago Dixieland":
            // code block
            break;
            case "Swing/Big Band":
            // code block
            break;
            case "Bebop":
                // code block
                break;
            case "Cool":
            // code block     
            break;
            case "Hard Bop":
                // code block
                break;
            case "Free Jazz/Avant Garde":
            // code block
            break;
            case "Fusion/Jazz-Rock":
                // code block
                break;
            case "Eclecticisim":
            // code block
            break;
            default:
            // code block
        }
            
          
          
          //where appended will depend on what era its in 
        })
        document.body.append(ul)
    }





}



