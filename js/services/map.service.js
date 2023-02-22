// import { mapController } from '../app.controller.js'
import {storageService} from '../services/async-storage.service.js'
import {utilService} from '../services/util.service.js'
import {locService} from '../services/loc.service.js'


export const mapService = {
    initMap,
    addMarker,
    panTo
}



// Var that is used throughout this Module (not global)
var gMap

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap')
    return _connectGoogleApi()
        .then(() => {
            console.log('google available')
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })

            gMap.addListener('click', (ev) => {
                console.log('ev', ev)
                const name = prompt('Place name?', 'Place 1')
                const lat = ev.latLng.lat()
                const lng = ev.latLng.lng()
                console.log('lat=',lat, 'lng=',lng)
                addMarker(({lat, lng}),name)    
                // renderPlaces()
                // renderMarkers()
              })


            console.log('Map!', gMap)
        })
}

function addMarker(loc,name) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: name,
    })
    const {position,title} = marker
    const id=utilService.makeId()
    locService.createLoc(id,title,position)
    .then(locService.save)

    return locService.save(newMarker)
    // .then(console.log)
}

function removeMarker() {
    
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng)
    gMap.panTo(laLatLng)
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyAWyTnqmX2aGPLcTFQ7oBB8b2EmT7RMtV0' //TODO: Enter your API Key
    var elGoogleApi = document.createElement('script')
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
    elGoogleApi.async = true
    document.body.append(elGoogleApi)

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}