# PacMan leikur gerður í Javascript

## Upplýsingar

PacMan verkefni fyrir FORR3JS áfangan

| Takki   | Aðgerð                               |
|---------|--------------------------------------|
| Space   | Spila / halda áfram                  |
| W/A/S/D | Hreyfa pacman                        |
| Snerta  | Spila / Halda áfram / fullscreen     |
| Draga   | Hreyfa pacman                        |

## Build

Leikurinn er gerður í sér skjölum og síðan samsettur með (build.py)[build.py] python skriftuni

Til að nota það þarf að gefa því template og output

Dæmi

```
python build.py template.html output.html
```

Aðgerðir sem er hægt að gera með skriftuni eru:

| Aðgerð                 | Upplýsingar                                                  |
|------------------------|--------------------------------------------------------------|
| //#style <filename>    | Býr til html style tag og setur allt frá skránni inní það    |
| //#script <filename>   | Býr til html script tag og setur allt frá skránni inní það   |
| //#include <filename>  | Setur allt frá skrá inní þessa skrá (eins og #include frá C) |

