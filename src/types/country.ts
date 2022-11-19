import {Region} from "./region";

type Currency = {
    code: string,
    name: string,
    symbol: string
}
type Language = {
    name: string,
    nativeName: string,
    iso639_1: string,
    iso639_2: string
}

export type Country = {
    name: string,
    nativeName: string,
    flag: string,
    flags: [{ png: string, svg: string }],
    region: Region,
    subregion: string,
    capital: string,
    population: number,
    topLevelDomain: string[],
    borders: string[],
    currencies: Currency[],
    languages: Language[]

}