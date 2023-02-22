import {storageService} from './async-storage.service.js'
import {mapService} from './map.service.js'
export const locService = {
    getLocs,
    save,
}

const LOCATION_KEY = 'locationsDB'

const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 }, 
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]


function query() {
    // return axios.get()
    return storageService.query(LOCATION_KEY)
        .then(locations => {
            // if (gFilterBy.txt) {
            //     const regex = new RegExp(gFilterBy.txt, 'i')
            //     pets = pets.filter(pet => regex.test(pet.name))
            // }
            // if (gFilterBy.minScore) {
            //     pets = pets.filter(pet => pet.score >= gFilterBy.minScore)
            // }
            return pets
        })
}



function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 2000)
    })
}

function save(loc) {
        console.log(loc)   
        return storageService.post(LOCATION_KEY, loc)
}

