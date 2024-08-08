import configparser

CONFIG = configparser.ConfigParser()
CONFIG.read('config.ini')
SETTINGS = CONFIG['DEFAULT']