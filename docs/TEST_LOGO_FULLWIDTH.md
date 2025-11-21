# Testing Guide: Full-Width Logo & Company Icon Update

**Date:** January 11, 2025  
**Purpose:** Verify logo fills entire navigation width and company icon displays correctly

---

## 🎯 What to Test

### 1. Navigation Logo Size - Desktop

**Test on screens >768px wide:**

✅ **Expected Behavior:**
- Logo should fill the ENTIRE width of the logo container area
- Logo should be the LARGEST element on the navigation bar
- Logo should NOT be capped at 550px anymore
- Logo should grow with wider screens (test at 1400px, 1600px, 1920px)
- Navigation menu items should be smaller and take minimal space
- Logo should maintain aspect ratio (no distortion)

**How to Test:**
1. Open any page (index.html, about.html, services.html, etc.)
2. View on desktop browser at full width
3. Check that logo dominates the navigation bar
4. Try resizing browser window wider - logo should grow
5. Scroll down - logo should maintain full width even when navbar scrolls

---

### 2. Navigation Logo Size - Mobile

**Test on screens ≤768px wide:**

✅ **Expected Behavior:**
- Logo should still be prominent but slightly reduced for UI balance
- Mobile: 90% width (not scrolled), 85% (scrolled)
- Small mobile (<480px): 80% width
- Logo should NOT be cut off or overflow
- Hamburger menu should be visible and functional
- Logo should maintain aspect ratio

**How to Test:**
1. Open browser DevTools (F12)
2. Switch to mobile view (toggle device toolbar)
3. Test at these widths:
   - 768px (tablet boundary)
   - 480px (small mobile)
   - 375px (iPhone SE)
   - 320px (smallest mobile)
4. Check that logo scales proportionally
5. Tap hamburger menu - should work smoothly

---

### 3. Company Icon in Footer

**Test on ALL 6 main pages:**

✅ **Pages to Check:**
- ✅ index.html (Homepage)
- ✅ about.html (About page)
- ✅ method.html (Method page)
- ✅ services.html (Services page)
- ✅ insights.html (Insights page)
- ✅ contact.html (Contact page)

✅ **Expected Behavior:**
- New square company logo should appear in footer "Follow us:" section
- Logo should have white background with 4px padding
- Logo should be in the "Company LinkedIn" link (second LinkedIn link)
- Founder's photo should remain in "Founder's LinkedIn" link (first link)
- Both icons should be circular containers (32px x 32px)
- Company icon should NOT have blue background or LinkedIn filter
- Logo should be clearly visible and not distorted

**How to Test:**
1. Scroll to bottom of each page
2. Locate "Follow us:" section in footer
3. Verify two LinkedIn links:
   - **First link**: Founder's LinkedIn (Dr. Rahul's photo)
   - **Second link**: Company LinkedIn (NEW square GTC logo)
4. Check company logo:
   - White background ✓
   - Square GTC logo with DNA helix ✓
   - No blue filter ✓
   - Properly contained in circular frame ✓
5. Hover over links - should translate 5px to right
6. Click links - should open correct LinkedIn pages in new tab

---

### 4. Cross-Browser Testing

**Test in multiple browsers:**

✅ **Browsers to Test:**
- Chrome/Edge (Chromium)
- Firefox
- Safari (Mac/iOS)
- Mobile browsers (Chrome Mobile, Safari Mobile)

✅ **What to Verify:**
- Logo displays full-width consistently
- No layout breaking or overflow
- Company icon displays with proper styling
- Smooth transitions work in all browsers
- No console errors

---

### 5. Responsive Breakpoints

**Test at these specific widths:**

| Width | Expected Logo Behavior | Notes |
|-------|------------------------|-------|
| 1920px | 100% (very large) | Logo should dominate navbar |
| 1400px | 100% (large) | Logo fills container |
| 1024px | 100% | Tablet landscape |
| 768px | 90% | Mobile start |
| 480px | 80% | Small mobile |
| 375px | 80% | iPhone SE |
| 320px | 80% | Minimum width |

