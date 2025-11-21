# Contact Form Terms & Conditions Update Guide

## Issue: Terms Text Cannot Be Changed in HTML

The terms and conditions text you're seeing under the "Inquire About Our Services" form is **NOT** in the `contact.html` file. It's embedded inside the LeadConnectorHQ iframe form.

### Current Form Setup

**File**: `contact.html` (lines 125-143)

```html
<iframe
    src="https://api.leadconnectorhq.com/widget/form/tl7g5eIUWH5mUKYfOrfp"
    style="width:100%;height:600px;border:none;border-radius:3px"
    id="inline-tl7g5eIUWH5mUKYfOrfp" 
    data-form-name="Inquire About Our Services Short Form"
    ...
>
</iframe>
```

**Form ID**: `tl7g5eIUWH5mUKYfOrfp`

---

## How to Update the Terms Text

Since the form is hosted on LeadConnectorHQ (formerly HighLevel), you need to update the terms and conditions through their platform:

### Steps to Update:

1. **Log in to LeadConnectorHQ/HighLevel**
   - Go to: https://app.leadconnectorhq.com (or your custom domain)
   - Use your account credentials

2. **Navigate to Forms**
   - Go to **Sites** → **Forms** (or **Marketing** → **Forms**)
   - Find the form: "Inquire About Our Services Short Form"
   - Form ID: `tl7g5eIUWH5mUKYfOrfp`

3. **Edit the Form**
   - Click **Edit** on the form
   - Scroll down to the **Consent/Terms** section or **SMS Consent** fields

4. **Find the Consent Text**
   Look for these two text blocks:
   
   **Current Text Block 1 (Transactional):**
   ```
   By checking this box, I consent to receive transactional messages related to my account, orders, or services I have requested. These messages may include appointment reminders, order confirmations, and account notifications among others. Message frequency may vary. Message & Data rates may apply. Reply HELP for help or STOP to opt-out.
   ```

   **Current Text Block 2 (Marketing):**
   ```
   By checking this box, I consent to receive marketing and promotional messages, including special offers, discounts, new product updates among others. Message frequency may vary. Message & Data rates may apply. Reply HELP for help or STOP to opt-out.
   ```

5. **Replace with New Simplified Text**
   
   **New Text (Single Block):**
   ```
   By checking this box, I agree to our terms and conditions and to receive communications from Gene Therapy Consultancy. Unsubscribe anytime.
   ```

6. **Optional: Add Terms Link**
   If you want to link to actual terms and conditions page:
   ```
   By checking this box, I agree to our <a href="privacy-policy.html">terms and conditions</a> and to receive communications from Gene Therapy Consultancy. Unsubscribe anytime.
   ```

7. **Save the Form**
   - Click **Save** or **Update Form**
   - The changes will be reflected immediately in the embedded form

---

## Alternative Solution: Custom Terms Display

If you cannot access the LeadConnectorHQ form builder, you can add custom terms text below the form in the HTML:

### Option A: Add Text Below Form

**Add this after line 144 in contact.html:**

```html
                    </iframe>
                    <script src="https://link.msgsndr.com/js/form_embed.js"></script>
                    
                    <!-- Custom Terms Text -->
                    <div style="margin-top: 1.5rem; padding: 1rem; background: #f8f9fa; border-radius: 8px;">
                        <p style="font-size: 0.9rem; color: #666; text-align: center; margin: 0;">
                            <i class="fas fa-shield-alt" style="color: var(--primary-blue); margin-right: 0.5rem;"></i>
                            By submitting this form, you agree to our 
                            <a href="privacy-policy.html" style="color: var(--primary-blue); text-decoration: underline;">terms and conditions</a> 
                            and to receive communications from Gene Therapy Consultancy. Unsubscribe anytime.
                        </p>
                    </div>
                </div>
```

### Option B: Add as Note Above Form

**Add this after line 107 in contact.html:**

```html
            <div class="feature-card" style="margin-bottom: 3rem; padding: 2.5rem;">
                <!-- Privacy Note -->
                <div style="margin-bottom: 1.5rem; padding: 1rem; background: #e3f2fd; border-left: 4px solid var(--primary-blue); border-radius: 4px;">
                    <p style="font-size: 0.95rem; color: #333; margin: 0;">
                        <strong><i class="fas fa-info-circle" style="color: var(--primary-blue);"></i> Privacy & Communication:</strong> 
                        By submitting this form, you agree to our 
                        <a href="privacy-policy.html" style="color: var(--primary-blue); font-weight: 600;">terms and conditions</a> 
                        and to receive communications from Gene Therapy Consultancy. You can unsubscribe anytime.
                    </p>
                </div>
                
                <div class="contact-form" style="min-height: 600px; position: relative;">
```

---

## Recommended Approach

### **Primary Method**: Update via LeadConnectorHQ Platform
- Most professional
- Maintains form consistency
- Terms appear with checkbox
- Proper legal consent flow

### **Fallback Method**: Add HTML text below/above form
- Quick solution if platform access unavailable
- Still legally valid
- Clearly visible to users
- Easy to implement in contact.html

---

## Legal Considerations

The new simplified text should be acceptable for most use cases, but consider:

1. **Compliance**: Check if your jurisdiction requires specific language for SMS/email consent
2. **Terms Page**: Ensure you have a proper terms and conditions page (`terms.html` or linked in privacy policy)
3. **Unsubscribe**: Make sure unsubscribe functionality is working in your email system
4. **GDPR/CCPA**: If you serve EU or California users, review compliance requirements

---

## Current Form Links on Contact Page

1. **Inquire About Our Services** (Lines 125-143)
   - Form ID: `tl7g5eIUWH5mUKYfOrfp`
   - Update this form's terms and conditions

2. **Subscribe and Download Free Resources** (Lines 209-227)
   - Form ID: `VyW0dVdgfzTpmH5FeOxy`
   - Also check this form if it has similar terms text

---

## Testing After Update

After updating the terms text:

1. ✅ Visit contact page
2. ✅ Check form loads correctly
3. ✅ Verify new terms text displays
4. ✅ Test form submission
5. ✅ Confirm consent is recorded properly
6. ✅ Test unsubscribe link (if added)

---

## Need Help?

If you don't have access to LeadConnectorHQ or need the HTML fallback implemented, let me know and I can:
- Add custom terms text below/above the form in contact.html
- Create a proper terms and conditions page
- Link the terms text to privacy policy or dedicated terms page

---

## Summary

**Problem**: Terms text is inside LeadConnectorHQ iframe, not in contact.html

**Solution Options**:
1. Update via LeadConnectorHQ form builder (recommended)
2. Add custom HTML text below form (fallback)
3. Add custom HTML note above form (alternative)

**New Text**:
```
By checking this box, I agree to our terms and conditions and to receive 
communications from Gene Therapy Consultancy. Unsubscribe anytime.
```

Let me know which approach you'd like to implement!
