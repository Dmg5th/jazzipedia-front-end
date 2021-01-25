class AppContainer {
    Artists = []
    Eras = []
    url = "http://localhost:3000/" 
    discoverArtists = {}
    
    getArtists(){
        fetch(this.url + 'artists')
        .then(resp => console.log(resp))
        //make a fetch request to artists
        //populate artists and eras properties with the returned data
        //then call renderArtists
        .catch(err => alert(err))
    }
    renderArtists(){
        //create DOM nodes and the insert data into them 
    }
}



