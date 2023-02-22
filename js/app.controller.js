import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

export const appController = {
    onAddMarker,
}

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos

function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready')
        })
        .catch(() => console.log('Error: cannot init map'))
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos')
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker')
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            renderLocs(locs)
        })
}

function renderLocs(locs) {
    // var strHTMLs = '<ul>'
    var strHTMLs = locs.map(loc=> {
        return `<article class="loc">
        <div>
            <p>
            ${loc.title}
            created at:${loc.createdAt}
            updated at:${loc.updateAt}
            </p>
        </div>
        
            <button class="btn" onclick="onDeleteMarker(${loc.id})">Delete</button>
            <button class="btn" onclick="onPanTo(${loc.location})">Go To</button>
        
        </article>`
    }).join('')
    // strHTMLs += '</ul>'
    const elLocList = document.querySelector('.locs-list')
    elLocList.innerHTML = strHTMLs
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords)
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err)
        })
}

function onCopyLoc() {

}

function onPanTo(location) {
    console.log('Panning the Map')
    mapService.panTo(location)
}