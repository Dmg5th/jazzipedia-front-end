class Artist {
    constructor(name,era){
        this.name = name;
        this.era = era
        AppContainer.artists.push(this);
    }
}

//maybe store which era the artist instance belongs to