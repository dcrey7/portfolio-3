# Liquid Glass Effect Implementation

**Date:** January 9, 2026
**Last Updated:** Session 4 - Fixed hover tracking + timing issues

---

## Overview

Implemented Apple-inspired Liquid Glass effect with real WebGL refraction for the portfolio. The effect creates glass-like tiles with:
- **Proper rounded corners** matching CSS border-radius
- **Edge-based refraction** (stronger at edges, not pillow effect)
- **Anti-aliased edges** for smooth corners
- **Animated specular highlights** for realistic glass

---

## Final Implementation

### Key Features

1. **Signed Distance Function (SDF)** for accurate rounded rectangle masking
2. **Anti-aliased edges** using smoothstep blending (1.5px range)
3. **Per-tile border-radius** detection from CSS
4. **Edge-based refraction** - distortion stronger at tile edges
5. **Chromatic aberration** at edges
6. **Animated specular highlights** (moving light spots)

### Shader Architecture

```
Pass 1: Render animated background to WebGLRenderTarget
Pass 2: Refraction shader
        - Check if pixel is inside any tile bounds
        - Use SDF to check if inside rounded rectangle
        - Apply anti-aliased mask at edges
        - Compute edge-based refraction offset
        - Sample background with chromatic aberration
        - Add specular highlights
        - Blend with background using AA mask
```

### SDF for Rounded Rectangle

```glsl
float sdRoundedBox(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + vec2(r);
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}
```

### Anti-Aliased Masking

```glsl
// mask = 1 inside, 0 outside, smooth at edge
float mask = 1.0 - smoothstep(-1.5, 1.5, sdf);

// Blend glass effect with background
color = mix(background, glassEffect, mask);
```

### Default Parameters

```javascript
refractionStrength: 0.8   // Edge refraction amount
bevelDepth: 0.12          // Extra bevel intensity
enableSpecular: true      // Animated light spots
```

---

## Files Modified

| File | Status | Description |
|------|--------|-------------|
| `webgl.js` | Final version | SDF rounded corners + anti-aliased edges |
| `styles.css` | Unchanged | Transparent tiles with border-radius: 16px |
| `index.html` | Unchanged | Basic structure |

---

## Console Commands

```javascript
// Adjust effect parameters
window.setGlassParams({
    refractionStrength: 0.8,
    bevelDepth: 0.12,
    enableSpecular: true
});

// Presets
window.glassPresets.subtle();   // Light effect
window.glassPresets.medium();   // Default
window.glassPresets.strong();   // More visible
window.glassPresets.extreme();  // Maximum

// Debug mode - shows red overlay on tile areas
window.debugGlass();      // Turn on
window.debugGlass(false); // Turn off

// Update tile positions after DOM changes
window.updateTilePositions();
```

---

## Technical Notes

### Why Custom Implementation vs liquidGL

- **liquidGL** uses html2canvas for static snapshots
- Our portfolio has an **animated** WebGL background
- Custom implementation samples live background texture every frame
- Animation flows through glass tiles in real-time

### SDF Precision Fix

The key issue was using a hard `sdf > 0` check which caused floating-point precision issues at edges. Fixed by using anti-aliased smoothstep:

```glsl
// OLD (caused shrinking)
if (sdf > 0.0) discard;

// NEW (proper anti-aliasing)
float mask = 1.0 - smoothstep(-1.5, 1.5, sdf);
color = mix(background, glass, mask);
```

### Border-Radius Detection

Each tile's CSS border-radius is read and passed to the shader:

```javascript
const borderRadius = parseFloat(style.borderRadius) || 16;
refractionMaterial.uniforms.tileRadius.value[i] = borderRadius;
```

---

## Session 4 Fixes

### 1. Hover/Click Tracking

Tiles have CSS transitions on hover (`translateY(-2px)`) and active (`scale(0.97)`). The glass effect now follows these transformations in real-time.

```javascript
// Continuous position updates during CSS transitions
function animateTilePositions(duration = 250) {
    const startTime = performance.now();
    function update() {
        updateTilePositions();
        if (performance.now() - startTime < duration) {
            requestAnimationFrame(update);
        }
    }
    update();
}

// Attached to mouseenter, mouseleave, mousedown, mouseup events
```

### 2. Page Load Timing Fix

Previously, tile positions were captured inconsistently on page load (size varied on each refresh). Fixed by:

1. Changed from `DOMContentLoaded` to `window.load` event
2. Multiple position updates at different intervals (100ms, 500ms, 1000ms)
3. Using `requestAnimationFrame` for initial update

```javascript
// Multiple updates ensure layout is fully stable
requestAnimationFrame(() => updateTilePositions());
setTimeout(() => updateTilePositions(), 100);
setTimeout(() => updateTilePositions(), 500);
setTimeout(() => updateTilePositions(), 1000);
```

### 3. Fixed SDF Variable Bug

The refraction shader was using an undefined `sdf` variable. Fixed by calculating SDF properly:

```glsl
// Calculate SDF for proper edge-based refraction
vec2 pixelPos = centered * tileSize;
float sdf = sdRoundedBox(pixelPos, halfSize, cornerRadius);
```

### 4. View Transition Tracking

Added MutationObserver to watch for view changes (tile-grid show/hide) when navigating between overview and content views:

```javascript
// MutationObserver watches for class changes on tile-grid
// When tiles become visible, glass positions update automatically
```

### 5. Smooth Tile Position Interpolation

Added lerp-based interpolation for tile positions so glass follows tiles smoothly instead of jumping:

```javascript
const tileLerpFactor = 0.25;
// Every frame, current positions lerp toward target positions
currentTileBounds[i].x += (targetTileBounds[i].x - currentTileBounds[i].x) * tileLerpFactor;
```

### 6. Reduced White Shine (Specular)

Reduced the specular highlight intensity that was causing noticeable white shine on tiles:
- Specular highlights: 0.06/0.05 → 0.02/0.015 (70% reduction)
- Edge brightening: 0.02 → 0.008 (60% reduction)

Added `noShine` preset to completely disable specular while keeping refraction:
```javascript
window.glassPresets.noShine(); // Refraction without white shine
```

---

## Visual Result

- Glass effect matches tile shape including rounded corners
- Edge-based refraction (not pillow/dome effect)
- Animated background flows through tiles in real-time
- Subtle animated specular highlights
- Smooth anti-aliased edges
- Apple-like liquid glass aesthetic
- **NEW:** Glass follows tile hover/click animations
- **NEW:** Consistent sizing on page load
