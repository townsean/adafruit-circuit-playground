# Receives Bluetooth data from a central device
import board
import neopixel

from adafruit_ble.uart_server import UARTServer
from adafruit_bluefruit_connect.packet import Packet
from adafruit_bluefruit_connect.color_packet import ColorPacket

uart_server = UARTServer()

pixels = neopixel.NeoPixel(board.NEOPIXEL, 10, brightness=1, auto_write=True)

while True:
    uart_server.start_advertising()
    print("Is advertising")
    while not uart_server.connected:
        pass

    while uart_server.connected:
        print("Is connected")
        data = bytearray(uart_server.read(4))
        if len(data) is not 0:
            r = data[1]
            g = data[2]
            b = data[3]
            pixels.fill((r, g, b))
        
