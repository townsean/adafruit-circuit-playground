
document.getElementById("color-picker").addEventListener("input", colorUpdated);

/**
 * Connect to Circuit Playground Bluefruit device
 * https://learn.adafruit.com/introducing-the-adafruit-bluefruit-le-uart-friend?view=all#gatt-service-details
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

    const server = await device.gatt.connect();
    const service = await server.getPrimaryService(serviceId);
    window.characteristic = await service.getCharacteristic(characteristicId);
}

async function sendData() {
    console.log(window.characteristic);

    await window.characteristic.writeValue(
        new Uint8Array([ 0, 255, 0, 0  ])
    );
}

/**
 * https://stackoverflow.com/a/39077686/263158
 * @param {*} hex 
 */
const hexToRgb = hex =>
  hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
             ,(m, r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1).match(/.{2}/g)
    .map(x => parseInt(x, 16));

async function colorUpdated() {
    const colorPicker = document.getElementById("color-picker");
    const color = hexToRgb(colorPicker.value);

    await window.characteristic.writeValue(
        new Uint8Array([ 0, color[0], color[1], color[2]  ])
    );
}
