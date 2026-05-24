# Self-hosted fonts

The CSS in `src/styles/global.css` expects these exact filenames in this
directory. Drop the files in and nothing else needs to change.

| Filename                              | Source                                                                                                |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `EBGaramond-Variable.woff2`           | https://github.com/octaviopardo/EBGaramond12 — `fonts/web/EBGaramond-VF.woff2` (rename)               |
| `EBGaramond-Italic-Variable.woff2`    | same repo — `fonts/web/EBGaramond-Italic-VF.woff2` (rename)                                           |
| `CormorantGaramond-Regular.woff2`     | https://fonts.google.com/specimen/Cormorant+Garamond → download → convert `Regular.ttf` → woff2       |
| `CormorantGaramond-Italic.woff2`      | same → `Italic.ttf` → woff2                                                                           |
| `JetBrainsMono-Regular.woff2`         | https://github.com/JetBrains/JetBrainsMono → `fonts/webfonts/JetBrainsMono-Regular.woff2`             |

Convert TTF → WOFF2 with `woff2_compress` or https://transfonter.org/.

No Google Fonts CDN. Self-host only.
