import json
import numpy as np


target_json = json.load(open('target.geojson'))
target_np = np.array(target_json['features'][0]['geometry']['coordinates'])

angle = np.linspace(np.pi, 0, len(target_np))
delta = np.ones((len(target_np), 2))
r = 8000/(6371000 * np.pi/180)
delta[:, 0] = delta[:, 0] * r * np.cos(angle)
delta[:, 1] = delta[:, 1] * r * np.sin(angle)
camera_np = target_np + delta

s = 'const routes={target:['
for i in range(len(target_np)):
    s += str(list(target_np[i])).replace(' ', '')
    s += ','
s = s[:-1]
s += '],camera:['
for i in range(len(camera_np)):
    s += str(list(camera_np[i])).replace(' ', '')
    s += ','
s = s[:-1]
s += ']}'
with open('routes.js', 'w') as f:
    f.write(s)
target_json['features'][0]['geometry']['coordinates'] = camera_np.tolist()

json.dump(target_json, open('camera.geojson', 'w'))
