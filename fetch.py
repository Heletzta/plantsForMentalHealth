# fetch.py

import requests
import os

params = {
  'api_key': 'tW5orKdv337w',
}
r = requests.get(
    'https://www.parsehub.com/api/v2/projects/tRqEuG1uEwNX/last_ready_run/data',
    params=params)

with open('tmp/events.tmp.json', 'w', encoding="utf-8") as f:
  f.write(r.text)

os.rename('tmp/events.tmp.json', 'tmp/events.json')