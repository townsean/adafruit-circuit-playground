# Receives Bluetooth data from a central device
import board
import neopixel

from adafruit_ble.uart_server import UARTServer
from adafruit_bluefruit_connect.packet import Packet
from adafruit_bluefruit_connect.color_packet import ColorPacket

uart_server = UARTServer()

while True:
    uart_server.start_advertising()
    print("is advertising")
    while not uart_server.connected:
        pass

    while uart_server.connected:
        print(uart_server.read(1))
        packet = Packet.from_stream(uart_server)
        print("Is connected")
        print(packet)
        if isinstance(packet, ColorPacket):
            print(packet.color)
