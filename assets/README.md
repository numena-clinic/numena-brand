# Numena Brand Assets

Binaries, source artwork, and the licensing rules for each. Third-party licensed files are **not** committed to this public repository.

## Licensing summary

| Path | In git | License / status |
| --- | --- | --- |
| `logo/` | yes | © Numena, all rights reserved. Original brand marks. |
| `illustrations/` | yes | © Numena, all rights reserved. |
| `images/` | yes | Original / produced for Numena. See [provenance](#images) note. |
| `fonts/` | **no** | Commercial web fonts — see below. |

## `fonts/` — why it stays out of git

The Tiempos family (Text, Headline, Fine) is a commercial typeface from Klim Type Foundry (`klim.co.nz`). The web-font license grants Numena the right to self-host these WOFF2 files for the Numena product; it does **not** grant redistribution. Committing them to a public repository would breach the license.

If the fonts ever need to move into version control, they must live in a private, access-controlled location and be pulled into builds from there — never from a public repo.

## `images/`

Provenance: produced for Numena / placeholders for product surfaces. If any image is AI-generated or sourced elsewhere, confirm the generator's terms permit public redistribution before relying on it here.

## Adding new assets

Before committing any asset, confirm its license permits redistribution in a public repository, and record it here so the matrix stays current.