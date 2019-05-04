// Dictionary of state names to latlong:
var stateToLatlong = {
    'Achaia': 1,
    'Argolis (Greece)': 1,
    'Arta (Greece)': 1,
    'Athens': 61,
    'Attica': 10,
    'Attica, Poros': 1,
    'Attiki': 4,
    'Chalkida Evia': 1,
    'Chania (Greece)': 1,
    'Corfu': 1,
    'Crete': 12,
    'Elassona': 1,
    'Etolia Akarnania': 1,
    'Gavdos Island': 1,
    'Kalymnos': 1,
    'Karditsa': 1,
    'Kefalonia': 1,
    'Komotini (Greece)': 1,
    'Kreta': 1,
    'Laggadas (Macedonia Greece)': 1,
    'Lamia (Greece)': 1,
    'Larissa': 1,
    'Lasithi': 1,
    'Lesvos': 1,
    'Macedonia': 4,
    'Magnesia': 1,
    'Melissiatika (Greece)': 1,
    'Mires Crete': 1,
    'Nafpaktos (Greece)': 1,
    'Paros Naxos (Greece)': 1,
    'Patra': 5,
    'Peloponnese': 1,
    'Pireaus (Greece)': 1,
    'Pireaus, Περαιώς': 1,
    'Pontiaka': 1,
    'Pyrgos (Greece)': 1,
    'Rhodes': 1,
    'Serres': 2,
    'Siatista (Greece)': 1,
    'Sifnos island': 1,
    'Sparta': 1,
    'Syros': 2,
    'Thessaloniki': 17,
    'Tirnavos': 1,
    'Trikala (Greece)': 1,
    'amaliada': 1,
    'Αλεξανδρούπολις (Greece)': 1,
    'Βέροια (Greece)': 1,
    'Βοιωτία': 1,
    'Καστοριά': 1,
    'Μαγνησία (Greece)': 1,
    'Ξάνθη': 1,
    'Χίος (Greece)': 1
};

// Url to the api with data in json format:
linkToJSON = 'http://www.radio-browser.info/webservice/json/stations/bycountry/greece';

// Download the data into a json object variable:
var allStations = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': linkToJSON,
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})(); //// https://stackoverflow.com/questions/2177548/load-json-into-variable

// Keep only stations with a registered state and url property:
var fullStations = [];
for (i=0; i<allStations.length; i++) {
    station = allStations[i];
    if ((station.state != '')&&
        (station.url != '')) {
        fullStations.push(station);
    };
}
console.log(fullStations.length);

/*
var states = {};
for (i=0; i<fullStations.length; i++) {
    station = fullStations[i];
    if (!states[station.state]) {
        states[station.state] = 1;
    } else {
        states[station.state] = states[station.state]+1;
    }
}
console.log(states);
*/