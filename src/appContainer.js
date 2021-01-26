class AppContainer {
    Artists = []
    Eras = []
    url = "http://localhost:3000/" 
    discoverArtists = {}

    bindEventListeners(){
        const button = document.querySelector("#create-discover")
        button.addEventListener("click", this.getRandomArtists)
    }

    getRandomArtists(){
        console.log("Farts")
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



