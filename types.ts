export interface Iorigin {
  name: string
  url: string
}

export interface Ilocation {
  name: string
  url: string
}

export interface Icharacter {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: Iorigin
  location: Ilocation
  image: string
  episode: string[]
  url: string
  created: Date
}

export interface Iepisode {
  id: number
  name: string
  air_date: string
  episode: string
  characters: string[]
  url: string
  created: Date
}

export type TcollectionName = 'characters' | 'locations' | 'episodes'

export type Tcollections = TcollectionName[]

export interface IresponseShape {
  characters: Icharacter[] | []
  locations: Ilocation[] | []
  episodes: Iepisode[] | []
}
