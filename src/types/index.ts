export type TRawUser = {
  phone: string
  email: string
  login: {
    uuid: string
  }
  name: {
    first: string
    last: string
  }
  gender: 'male' | 'female',
  birthday: Date
  location: {
    city: string
    state: string
    country: string
  }
  picture: {
    large: string
    medium: string
    thumbnail: string
  }
  dob: {
    date: Date,
    age: number
  }
}

export type TUser = {
  uuid: string
  phone: string
  email: string
  firstName: string
  lastName: string
  gender: 'male' | 'female',
  birthday: Date
  age: number
  address: string
  picture: string
}
