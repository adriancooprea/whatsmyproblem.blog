# Self-hosted fonts

The CSS in `src/styles/global.css` expects these exact filenames in this
directory. No Google Fonts CDN — self-host only.

| Filename                            | Source                                                                                          |
| ----------------------------------- | ----------------------------------------------------------------------------------------------- |
| `SpaceGrotesk-Variable.woff2`       | https://fonts.google.com/specimen/Space+Grotesk — variable, latin subset (wght 300–700)         |
| `EBGaramond-Variable.woff2`         | https://fonts.google.com/specimen/EB+Garamond — variable, latin (wght 400–700)                  |
| `EBGaramond-Italic-Variable.woff2`  | same — italic variable, latin                                                                    |
| `MaterialSymbolsOutlined.woff2`     | https://fonts.google.com/icons — Material Symbols Outlined, variable (opsz/wght/FILL/GRAD)       |

Headlines + labels use Space Grotesk; body uses EB Garamond; icons use
Material Symbols Outlined. The Material Symbols file is the full variable
font (~3.9 MB) — subset it (e.g. via `glyphhanger` / `fonttools`) to the
icons actually used before production if size matters.
