import { BASE_URL, API_BASE_URL, POLL_LIST_SIZE, ACCESS_TOKEN } from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function getAllParkingLots() {
    return request({
        url: BASE_URL + "/parkinglots",
        method: 'GET'
    });
}

export function getAllEmployees() {
    return request({
        url: API_BASE_URL + "/users",
        method: 'GET'
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}


export function getAllOrders() {
    return request({
        url: BASE_URL + "/orders",
        method: 'GET'
    });
}

export function getAllParkingClerks() {
    return request({
        url: BASE_URL + "/parkingclerks",
        method: 'GET'
    });
}

export function assignOrdersToParkingClerks(parkingClerksId,order) {
    return request({
        url: BASE_URL + "/parkingclerks/"+parkingClerksId+"/orders",
        method: 'POST',
        body: JSON.stringify(order)
    });
}

export function addParkingLots(addLotsRequest) {
    return request({
        url: BASE_URL + "/parkinglots",
        method: 'POST',
        body: JSON.stringify(addLotsRequest)
    });
}

export function assignParkingLotToParkingClerks(parkingClerksId,lot) {
    return request({
        url: BASE_URL + "/parkingclerks/" + parkingClerksId + "/parkinglots/",
        method: 'POST',
        body: JSON.stringify(lot)
    });
}
