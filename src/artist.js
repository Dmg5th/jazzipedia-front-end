class Artist {
    constructor(name, era){
        this.name = name;
        this.era = era
        AppContainer.artists.push(this);
    }

    static byEra(eraName){
        return AppContainer.artists.filter(artist => artist.era.name === eraName)
    }
}

