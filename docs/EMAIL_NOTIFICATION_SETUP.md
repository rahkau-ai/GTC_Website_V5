# 📧 Email Notification Setup Guide

## Overview

This guide explains how to set up email notifications so you're automatically notified when someone submits a form on your website.

---

## 🎯 What You'll Get

When a user submits any of the three forms, you'll receive an email containing:
- ✅ Form type (Services, Resources, or Expert Network)
- ✅ Submitter's name and contact details
- ✅ All form data
- ✅ Timestamp of submission
- ✅ Direct link to view full details in admin dashboard

---

## 🔧 Setup Options

### **Option 1: EmailJS (Recommended - Easiest)**

EmailJS is a free service that sends emails directly from JavaScript without needing a backend server.

#### Step-by-Step Setup:

1. **Create EmailJS Account**
   - Go to [https://www.emailjs.com/](https://www.emailjs.com/)
   - Click "Sign Up" and create a free account
   - Free tier includes 200 emails/month (upgrade for more)

2. **Add Email Service**
   - In EmailJS dashboard, click "Add New Service"
   - Choose your email provider (Gmail recommended)
   - Follow the prompts to connect your email
   - Note your **Service ID**

3. **Create Email Templates**
   
   **Template 1: Services Inquiry Notification**
   ```
   Subject: New Services Inquiry from {{from_name}}
   
   You have a new services inquiry:
   
   Name: {{from_name}}
   Email: {{from_email}}
   Company: {{company}}
   Phone: {{phone}}
   
   Service Interest: {{service_interest}}
   Project Stage: {{project_stage}}
   Urgency: {{urgency}}
   Budget Range: {{budget_range}}
   
   Message:
   {{message}}
   
   Submitted: {{submitted_at}}
   
   View full details in your admin dashboard.
   ```
   
   **Template 2: Resource Download Notification**
   ```
   Subject: New Resource Download Request from {{from_name}}
   
   Someone downloaded resources:
   
   Name: {{from_name}}
   Email: {{from_email}}
   Company: {{company}}
   Job Title: {{job_title}}
   
   Resource Requested: {{resource_interest}}
   Therapeutic Area: {{project_focus}}
   Current Challenge: {{current_challenge}}
   
   Newsletter Subscription: {{newsletter}}
   
   Submitted: {{submitted_at}}
   ```
   
   **Template 3: Expert Application Notification**
   ```
   Subject: New Expert Network Application from {{from_name}}
   
   New expert application received:
   
   Name: {{from_name}}
   Email: {{from_email}}
   Phone: {{phone}}
   LinkedIn: {{linkedin_profile}}
   
   Current Position: {{current_position}}
   Experience: {{years_experience}}
   
   Expertise Areas: {{expertise_areas}}
   Therapeutic Areas: {{therapeutic_areas}}
   Availability: {{consulting_availability}}
   Rate: {{rate_expectation}}
   
   Motivation:
   {{motivation}}
   
   Submitted: {{submitted_at}}
   
   View full application in your admin dashboard.
   ```

4. **Get Your Credentials**
   - Service ID: From "Email Services" page
   - Template IDs: From each template you created
   - Public Key: From "Account" → "API Keys"

5. **Update the Code**
   
   In `js/form-handler.js`, replace the `sendEmailNotification` function (around line 180):

   ```javascript
   async function sendEmailNotification(formType, data) {
       // Initialize EmailJS (do this once when page loads)
       if (!window.emailjs_initialized) {
           emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your public key
           window.emailjs_initialized = true;
       }
       
       try {
           let templateId;
           let templateParams = {
               to_email: 'info@genetherapyconsultancy.com', // Your email
               from_name: data.full_name,
               from_email: data.email,
               submitted_at: new Date(data.submitted_at).toLocaleString()
           };
           
           // Set template based on form type
           if (formType === 'services') {
               templateId = 'YOUR_SERVICES_TEMPLATE_ID';
               templateParams = {
                   ...templateParams,
                   company: data.company,
                   phone: data.phone || 'Not provided',
                   service_interest: data.service_interest,
                   project_stage: data.project_stage,
                   urgency: data.urgency,
                   budget_range: data.budget_range,
                   message: data.message
               };
           } else if (formType === 'resources') {
               templateId = 'YOUR_RESOURCES_TEMPLATE_ID';
               templateParams = {
                   ...templateParams,
                   company: data.company,
                   job_title: data.job_title || 'Not provided',
                   resource_interest: data.resource_interest,
                   project_focus: data.project_focus,
                   current_challenge: data.current_challenge || 'Not provided',
                   newsletter: data.subscribe_newsletter ? 'Yes' : 'No'
               };
           } else if (formType === 'expert') {
               templateId = 'YOUR_EXPERT_TEMPLATE_ID';
               templateParams = {
                   ...templateParams,
                   phone: data.phone,
                   linkedin_profile: data.linkedin_profile || 'Not provided',
                   current_position: data.current_position,
                   years_experience: data.years_experience,
                   expertise_areas: Array.isArray(data.expertise_areas) ? data.expertise_areas.join(', ') : data.expertise_areas,
                   therapeutic_areas: Array.isArray(data.therapeutic_areas) ? data.therapeutic_areas.join(', ') : data.therapeutic_areas,
                   consulting_availability: data.consulting_availability,
                   rate_expectation: data.rate_expectation,
                   motivation: data.motivation
               };
           }
           
           // Send email
           await emailjs.send('YOUR_SERVICE_ID', templateId, templateParams);
           console.log('Email notification sent successfully');
       } catch (error) {
           console.error('Email notification failed:', error);
           // Don't throw error - form submission should still succeed
       }
   }
   ```

6. **Add EmailJS SDK**
   
   Add this script tag before your `form-handler.js` in your HTML files:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
   <script src="js/form-handler.js"></script>
   ```

---

### **Option 2: Zapier (No Coding Required)**

Zapier can automatically send emails when new records are added to your database.

#### Setup Steps:

1. **Create Zapier Account**
   - Go to [https://zapier.com/](https://zapier.com/)
   - Sign up for free account

2. **Create New Zap**
   - Click "Create Zap"
   - Trigger: "Webhook" → "Catch Hook"
   - Copy the webhook URL provided

3. **Update Form Handler**
   
   In `js/form-handler.js`, add webhook call after successful database submission:
   ```javascript
   // After successful database submission
   await fetch('YOUR_ZAPIER_WEBHOOK_URL', {
       method: 'POST',
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify({
           form_type: formType,
           ...formData
       })
   });
   ```

4. **Configure Email Action**
   - Action: "Gmail" or "Email by Zapier"
   - To: info@genetherapyconsultancy.com
   - Subject: Dynamic based on form type
   - Body: Map form fields to email template

---

### **Option 3: Custom Backend (Most Flexible)**

If you have a backend server (Node.js, Python, etc.), you can send emails using:
- **Nodemailer** (Node.js)
- **SendGrid API**
- **Mailgun API**
- **Amazon SES**

This requires server-side setup and is beyond the scope of this static site.

---

## 🔔 Instant Notifications

### SMS Notifications via Twilio

Get instant SMS when forms are submitted:

1. **Sign up for Twilio** ([https://www.twilio.com/](https://www.twilio.com/))
2. **Get a Twilio phone number**
3. **Add to form handler:**
   ```javascript
   await fetch('https://api.twilio.com/2010-04-01/Accounts/YOUR_ACCOUNT_SID/Messages.json', {
       method: 'POST',
       headers: {
           'Authorization': 'Basic ' + btoa('YOUR_ACCOUNT_SID:YOUR_AUTH_TOKEN'),
           'Content-Type': 'application/x-www-form-urlencoded'
       },
       body: new URLSearchParams({
           To: '+1234567890', // Your phone
           From: '+1234567890', // Your Twilio number
           Body: `New ${formType} submission from ${data.full_name}`
       })
   });
   ```

---

## 📊 Notification Summary

| Method | Cost | Setup Time | Best For |
|--------|------|------------|----------|
| **EmailJS** | Free (200/mo) | 15 min | Most users |
| **Zapier** | Free (100/mo) | 20 min | No-code solution |
| **Twilio SMS** | Pay-per-use | 30 min | Instant alerts |
| **Custom Backend** | Varies | Hours | Advanced users |

---

## ✅ Recommended Setup

**For immediate deployment:**
1. ✅ Use **EmailJS** for email notifications (15 minutes)
2. ✅ Check **admin dashboard** daily for submissions
3. ✅ Set up **Zapier** later if you need more automation

---

## 🧪 Testing

After setup, test each form:

1. Submit test data through each form
2. Check your email inbox
3. Verify all fields are captured correctly
4. Check spam folder if emails don't arrive
5. Verify admin dashboard shows submissions

---

## 🔐 Security Note

**Important:** Never expose API keys or secrets in client-side code!

- ✅ EmailJS public key: Safe to use in browser
- ❌ Private API keys: Must be on server-side only
- ✅ Webhook URLs: Can be in client code
- ❌ Database credentials: Never in client code

---

## 📞 Support

If you need help setting up email notifications:

1. Check EmailJS documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
2. Review the code comments in `js/form-handler.js`
3. Test with console.log() to debug issues

---

## 🎯 Next Steps

1. Choose your notification method (EmailJS recommended)
2. Follow the setup steps above
3. Test all three forms
4. Monitor your inbox and admin dashboard
5. Adjust email templates as needed

**Your database is ready - just add notifications and you're all set!** 🚀
