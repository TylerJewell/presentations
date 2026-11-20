"""Finds the moments where a film's motion halts and then resumes. A camera move that stops for half a second
between two beats reads as a hesitation, and stills do not show it.
    py -3 film/tools/stops.py <film.mp4> [shortest stop in seconds, default 0.3]
A stop is a run of frames whose change from frame to frame falls under a third of the change around it, with
full motion directly before and after. A slow sway that turns round is not a stop, because it slows gradually.
Needs ffmpeg and Pillow."""
import statistics, subprocess, sys
from PIL import Image, ImageChops, ImageStat

film, shortest = sys.argv[1], float(sys.argv[2]) if len(sys.argv) > 2 else 0.3
W, H, FPS = 320, 180, 30
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', film, '-vf', f'fps={FPS},scale={W}:{H}', '-pix_fmt', 'gray', '-f', 'rawvideo', '-'],
                     capture_output=True).stdout
frames = [Image.frombytes('L', (W, H), raw[i:i + W * H]) for i in range(0, len(raw) - W * H + 1, W * H)]
change = [ImageStat.Stat(ImageChops.difference(a, b)).mean[0] for a, b in zip(frames, frames[1:])]
n, span = len(change), 2 * FPS
around = [statistics.median(change[max(0, i - span):i + span]) for i in range(n)]      # the motion within two seconds
low = [change[i] < 0.34 * around[i] for i in range(n)] + [False]
start, found = None, 0
for i, v in enumerate(low):
    if v and start is None:
        start = i
    elif not v and start is not None:
        before, after = change[max(0, start - 6):start - 1], change[i + 1:i + 6]
        abrupt = before and after and min(statistics.mean(before), statistics.mean(after)) > 0.7 * around[start]
        if (i - start) / FPS >= shortest and abrupt:
            print('%7.2f s to %7.2f s  (%.2f s)' % (start / FPS, i / FPS, (i - start) / FPS))
            found += 1
        start = None
print(f'{found} stops of {shortest} s or longer')
