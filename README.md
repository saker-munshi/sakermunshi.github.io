# Portfolio website (HTML, CSS, JavaScript)

Pages: index.html (Home), skills.html, projects.html, achievements.html, publications.html, contact.html.
All your content lives in **js/data.js**. You do not need to edit the HTML files.

## 0. Add your own files
- images/profile.jpg  (your photo)
- images/cv.pdf       (your CV)
- Edit js/data.js: name, about, skills, projects, achievements, publications.
- Project buttons: `github` = repository link (View code), `live` = Vercel link (View project).

## 1. Email to you (EmailJS, free)
1. Sign up at emailjs.com and add an Email Service (Gmail). Copy the Service ID.
2. Create a Template. Subject: `New message from {{from_name}}`.
   Body: Name {{from_name}}, Email {{from_email}}, Phone {{phone}}, Message {{message}}.
   Set "To email" to your own address and "Reply-To" to {{reply_to}}. Copy the Template ID.
3. Copy your Public Key from Account > General.
4. Paste the three values into `contact.emailjs` in js/data.js.

## 2. Track every sender (Google Form + Google Sheet in your Drive)
1. Create a Google Form with 4 short-answer questions: Name, Email, Phone, Message.
2. In the Form: Responses > Link to Sheets. Every message is now saved as a row in your Drive.
3. Get the form action URL: open the Form's preview, right-click > View page source, search for
   `formResponse` or take the form link and replace `/viewform` with `/formResponse`.
4. Get the entry ids: in the preview page source search `entry.` (e.g. entry.123456789), one per question.
5. Paste them into `contact.googleForm` in js/data.js.

## 3. Publish
1. Push this folder to a GitHub repository.
2. On vercel.com choose "Add New Project", import the repository and click Deploy.
3. Every later `git push` updates the live site.
