class Artist {
    constructor(id, name, album, bio, url, era){
        this.name = name;
        this.album = album;
        this.bio = bio;
        this.era = era;
        this.url = url;
        this.id = id;
        AppContainer.artists.push(this);
    }

    // static delete(artistId){
    //     AppContainer.artists  = AppContainer.artists.filter(artist => parseInt(artistId) !== artist.id);
    // } 

    static byEra(eraName){
        return AppContainer.artists.filter(artist => artist.era.name === eraName)
    }
}

 