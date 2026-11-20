"""Prints the spans of speech in a recorded line, split at the pauses between its phrases. The start of a
span is when a word of a spoken list begins, which is when its mark on screen has to appear.
    py -3 film/tools/phrases.py <clip.wav> [shortest pause in seconds, default 0.1]
Takes a 16-bit WAV, such as the cut clips in film/voice/cut. Two words spoken without a pause come out as one
span; divide that span by ear or by the words' lengths."""
import math, struct, sys, wave

w = wave.open(sys.argv[1])
sr, n = w.getframerate(), w.getnframes()
x = struct.unpack('<%dh' % (n * w.getnchannels()), w.readframes(n))[::w.getnchannels()]
gap = float(sys.argv[2]) if len(sys.argv) > 2 else 0.1
hop = sr // 100
db = [10 * math.log10(sum(v * v for v in x[i:i + hop]) / hop + 1e-9) for i in range(0, len(x) - hop, hop)]
# Speech is anything within 26 dB of the clip's own loud speech.
loud = sorted(db)[int(len(db) * 0.98)]
spans, start, quiet = [], None, 0
for i, d in enumerate(db):
    if d > loud - 26:
        if start is None:
            start = i
        quiet = 0
    elif start is not None:
        quiet += 1
        if quiet * 0.01 >= gap:
            spans.append((start * 0.01, (i - quiet + 1) * 0.01))
            start = None
if start is not None:
    spans.append((start * 0.01, len(db) * 0.01))
print(' '.join('%.2f-%.2f' % s for s in spans))
