
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface ArtistInput {
    firstName?: Nullable<string>;
    secondName?: Nullable<string>;
    middleName?: Nullable<string>;
    birthDate?: Nullable<string>;
    birthPlace?: Nullable<string>;
    country?: Nullable<string>;
}

export interface GenreInput {
    name: string;
    description?: Nullable<string>;
    country?: Nullable<string>;
    year?: Nullable<number>;
}

export interface UserInput {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
}

export interface LoginInput {
    password: string;
    email: string;
}

export interface Artist {
    id: string;
    firstName?: Nullable<string>;
    secondName?: Nullable<string>;
    middleName?: Nullable<string>;
    birthDate?: Nullable<string>;
    birthPlace?: Nullable<string>;
    country?: Nullable<string>;
    bandsIds?: Nullable<Nullable<string>[]>;
    instruments?: Nullable<Nullable<string>[]>;
}

export interface DeleteResponse {
    acknowledged: boolean;
    deletedCount: number;
}

export interface IQuery {
    artists(limit?: Nullable<number>, offset?: Nullable<number>): Nullable<Nullable<Artist>[]> | Promise<Nullable<Nullable<Artist>[]>>;
    artist(id: string): Nullable<Artist> | Promise<Nullable<Artist>>;
    genre(id: string): Nullable<Genre> | Promise<Nullable<Genre>>;
    genres(limit?: Nullable<number>, offset?: Nullable<number>): Nullable<Nullable<Genre>[]> | Promise<Nullable<Nullable<Genre>[]>>;
    user(): Nullable<User> | Promise<Nullable<User>>;
    jwt(login?: Nullable<LoginInput>): Nullable<JWT> | Promise<Nullable<JWT>>;
}

export interface IMutation {
    createArtist(artist?: Nullable<ArtistInput>): Nullable<Artist> | Promise<Nullable<Artist>>;
    updateArtist(id: string, artist?: Nullable<ArtistInput>): Nullable<Artist> | Promise<Nullable<Artist>>;
    deleteArtist(id: string): Nullable<DeleteResponse> | Promise<Nullable<DeleteResponse>>;
    createGenre(genre?: Nullable<GenreInput>): Nullable<Genre> | Promise<Nullable<Genre>>;
    updateGenre(id: string, genre?: Nullable<GenreInput>): Nullable<Genre> | Promise<Nullable<Genre>>;
    deleteGenre(id: string): Nullable<DeleteResponse> | Promise<Nullable<DeleteResponse>>;
    register(user?: Nullable<UserInput>): Nullable<User> | Promise<Nullable<User>>;
}

export interface Genre {
    id: string;
    name: string;
    description?: Nullable<string>;
    country?: Nullable<string>;
    year?: Nullable<number>;
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
}

export interface JWT {
    jwt: string;
}

type Nullable<T> = T | null;
