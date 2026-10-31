#!/bin/bash
cd "$(dirname "$0")"
for f in fig-*.html; do
  n=${f%.html}
  dims=$(grep -o 'width:[0-9]*px;height:[0-9]*px' $f | head -1 | grep -o '[0-9]*')
  w=$(echo $dims | cut -d' ' -f1); h=$(echo $dims | cut -d' ' -f2)
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=8000 --screenshot="$(pwd -W)/../$n.png" --window-size=$w,$h --force-device-scale-factor=2 "file:///$(pwd -W)/$f" >/dev/null 2>&1
done
