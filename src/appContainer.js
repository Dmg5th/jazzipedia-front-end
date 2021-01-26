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
        const ul = document.createElement("ul");
        AppContainer.artists.forEach(artist => {
            const li = document.createElement("li")
            li.innerText = artist.name
            ul.append(li)
        })
        document.body.append(ul)
    }



}



