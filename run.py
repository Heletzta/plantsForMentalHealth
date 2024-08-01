# run.py

import json
import requests

params = {
  'api_key': '{API_KEY}',
  'start_value_override': json.dumps({'filter': 'night'}),
}
r = requests.post(
    'https://www.parsehub.com/api/v2/projects/{PROJECT_TOKEN}/run',
    data=params)