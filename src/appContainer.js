class AppContainer {
    static artists = [];
    static eras = [];
    url = "http://localhost:3000/" 
    static discoverArtists = {};
    

    bindEventListeners(){
      const button = document.querySelector("#create-discover")
      button.addEventListener("click", this.getRandomArtists.bind(this))

      const newArtistForm = document.querySelector("#new-artist-form")
      newArtistForm.addEventListener("submit", this.createArtist.bind(this));
      
      const artistDetailModals = document.querySelectorAll(".artist-details");
      const closeButton = document.querySelector(".close")
      
      artistDetailModals.forEach(modal => {
          modal.addEventListener("click", (e) => {
            document.getElementById("artist-modal").style.display = "block";
            fetch(`${this.url}artists/${e.target.id}`)
            .then(resp => resp.json())
            .then(data => this.displayArtistDetails(data))
            .catch(error => console.log(error))
        })
      });

      closeButton.addEventListener("click", (e) => {
        document.getElementById("artist-modal").style.display = "none"
      } )

      

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
          const endingIndex = e.target.id.indexOf("Label")
          const targetId = e.target.id.slice(0,endingIndex)
          const eraDiv = document.querySelector(`#${targetId}`)
          eraDiv.classList.toggle("hidden")
        })
      });
  };

    displayArtistDetails(details){
      document.querySelector(".modal-title").innerHTML = `<p class="artist-name"> ${details.name}</p>`
      document.querySelector(".modal-body").innerText = details.bio
      document.querySelector(".modal-footer").innerHTML = `<a id="artist-link" href="${details.url}">Click here to hear ${details.name}'s music!</a>`
      
    }

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
        // debugger
        const {id, name, album, bio, url, era} = data 
        new Artist(id, name, album, bio, url, era)
        const newArtistForm = document.querySelector("#new-artist-form")
        newArtistForm.reset()
        this.getArtists();
        this.bindEventListeners();
      })
      .catch((error) => console.error('You messed up  something:', error)) //Potentially refractor this to be more abstract
  
    } 

    getRandomArtists(){
      let randomArtists = []
      for (let index = 0; index < 3; index++) {
            randomArtists.push(AppContainer.artists[Math.floor(Math.random() * AppContainer.artists.length)]);
        }
        //Instantiate a DiscoverArtists instance with these artists
         new DiscoverArtist(randomArtists)
         //insert data into dom 
         const discoverArtistDiv = document.querySelector("#discover");
         discoverArtistDiv.innerHTML = ""
         
         
         AppContainer.discoverArtists.artists.forEach(artist => {
            const p = document.createElement("p")
            p.className = "artist-details btn btn-outline-success"
            p.id = `${artist.id}`
            p.setAttribute("data-toggle", "modal")
            p.setAttribute("data-target", "#artist-modal")
            p.innerText = artist.name;
            // const artistDiv = document.createElement("div")
            // artistDiv.className = "card border-info mb-3"
            // artistDiv.innerText = artist.name
            discoverArtistDiv.appendChild(p)
         })
        discoverArtistDiv.innerHTML += `<button id="discover-close-button">Close Discover</button>`
        const closeButton = document.querySelector("#discover-close-button")
        closeButton.addEventListener("click", (e) => {
          discoverArtistDiv.innerHTML = ""
          location.reload();
          
        } )  
        this.getArtists();
        this.bindEventListeners();
        
    }

    getArtists(era){
     //make a fetch request to artists
        fetch(this.url + 'artists')
        .then(resp => resp.json())
         //populate artists and eras properties with the returned data
        .then(data =>  {
          console.log(data)
          AppContainer.artists = [];
            data.forEach(artist => {
                new Artist(artist.id, artist.name, artist.album, artist.bio, artist.url, artist.era) 
                //Avoid instantiating duplicate eras
                if (!AppContainer.eras.map(era => era.name).includes(artist.name)) {
                    new Era(artist.era.name)
                }
             });

        this.sortedArtist();
        this.renderArtists()
        this.bindEventListeners();
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
          p.className = "artist-details btn btn-outline-success"
          p.id = `${artist.id}`
          p.setAttribute("data-toggle", "modal")
          p.setAttribute("data-target", "#artist-modal")
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
                hardDiv.appendChild(p)
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

    sortedArtist () {
      AppContainer.artists.sort(function(a, b) {
      let nameA = a.name.toUpperCase(); // ignore upper and lowercase
      let nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
    })
  }


}
