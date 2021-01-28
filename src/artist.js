class Artist {
    constructor(id, name, era){
        this.name = name;
        this.era = era;
        this.id = id;
        AppContainer.artists.push(this);
    }

    // static delete(artistId){
    //     return const artist = AppContainer.artists.filter(artist => artistId !== artist.id )
    // }

    static byEra(eraName){
        return AppContainer.artists.filter(artist => artist.era.name === eraName)
    }
}

 