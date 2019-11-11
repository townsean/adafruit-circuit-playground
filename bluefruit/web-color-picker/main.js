
/**
 * Connect to Circuit Playground Bluefruit device
 * Device id: id vN56l0mnDAmGzlQ0VqUZog==
 */
async function connect() {
    const serviceId = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
    const characteristicId = '6e400002-b5a3-f393-e0a9-e50e24dcca9e'; 
    const device = await navigator.bluetooth.requestDevice({
        filters: [
            { namePrefix: "CIRCUITPY" }
        ],
        optionalServices: [ serviceId ]
    });

    console.log(device);
    console.log(device.name);

    let server = await device.gatt.connect();
    let service = await server.getPrimaryService(serviceId);
    window.characteristic = await service.getCharacteristic(characteristicId);

    window.characteristic.writeValue(
        new Uint8Array([ 0, 0, 0, 255  ])
    );
    console.log(device);
}

async function sendData() {
    console.log(window.characteristic);

    await window.characteristic.writeValue(
        new Uint8Array([ 0, 0, 0, 255  ])
    );
}