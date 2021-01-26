class AppContainer {
    artists = []
    Eras = []
    url = "http://localhost:3000/" 
    discoverArtists = {}

    bindEventListeners(){
        const button = document.querySelector("#create-discover")
        button.addEventListener("click", this.getRandomArtists.bind(this))
    }

    getRandomArtists(){
        let randomArtists = []
        for (let index = 0; index < 4; index++) {
            //build this out to cover functionality to randomize each era for discovery 
            randomArtists.push(this.artists[Math.floor(Math.random() * this.artists.length)]);
        }
         return randomArtists
    }
    
    getArtists(){
        fetch(this.url + 'artists')
        .then(resp => resp.json())
        .then(data => console.log(data))
        //make a fetch request to artists
        //populate artists and eras properties with the returned data
        //then call renderArtists
        .catch(err => alert(err)); 
    }
    renderArtists(){
        //create DOM nodes and the insert data into them 
    }
}



