class Artist {
    constructor(name){
        this.name = name;
        AppContainer.artists.push(this);
    }
}

//maybe store which era the artist instance belongs to