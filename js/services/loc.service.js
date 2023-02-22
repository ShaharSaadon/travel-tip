import {storageService} from './async-storage.service.js'
import {mapService} from './map.service.js'
export const locService = {
    getLocs,
    save,
}

const LOCATION_KEY = 'locationsDB'

const locs = query  


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

function query() {
    // return axios.get()
    return storageService.query(LOCATION_KEY)
        .then(locs => {
            // if (gFilterBy.txt) {
            //     const regex = new RegExp(gFilterBy.txt, 'i')
            //     pets = pets.filter(pet => regex.test(pet.name))
            // }
            // if (gFilterBy.minScore) {
            //     pets = pets.filter(pet => pet.score >= gFilterBy.minScore)
            // }
            return locs
        })
}

function get(petId) {
    return storageService.get(PET_KEY, petId)
}

// function remove(petId) {
//     return storageService.remove(PET_KEY, petId)
//     // return axios.remove(url, petId)
// }

// function createLoc(id,title,location){
//    let loc = {
//         id,
//         title,
//         location,
//         createdAt: Date.now(),
//         updateAt: Date.now(),
        
//     } 
//     return loc
// }

// function _createPets() {
//     let pets = utilService.loadFromStorage(PET_KEY)
//     if (!pets || !pets.length) {
//         _createDemoPets()
//     }
// }

function _createDemoPets() {
    const petNames = ['Bobi', 'Charli', 'Pinchi']
    const petDescs = ['Bobi is an amazing dog', 'Charli is a curious cat', 'Just one look at Pinchi']

    const pets = petNames.map((petName, i) => {
        const pet = _createPet(petName)
        pet.desc = petDescs[i]
        return pet
    })

    utilService.saveToStorage(PET_KEY, pets)
}