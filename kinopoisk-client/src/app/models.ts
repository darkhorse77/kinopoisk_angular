export interface Rating {
    Source: string;
    Value: string;
}

export interface Film extends FilmShort {
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Ratings: Rating[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
}

export interface FilmShort {
    Title: string;
    Year: string;
    Poster: string;
    imdbID: string;
    Type: string;
}