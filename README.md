# WoW Vanilla+ Talent Calculator
Forked from https://github.com/hawaiisa/vanillaplus-talent-calculator and https://github.com/maladr0it/classic-talent-calculator. All credits for the UI part go to maladr0it.
CSS-grid based talent calculator  
Usable talent calculator hosted here: https://andser99.github.io/vanillaplus-talent-calculator/
## Features

- URL encoded app state (for shareable talent builds)
- Code splitting per class
- Viewport-aware tooltip
- Authentic, raster-based game assets used for UI
- NEW - Talent tree generator from patch.mpq developed by 
## Wishlist / todo  
 
~~- Better tooltip positioning for mobile layout.~~ (Attempted fix implemented, please tell if new issues appear)
- Make it impossible to remove talents below the needed amount of talent points according to the selected tiers.

## Importing DBC files
DBC files can be imported manually or automatically extracted from e.g. patch-3.mpq
### Requirements for Manual Data Extraction
- MPQ Editor http://www.zezula.net/en/mpq/download.html
- WDBX Editor https://github.com/WowDevTools/WDBXEditor

1. Export DBC folder from `patch-3.mpq` using the MPQ Editor. (mpq name may vary, this one is from Vanilla+)
2. Open `Spell.dbc` in WDBX Editor and Export -> To Json
3. Repeat for `SpellIcon.dbc`, `Talent.dbc`
4. Place exported jsons to `src/trees/DBC/json`

### Automatic Data Extraction
Linux only at the moment, anyone can fill up the missing windows commands inside `extractor.ts`, exe is already included in the solution `mpqcli-windows.exe`. There is `const skipDownload = true;` row in the `extractor.ts` that is used to download the Vanilla+ patch-3.mpq directly from the website if set to false.
1. Place `patch-3.MPQ` inside `src/trees/DBC` (check for case sensitivity in filename and path)
2. Run `npx tsx ./src/trees/DBC/extractor.ts` from the root of the solution

### Extractor Components
1. Downloader - can be disabled in `extractor.ts` and address configured.
2. MPQ Extractor - can be disabled in `extractor.ts`
3. DBC Extractor - always enabled when extracting.

## Generating Talent Trees
Trees are generated based on dbc files located at in src/trees/DBC
To generate talent trees run the following command from the root of the solution:
`npx tsx ./src/trees/generator/generateTrees.ts`
You can view generated talent trees in each class' respective folder, these can be edited manually and are never generated automatically.
`src/trees/<class name>/<specialization name>.json`

## Acknowledgments
MPQ Extraction CLI by https://github.com/TheGrayDot/mpqcli
DBC Manipulation by https://github.com/sebyx07/wow-dbcfile-node