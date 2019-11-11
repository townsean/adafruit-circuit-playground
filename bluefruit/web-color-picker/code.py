# Receives Bluetooth data from a central device
import board
import neopixel

from adafruit_ble.uart_server import UARTServer

uart_server = UARTServer()
pixels = neopixel.NeoPixel(board.NEOPIXEL, 10, brightness=0.25, auto_write=True)

while True:
    uart_server.start_advertising()
    print("Is advertising")
    while not uart_server.connected:
        pass

    while uart_server.connected:
        print("Is connected")
        data = bytearray(uart_server.read(4))
        if len(data) is not 0:
            print(data)
            r = data[1]
            g = data[2]
            b = data[3]
            pixels.fill((r, g, b))
        
