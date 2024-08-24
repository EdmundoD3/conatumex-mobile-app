class StateTable {
    constructor({ id, state }) {
        this.id = id;
        this.state = state;
    }
}
class ColoniaTable {
    constructor({ id, colonia }) {
        this.id = id;
        this.colonia = colonia;
    }
}
class CityTable {
    constructor({ id, city }) {
        this.id = id;
        this.city = city;
    }
}
class AddressTable {
    constructor({ id, clienteId, street, noaddress, betweenstreet, referencia, observation, stateId, coloniaId, cityId }) {
        this.id = id;
        this.clienteId = clienteId;
        this.street = street;
        this.noaddress = noaddress;
        this.betweenstreet = betweenstreet;
        this.referencia = referencia;
        this.observation = observation;
        this.stateId = stateId;
        this.coloniaId = coloniaId;
        this.cityId = cityId;
    }
}

export {AddressTable,CityTable,ColoniaTable,StateTable}