December 11, 2024

### 1. Merged new measurement/annotation switch functionality.
### 4. this is version 12.1.0.2


December 10, 2024

### 1. Merged new login code with permission settings.'
### 2. Added continuous measure mode button.
### 3. Added new configuration object src\assets\config\UIConfig.js that allow UI behaviour changes without recompiling.

Settings are then moved from src\assets\config\config.json to the new src\assets\config\UIConfig.js
"canLogin" : true,
"convertPDFAnnots" : true,

### 4. this is version 12.1.0.1


December 3, 2024

### 1. Fixed fill problem for rectangular measurement.
### 2. Zoom out is no longer limited to viewspace size.
### 3. Zoom in/out is now default for single page PDF files. Used to be vertical scroll.
### 4.Added button for comment list items to zoom to an annotation.
### 5.Added upload/export support for locally modified PDF files.

### 6. Added support for login, this require a woriking database back-end.
### 7. Added support for converting PDF annotations to Rasterex annotations.

These settings need to be turned on in src\assets\config\config.json

"canLogin" : true,
"convertPDFAnnots" : true,

November 15, 2024

### 1. Introduced versioning for UI project this is version 12.0.0.8. Value in src\app\app.component.ts uiversion
### 2. Updated src\rxstyles.scss with background color setting for 3D canvas to prevent visibility of other open files.


November 12, 2024

### 1. Consolidation update.
### 2. Thumbnails was not generated for all pages, fixed.
### 3. Configuration updated to support setting user name on startup.
### 4. Minified RxCore now reinstated as default RxCore in project.
### 5. Introduced versioning for UI project this is version 12.0.0.7. Value in src\app\app.component.ts uiversion : string = '12.0.0.7'


October 1, 2024

# 1. Comment Status Menu

Component Paths:
`src\app\app.module.t`
`src\app\components\annotation-tools\comment-status-icon\comment-status-icon.component.html`
`src\app\components\annotation-tools\comment-status-icon\comment-status-icon.component.scss`
`src\app\components\annotation-tools\comment-status-icon\comment-status-icon.component.spec.ts`
`src\app\components\annotation-tools\comment-status-icon\comment-status-icon.component.ts`
`src\app\components\annotation-tools\note-panel\note-panel-component.html`
`src\app\components\annotation-tools\note-panel\note-panel.component.scss`
`src\app\components\annotation-tools\note-panel\note-panel.component.ts`
`src\assets\scripts\rxcorefunctions.js`
`src\rxcore\constants\index.ts`

# 2. Separate annotate objects and measure objects

Component Path:
`src\app\components\top-nav-menu\top-nav-menu.component.ts`
`src\app\components\annotation-tools\note-panel\note-panel.component.ts`


September 30, 2024

# 1. Code merge for panel and menu states.

September 27, 2024

# 1. Code merge of fixed comment list to make it stay open when switching between files.

Component Paths: `src\app\components\annotation-tools\note-panel\note-panel.component.ts`
                 `src\app\components\annotation-tools\annotation-tools.component.ts`

# 2. Fixed issue with canvas scaling on startup not working correctly.

Component Paths: `src\app\app.component.ts`


September 26, 2024

# 1. Code merge of fixed comment list with corrected comment reply listing.

Component Paths: `src\app\components\annotation-tools\note-panel\note-panel.component.html`
                 `src\assets\scripts\rxcorefunctions.js`


September 20, 2024

# 1. Code merge of new Text search and PDF page manipulation functions.
# 2. Code merge of new stamps, symbols and images functionality.
# 3. Fixed JavaScript printed only first page problem.
# 4. Fixed problem with thumbnails for other formats than PDF not working.
# 5. Fixed problem with undo redo restoring annoation with correct page number property.

# 6. Added new sort functions for comment list.

Component Paths: `src\app\components\annotation-tools\note-panel\note-panel.component.ts`
                 `src\assets\scripts\rxcorefunctions.js`

# 7. Added new download PDF method to download PDF modified in client.


July 07, 2024

# 1. Added rx-search-panel component

Component Path: `components/annotation-tools/search-panel`

# 2. Modified the annotation-tools.service.ts

### Added searchPanelState to control the visibility of the search-panel.

# 3. Modified Top Nav Menu

### Added a button to the Top Nav Menu template.

### Added two functions: `onCommentPanelSelect` and `onSearchPanelSelect` to control visibility.

# 4. Modified app template

### Added rx-search-panel to the template.

### Imported a pipe from `components/annotation-tools/search-panel` to highlight the search text.

# 5. Modified RxCore & rxcorefunctions.js

### Created functions:

- `documentTextSearch`
- `markupDocumentSearchResult`
- `markupTextWithOrange`
- `onGuiDocumentSearch`
