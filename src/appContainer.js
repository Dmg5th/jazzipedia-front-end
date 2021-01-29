class AppContainer {
    static artists = [];
    static eras = [];
    url = "http://localhost:3000/" 
    static discoverArtists = {};
    static domEleme

    bindEventListeners(){
      const button = document.querySelector("#create-discover")
      button.addEventListener("click", this.getRandomArtists.bind(this))

      const newArtistForm = document.querySelector("#new-artist-form")
      newArtistForm.addEventListener("submit", this.createArtist.bind(this));
      
      const labels = {
       earlyLabel: document.querySelector("#EarlyLabel"),
       swingLabel: document.querySelector("#SwingLabel"),
       bebopLabel: document.querySelector("#BebopLabel"),
       coolLabel: document.querySelector("#CoolLabel"),
       hardLabel: document.querySelector("#HardLabel"),
       freeLabel: document.querySelector("#FreeLabel"),
       fusionLabel: document.querySelector("#FusionLabel"),
       eclecticLabel: document.querySelector("#EclecticLabel")
      }
     
      Object.keys(labels).forEach(label => {
        labels[label].addEventListener("click", (e) => {
          let era = e.target.innerHTML 
        })
      });

    };

    createArtist(e){
      e.preventDefault()
      const target = e.target;
      
      fetch(`${this.url}artists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: target.artist.value,
          album: target.album.value,
          bio: target.bio.value,
          url: target.url.value,
          era:  target.eraSelect.value
        })  
      }) 
      .then(response => response.json())
      .then(data => { 
        // destructured variables 
        debugger
        const {id, name, album, bio, url, era} = data 
        new Artist(id, name, album, bio, url, era)
        this.renderArtists();
        const newArtistForm = document.querySelector("#new-artist-form")
        newArtistForm.reset()
      })
      .catch((error) => console.error('You messed up  something:', error)) //Potentially refractor this to be more abstract
  
    } 

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
         discoverArtistDiv.innerHTML = ""
         
         AppContainer.discoverArtists.artists.forEach(artist => {
              const artistDiv = document.createElement("div")
              artistDiv.innerText = artist.name
              discoverArtistDiv.appendChild(artistDiv)
         })
         // potential delete action to delete all artists after they've been "discovered"
        // randomArtists.forEach(artist => {
        //     fetch(`${this.url}/${artist.id}`, {
        //         method: 'DELETE',
        //     })
        //     .then(resp => resp.json())
        //     .then(data => {
        //           console.log(data)
        //           Artist.delete(data.id)
        //           this.renderArtists();
        // })
        //     .catch(err => console.log(err))
        //   })
         
    }

    getArtists(era){
       //make a fetch request to artists
        fetch(this.url + 'artists')
        .then(resp => resp.json())
         //populate artists and eras properties with the returned data
        .then(data =>  {
          console.log(data)
            data.forEach(artist => {
                new Artist(artist.id, artist.name, artist.album, artist.bio, artist.url, artist.era) 
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
        const earlyDiv = document.querySelector("#Early")
        const swingDiv = document.querySelector("#Swing")
        const bebopDiv = document.querySelector("#Bebop")
        const coolDiv = document.querySelector("#Cool")
        const hardDiv = document.querySelector("#Hard")
        const freeDiv = document.querySelector("#Free")
        const fusionDiv = document.querySelector("#Fusion")
        const eclecticDiv = document.querySelector("#Eclectic")
        
        
        earlyDiv.innerHTML = ""
        swingDiv.innerHTML = ""
        bebopDiv.innerHTML = ""
        coolDiv.innerHTML = ""
        hardDiv.innerHTML = ""
        freeDiv.innerHTML = ""
        fusionDiv.innerHTML = ""
        eclecticDiv.innerHTML = ""

     
      AppContainer.artists.forEach(artist => {
            const p = document.createElement("p")
            p.innerText = artist.name;
            //where appended will depend on what era its in 
            switch(artist.era.name) {
            case "Early Jazz/New Orleans and Chicago Dixieland":
                earlyDiv.appendChild(p)
              break;
            case "Swing/Big Band":
                swingDiv.appendChild(p)
              break;
            case "Bebop":
                bebopDiv.appendChild(p)
              break;
            case "Cool":
                coolDiv.appendChild(p)
              break;
            case "Hard Bop":
                hardBopDiv.appendChild(p)
              break;
            case "Free Jazz/Avant Garde":
                freeDiv.appendChild(p)
              break;
            case "Fusion/Jazz-Rock":
                fusionDiv.appendChild(p)
              break;
            case "Eclecticisim":
                eclecticDiv.appendChild(p)
              break;
            default:
            `Not here yo`
        }
    })
    }


}



