
window.PORTFOLIO = {
  owner: {
    name: "Saker Munshi",
    brand: "Saker Munshi",                      
    logo: "",                        
    role: "CSE Student & Researcher",
    tagline: "I do research on Explainable AI (XAI), and I enjoy turning ideas into working projects.",
    about: [
      "I am a Computer Science & Engineering student who enjoys web development, microcontrollers and research.",
      "I am looking for internships, research work and funded MS/PhD opportunities."
    ],
    facts: [
      ["University", "-University"],
      ["Location", "Dhaka, Bangladesh"],
      ["Email", "@gmail"],
     
    ],
    photo: "images/profile.png",       
    cv: "images/cv.pdf",               
    socials: {
      github: "https://github.com/your-username",
      linkedin: "https://www.linkedin.com/in/your-username",
      email: "mailto:you@example.com"
    }
  },

  skills: [         
    { group: "Programming", items: [
      { name: "C", icon: "c/c-original" },
      { name: "C++", icon: "cplusplus/cplusplus-original" },
      { name: "Python", icon: "python/python-original" },
      { name: "Java", icon: "java/java-original" } ] },
    { group: "Web", items: [
      { name: "HTML5", icon: "html5/html5-original" },
      { name: "CSS3", icon: "css3/css3-original" },
      { name: "JavaScript", icon: "javascript/javascript-original" },
      { name: "PHP", icon: "php/php-original" },
      { name: "React", icon: "react/react-original" } ] },
    { group: "Databases", items: [
      { name: "MySQL", icon: "mysql/mysql-original" },
      { name: "MongoDB", icon: "mongodb/mongodb-original" } ] },
    { group: "Embedded & AI", items: [
      { name: "Arduino", icon: "arduino/arduino-original" },
      { name: "TensorFlow", icon: "tensorflow/tensorflow-original" },
      { name: "Linux", icon: "linux/linux-original" } ] },
    { group: "Tools", items: [
      { name: "Git", icon: "git/git-original" },
      { name: "GitHub", icon: "github/github-original" },
      { name: "VS Code", icon: "vscode/vscode-original" },
      { name: "Figma", icon: "figma/figma-original" } ] }
  ],

  projects: [       
    { title: "Restaurant Management System", category: "Web Application",
      description: "Restaurant management web app with chef, order and menu modules built with PHP and MySQL.",
      tags: ["PHP", "MySQL", "XAMPP"], image: "",
      github: "https://github.com/your-username/rms",
      live: "https://your-project.vercel.app" },
    {  title: "Alian Invasion", category: "Games",
      description: "It is a shooting games. Alian ship approachs towards the battel ship.",
      tags: ["PYTHON"], image: "",
      github: "https://github.com/your-username/rms",
      live: "https://your-project.vercel.app" },
    { title: "Project Two", category: "Embedded System",
      description: "Short description of what the project does and what you built.",
      tags: ["C", "Arduino"], image: "",
      github: "https://github.com/your-username/project-two",
      live: "https://project-two.vercel.app" },
    { title: "Project Three", category: "AI / Machine Learning",
      description: "Short description of what the project does and what you built.",
      tags: ["Python", "TensorFlow"], image: "",
      github: "https://github.com/your-username/project-three",
      live: "https://project-three.vercel.app" }
    
  ],

   
  achievements: [
    { title: "Award or prize name", prize: "1st Prize", issuer: "Organizer", year: "2026",
      description: "One line about what you won and why.",
      certificate: "images/certificates/sample-certificate.svg" },
    { title: "Another achievement", prize: "Runner-up", issuer: "Organizer", year: "2025",
      description: "One line about it.",
      certificate: "" },
     { title: "Award or prize name", prize: "1st Prize", issuer: "Organizer", year: "2026",
      description: "One line about what you won and why.",
      certificate: "images/certificates/sample-certificate.svg" },
    { title: "Another achievement", prize: "Runner-up", issuer: "Organizer", year: "2025",
      description: "One line about it.",
      certificate: "" }


                       // 
  ],

  publications: [
  //  { title: "Title of your paper", venue: "Journal or conference", year: "2026",
   //   authors: "Your Name, Co-author", link: "" },

    { title: "I am currently working on it.It will update soon." }
  ],

  contact: {
    
    emailjs: { publicKey: "", serviceId: "", templateId: "" },

    
    googleForm: {
      action: "",   // https://docs.google.com/forms/d/e/FORM_ID/formResponse
      entries: { name: "", email: "", phone: "", message: "" }  // entry.123456789 ids
    }
  }
};
