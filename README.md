# WoW Vanilla+ Talent Calculator

CSS-grid based talent calculator  
Usable talent calculator hosted here: https://hawaiisa.github.io/vanillaplus-talent-calculator/
## Features

- URL encoded app state (for shareable talent builds)
- Code splitting per class
- Viewport-aware tooltip
- Authentic, raster-based game assets used for UI

## Wishlist / todo  
 
~~- Better tooltip positioning for mobile layout.~~ (Attempted fix implemented, please tell if new issues appear)
- Make it impossible to remove talents below the needed amount of talent points according to the selected tiers.

## Importing DBC files
DBC files can be imported manually or automatically extracted from e.g. patch-3.mpq
### Requirements for Manual Data Extraction
- MPQ Editor http://www.zezula.net/en/mpq/download.html
- WDBX Editor https://github.com/WowDevTools/WDBXEditor

1. Export DBC folder from `Patch-3.mpq` using the MPQ Editor.
2. Open `Spell.dbc` in WDBX Editor and Export -> To Json
3. Repeat for `SpellIcon.dbc`, `Talent.dbc`
4. Place exported jsons to `src/trees/DBC/json`

### Automatic Data Extraction
1. Place `patch-3.MPQ` inside `src/trees/DBC` (check for case sensitivity in filename and path)
2. Run `npx tsx ./src/trees/DBC/extractor.ts` from the root of the solution

## Generating Talent Trees
Trees are generated based on dbc files located at in src/trees/DBC
To generate talent trees run the following command from the root of the solution:
`npx tsx ./src/trees/generator/generateTrees.ts`
You can view generated talent trees in each class' respective folder, these can be edited manually and are never generated automatically.
`src/trees/<class name>/<specialization name>.json`

## Acknowledgments
MPQ Extraction CLI by https://github.com/TheGrayDot/mpqcli
DBC Manipulation by https://github.com/sebyx07/wow-dbcfile-node