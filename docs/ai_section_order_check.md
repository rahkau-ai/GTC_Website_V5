# AI Section Order Analysis

Based on line numbers from grep results:

## Current Section Order:
1. **Line 2126**: `engagement-models` section
2. **Line 2183**: ROI Guarantee (within engagement-models section)
3. **Line 2192**: `ai-audit` section  
4. **Line 2249**: `ai-education` section
5. **Line 2306**: `ai-implementation` section
6. **Line 2482**: Footer "Ready to Transform Your Gene Therapy Program?"

## Issue Identified:
The order is NOT correct according to user requirements. It should be:
1. 3 AI services (ai-audit, ai-education, ai-implementation) 
2. engagement-models 
3. ROI guarantee
4. Footer

## Current Order Issues:
- engagement-models comes BEFORE the 3 AI services (should be after)
- ROI guarantee is within engagement-models (correct)
- AI services come after engagement-models (should be before)

## Required Fix:
Need to reorder so AI services come first, then engagement-models with ROI guarantee.