**How to Test:**
1. Open DevTools (F12)
2. Click "Toggle device toolbar" (Ctrl+Shift+M)
3. Select "Responsive" mode
4. Manually set widths to test each breakpoint
5. Check logo sizing matches expectations
6. Verify no horizontal scrollbar appears

---

### 6. Performance Check

✅ **Expected Performance:**
- Logo loads immediately (no lazy loading delay)
- Smooth transitions on scroll (60fps)
- No layout shift (CLS) when logo loads
- Company icons load quickly in footer
- No janky animations

**How to Test:**
1. Open DevTools → Network tab
2. Refresh page (clear cache)
3. Check logo image loads in <500ms
4. Verify smooth scroll behavior
5. Use Performance tab to check for 60fps animations

---

## 🚨 Known Issues to Watch For

### Potential Problems:

1. **Logo too large on ultra-wide screens**
   - If logo looks absurdly large on 2560px+ screens, this is expected behavior
   - User specifically requested "fill entire width"
   - Can be adjusted if needed with new max-width constraint

2. **Navigation menu wrapping**
   - On very small screens, nav menu might wrap to second line
   - This is expected and handled by mobile hamburger menu

3. **Company icon not displaying**
   - Check network tab for 404 errors on image URL
   - Verify URL: `6b7e646ffb729452f8f09da8406e5ab1`
   - Ensure image is accessible

4. **Old icon cached**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - Clear browser cache if old icon persists

---

## ✅ Success Criteria

**All tests pass if:**
- ✅ Logo fills complete navigation width on desktop
- ✅ Logo is clearly the LARGEST element on navbar
- ✅ Logo scales responsively on mobile/tablet
- ✅ New company icon displays on all 6 pages
- ✅ Company icon has white background, no filters
- ✅ Footer LinkedIn links work correctly
- ✅ No layout breaking or console errors
- ✅ Smooth transitions maintained

---

## 📝 Testing Checklist

Copy and use this checklist:

```
DESKTOP TESTING (>768px):
[ ] Logo fills full navigation width
[ ] Logo grows on wider screens
[ ] Logo is largest element on navbar
[ ] Smooth transition on scroll
[ ] No distortion or pixelation

MOBILE TESTING (≤768px):
[ ] Logo sized at 90% on mobile
[ ] Logo sized at 80% on small mobile
[ ] Hamburger menu works
[ ] No overflow or cut-off
[ ] Responsive at all breakpoints

COMPANY ICON (all 6 pages):
[ ] index.html - New icon displays
[ ] about.html - New icon displays
[ ] method.html - New icon displays
[ ] services.html - New icon displays
[ ] insights.html - New icon displays
[ ] contact.html - New icon displays
[ ] White background, no filters
[ ] Circular container 32px
[ ] Links open correct LinkedIn pages

CROSS-BROWSER:
[ ] Chrome - All features work
[ ] Firefox - All features work
[ ] Safari - All features work
[ ] Mobile browsers - All features work

PERFORMANCE:
[ ] Logo loads quickly (<500ms)
[ ] Smooth 60fps animations
[ ] No layout shift
[ ] No console errors
```

---

## 🔧 Quick Fixes

**If logo doesn't fill width:**
```css
/* Check css/logo-footer-mobile-updates.css */
.logo-img {
    max-width: 100% !important;  /* Should be 100%, not 550px */
}
```

**If company icon doesn't display:**
```html
<!-- Check HTML files, should be: -->
<img src="https://page.gensparksite.com/v1/base64_upload/6b7e646ffb729452f8f09da8406e5ab1" alt="Gene Therapy Consultancy">
```

**If old icon still shows:**
- Hard refresh: Ctrl+Shift+R
- Clear cache and cookies
- Check DevTools → Network tab for cached resources

---

## 📞 Report Issues

If you find any issues during testing:

1. Take screenshot showing the problem
2. Note browser and screen size
3. Check console for errors (F12 → Console)
4. Note which page has the issue
5. Describe expected vs. actual behavior

---

**Ready to Test!** 🚀

Start with desktop view on index.html and work through the checklist systematically.
