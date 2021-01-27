class AppContainer {
    static artists = [];
    static eras = [];
    url = "http://localhost:3000/" 
    static discoverArtists = {};

    bindEventListeners(){
      const button = document.querySelector("#create-discover")
      button.addEventListener("click", this.getRandomArtists)

      const newArtistForm = document.querySelector("#new-artist-form")
      newArtistForm.addEventListener("submit", this.createArtist);
    };

    getRandomArtists(){
        let randomArtists = []
        //randomize each artist from an era
            AppContainer.eras.forEach(era => {
                randomArtists.push(Artist.byEra(era.name)[Math.floor(Math.random() * Artist.byEra(era.name).length)]);
            });
        // for (let index = 0; index < 3; index++) {
        //     randomArtists.push(AppContainer.artists[Math.floor(Math.random() * AppContainer.artists.length)]);
        // }
        //Instantiate a DiscoverArtists instance with these artists
         new DiscoverArtist(randomArtists)
         //insert data into dom 
         const discoverArtistDiv = document.querySelector("#discover");
         AppContainer.discoverArtists.artists.forEach(artist => {
              const artistDiv = document.createElement("div")
              artistDiv.innerText = artist.name
              discoverArtistDiv.appendChild(artistDiv)
         })
        randomArtists.forEach(artist => {
            fetch(`http://localhost:3000/artists/${artist.id}`, {
                method: 'DELETE',
            })
            .then(resp => resp.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
          })
        
    }

    getArtists(){
       //make a fetch request to artists
        fetch(this.url + 'artists')
        .then(resp => resp.json())
         //populate artists and eras properties with the returned data
        .then(data =>  {
            data.forEach(artist => {
                new Artist(artist.id, artist.name, artist.era) 
                //Avoid instantiating duplicate eras
                if (!AppContainer.eras.map(era => era.name).includes(artist.name)) {
                    new Era(artist.era.name)
                }
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
    }






  }



