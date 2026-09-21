export interface TrustPageContent {
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: {
    heading: string;
    body: string[];
    list?: string[];
  }[];
}

export const LEGAL_PAGES: Record<string, TrustPageContent> = {
  about: {
    title: 'About Us',
    subtitle: 'A dedicated, student-focused educational platform for clear, practical learning.',
    lastUpdated: 'September 2026',
    sections: [
      {
        heading: 'Our Purpose & Mission',
        body: [
          'Welcome to [Your Website Name] (Student Study Hub). Our mission is to make foundational and advanced concepts in Computer Science, Programming, Information Technology, and Mathematics accessible, straightforward, and engaging for students worldwide.',
          'Traditional textbooks are often dense and theoretical, while online forums can be fragmented and overwhelming. We bridge that gap by providing organized study notes, clear diagrams, verified code examples, interactive self-assessment quizzes, and practical daily student calculators—all in one distraction-free environment.'
        ]
      },
      {
        heading: 'What We Provide to Students',
        body: [
          'Our platform is engineered specifically around the daily academic workflow of college and high school learners:',
        ],
        list: [
          'Comprehensive Study Notes: Structured summaries across 12 core disciplines including Data Structures, Python, Java, Web Development, Databases, Networking, and Cybersecurity.',
          'Interactive Practice Quizzes: Multiple-choice assessments featuring instant feedback and in-depth explanations for every answer.',
          'Academic & Productivity Tools: Fast, accurate utilities including GPA/CGPA Calculators, Attendance Trackers, Percentage Calculators, and Study Timers.',
          'Open & Accessible Learning: Free access to study materials without mandatory paywalls or invasive account creation.'
        ]
      },
      {
        heading: 'Independent Educational Initiative',
        body: [
          '[Your Website Name] is an independent educational web resource operated and maintained by [Your Name / Editorial Team].',
          'We are not affiliated with, sponsored by, or an official representative of any university, degree-granting college, governmental education board, or corporate certification vendor.',
          'All resources, summaries, and tools are provided strictly for educational, informational, and supplementary self-study purposes.'
        ]
      },
      {
        heading: 'Content Integrity & Academic Standards',
        body: [
          'We place high value on accuracy, clarity, and relevance. Our notes and explanations reference widely recognized academic principles, industry-standard engineering guidelines (such as IEEE, ISO, and W3C specifications), and modern software development practices.',
          'We actively update our materials to reflect evolving curricula and welcome corrections from students, teachers, and developers.'
        ]
      },
      {
        heading: 'How to Reach Us',
        body: [
          'We appreciate questions, feedback, topic suggestions, and error reports from our student community. You can reach out anytime via our Contact Us page or directly by email at [Your Email Address].'
        ]
      }
    ]
  },
  privacy: {
    title: 'Privacy Policy',
    subtitle: 'How [Your Website Name] collects, uses, and safeguards student information.',
    lastUpdated: 'September 2026',
    sections: [
      {
        heading: 'Introduction',
        body: [
          'This Privacy Policy describes how [Your Website Name] ("we", "us", or "our") handles information when you visit and use our educational website located at [Your Website URL].',
          'We are committed to maintaining the privacy and trust of students, educators, and visitors. We strive to be transparent about what data is collected, why it is needed, and how you retain control over your information.'
        ]
      },
      {
        heading: 'Information We Collect',
        body: [
          'We believe that learning materials should be accessible with minimal barrier. You do not need to register an account or provide personal credentials to browse notes, take quizzes, or use calculators.',
          'Depending on how you interact with the website, we may collect or process the following types of information:'
        ],
        list: [
          'Information Voluntarily Provided: When you submit an inquiry through our Contact Us form, you provide your name, email address, message subject, and message content. This information is provided voluntarily.',
          'Device & Technical Information: When you visit any website, standard web server logs automatically record technical details such as your Internet Protocol (IP) address, browser type and version, operating system, referring URL, and the date and time of page requests.',
          'Local Storage Data: To provide a seamless user experience, we store certain user preferences directly on your local device using your browser’s LocalStorage API. This includes your theme preference (Dark Mode vs. Light Mode), quiz progress/high scores, and custom study planner tasks. This data stays entirely on your device and is not transmitted to our servers.',
          'Cookies & Similar Technologies: We and third-party service providers (such as advertising networks and analytics services) may use cookies or web beacons to understand site traffic and deliver relevant content.'
        ]
      },
      {
        heading: 'How We Use Your Information',
        body: [
          'Any information collected is used strictly for legitimate, student-first operational purposes:',
        ],
        list: [
          'To respond to your inquiries, support requests, and feedback submitted via our contact forms.',
          'To maintain website security, detect abusive behavior, and prevent spam or malicious activity.',
          'To monitor overall website performance and understand which study guides and tools are most useful to students.',
          'To display non-intrusive advertisements that help fund the free hosting, maintenance, and development of educational content.'
        ]
      },
      {
        heading: 'How Information is Stored, Protected & Shared',
        body: [
          'We do not sell, rent, trade, or monetize your personal information to third-party data brokers or marketing agencies.',
          'We apply reasonable administrative and technical safeguards to protect information against unauthorized access, alteration, or disclosure. However, please remember that no method of transmission over the Internet is 100% secure.',
          'Information may only be shared under narrow circumstances: (1) with trusted infrastructure providers (such as our web host) solely to deliver the service, (2) to comply with valid legal obligations, or (3) to protect the rights, property, and safety of our users.'
        ]
      },
      {
        heading: 'Third-Party Advertising & Google AdSense',
        body: [
          'To keep our educational content free for all learners, we may work with third-party advertising partners, including Google AdSense, to display advertisements on the website.',
          'Third-party vendors, including Google, use cookies to serve ads based on a user’s prior visits to this website or other websites across the Internet.',
          'Google’s use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our site and/or other sites on the Internet.',
          'Users may opt out of personalized advertising by visiting Google Ads Settings at https://adssettings.google.com. Alternatively, you can opt out of third-party vendor cookies for personalized advertising by visiting http://www.aboutads.info/choices/.'
        ]
      },
      {
        heading: 'Managing Cookies in Your Browser',
        body: [
          'You have complete control over cookies on your computer or mobile device. Most web browsers automatically accept cookies, but you can modify your browser settings to decline cookies, delete existing cookies, or alert you when a cookie is placed.',
          'Disabling cookies will not prevent you from reading our study notes, taking quizzes, or using academic calculators. For comprehensive details on cookie management, please review our separate Cookie Policy.'
        ]
      },
      {
        heading: 'Children’s Privacy Statement',
        body: [
          '[Your Website Name] is an educational website intended for general student audiences, including high school and college students. We do not knowingly collect or solicit personal information from children under the age of 13 (or under the applicable age of digital consent in your jurisdiction).',
          'If you are a parent or guardian and believe that your child has submitted personal information through our contact form without your consent, please contact us immediately at [Your Email Address]. We will promptly delete that information from our records.'
        ]
      },
      {
        heading: 'Changes to This Privacy Policy',
        body: [
          'We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, or applicable legal requirements. When updates occur, the "Effective Date" at the top of this page will be revised.',
          'We encourage students and visitors to periodically review this page to stay informed about our privacy practices.'
        ]
      },
      {
        heading: 'Contacting Us Regarding Privacy',
        body: [
          'If you have questions, concerns, or requests regarding this Privacy Policy or your personal information, please contact us at [Your Email Address] or through our Contact Us page.'
        ]
      }
    ]
  },
  terms: {
    title: 'Terms of Use',
    subtitle: 'Rules, guidelines, and legal terms governing the use of [Your Website Name].',
    lastUpdated: 'September 2026',
    sections: [
      {
        heading: '1. Acceptance of Terms',
        body: [
          'By accessing, browsing, or using [Your Website Name] (the "Website"), you acknowledge that you have read, understood, and agree to be legally bound by these Terms of Use and our Privacy Policy. If you do not agree with any part of these terms, please do not use the Website.'
        ]
      },
      {
        heading: '2. Acceptable Use',
        body: [
          'The Website is provided for personal, academic, and non-commercial educational study. When using the Website, you agree to comply with all applicable local, national, and international laws.',
          'You specifically agree that you will not:'
        ],
        list: [
          'Use automated systems, scripts, bots, or scrapers to extract bulk content, question banks, or notes without prior written authorization.',
          'Engage in any activity that disrupts, degrades, or interferes with the performance, security, or availability of the Website.',
          'Attempt to probe, scan, or compromise the security or vulnerability of the hosting network or infrastructure.',
          'Submit false, fraudulent, defamatory, or abusive inquiries through our contact forms.',
          'Use any material from the Website for unlawful purposes or in violation of third-party rights.'
        ]
      },
      {
        heading: '3. Intellectual Property Rights',
        body: [
          'All original text, study notes, quiz questions, curriculum guides, illustrations, logos, and custom calculator software on [Your Website Name] are owned by or licensed to [Your Website Name] and are protected by applicable copyright and intellectual property laws.',
          'You are granted a limited, non-exclusive, non-transferable license to view, read, and run educational materials and code examples for your individual academic self-study.',
          'Third-party trademarks, product names, logos, and software references (such as Python, Java, Docker, Linux, C++, AWS, and others) belong to their respective owners. They are referenced on this website strictly for identification, educational explanation, and commentary under fair use principles.'
        ]
      },
      {
        heading: '4. Educational Content Limitations',
        body: [
          'The materials on this Website are designed for supplementary learning and general knowledge revision. While we strive to maintain high accuracy and contemporary information, academic syllabi, grading standards, and exam formats vary significantly between universities and educational institutions.',
          'Materials on this Website should not replace required textbooks, official course syllabi, or guidance from your institution’s qualified instructors.'
        ]
      },
      {
        heading: '5. External Links & Third-Party Services',
        body: [
          'The Website may contain links to external third-party websites (such as official language documentation, open-source repositories, or reference guides). These links are provided solely for convenience and further study.',
          'We have no control over the content, privacy practices, or availability of external websites and do not endorse or assume responsibility for any third-party materials.'
        ]
      },
      {
        heading: '6. Website Availability & Modifications',
        body: [
          'We reserve the right to modify, update, suspend, or discontinue any portion of the Website, study notes, or calculators at any time without prior notice.',
          'The Website is provided on an "as is" and "as available" basis. We do not warrant that access will be continuous, uninterrupted, or error-free, nor that defects will be immediately corrected.'
        ]
      },
      {
        heading: '7. Limitation of Liability',
        body: [
          'To the fullest extent permitted by applicable law, in no event shall [Your Website Name], its operators, contributors, or affiliates be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of, or inability to use, this Website.',
          'This includes, without limitation, damages for academic outcomes, exam scores, loss of data, or reliance placed upon educational notes or calculator outputs.'
        ]
      },
      {
        heading: '8. Governing Law & Contact',
        body: [
          'These Terms shall be construed and governed in accordance with applicable laws without regard to conflict of law principles.',
          'If you have any questions regarding these Terms of Use, please reach out to us via [Your Email Address] or visit our Contact Us page.'
        ]
      }
    ]
  },
  cookies: {
    title: 'Cookie Policy',
    subtitle: 'Clear, transparent explanation of how cookies and local storage are used on [Your Website Name].',
    lastUpdated: 'September 2026',
    sections: [
      {
        heading: 'What Are Cookies & Similar Technologies?',
        body: [
          'Cookies are small text files placed on your computer, tablet, or smartphone when you visit a website. They are widely used to make websites work properly, remember your preferences, and provide analytical or advertising information to the site owners.',
          'Similar technologies include "Local Storage", which is a modern web browser feature allowing websites to store data directly on your device without sending that data back and forth to remote servers on every request.'
        ]
      },
      {
        heading: 'How We Use Cookies and Local Storage',
        body: [
          'At [Your Website Name], we keep tracking to a minimum. Here is a clear breakdown of the technologies used:'
        ],
        list: [
          'Essential Local Storage (Zero Tracking): We use your browser’s LocalStorage to remember your user preferences. Specifically, we store your Dark Mode/Light Mode toggle, your progress in student practice quizzes, and any study tasks you create in the student planner. This data lives purely on your browser and is never uploaded to an external server.',
          'Third-Party Advertising Cookies: To help support our free educational service, third-party advertising networks (such as Google AdSense) may set cookies on your browser to serve and measure advertisements. These cookies help advertisers display relevant ads and avoid showing you the same ad repeatedly.',
          'Basic Analytics & Performance: We or our hosting provider may use aggregated, non-personally identifiable server logs to measure total page views, error rates, and popular study topics so we can keep the site fast and reliable.'
        ]
      },
      {
        heading: 'Third-Party Advertising Providers',
        body: [
          'Third-party advertising partners, including Google, may place and read cookies on your browser, or use web beacons or device identifiers to collect information as a result of ad serving on this website.',
          'These third-party vendors use cookies to serve ads based on your prior visits to this website or other sites on the Internet. Their collection and use of data are governed by their respective privacy policies, not by [Your Website Name].'
        ]
      },
      {
        heading: 'How You Can Manage and Disable Cookies',
        body: [
          'You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences in several straightforward ways:',
        ],
        list: [
          'Browser Settings: You can set or amend your web browser controls to accept, block, or delete cookies. If you choose to reject cookies, you can still use our website without restriction to study notes and take quizzes.',
          'Google Ad Settings: You can personalize or opt out of personalized Google advertising by visiting Google Ads Settings at https://adssettings.google.com.',
          'Industry Opt-Out Tools: You can opt out of interest-based advertising from participating companies through the Network Advertising Initiative (http://www.networkadvertising.org/choices/) or the Digital Advertising Alliance (http://www.aboutads.info/choices/).'
        ]
      },
      {
        heading: 'Instructions for Popular Web Browsers',
        body: [
          'To adjust cookie settings in your specific browser, follow the official help guides below:',
        ],
        list: [
          'Google Chrome: Settings > Privacy and Security > Third-party cookies.',
          'Mozilla Firefox: Settings > Privacy & Security > Cookies and Site Data.',
          'Apple Safari: Preferences > Privacy > Block all cookies / Manage Website Data.',
          'Microsoft Edge: Settings > Cookies and site permissions > Manage and delete cookies.'
        ]
      },
      {
        heading: 'Questions About Our Cookie Policy',
        body: [
          'If you have questions about our use of cookies or other technologies, please contact us at [Your Email Address].'
        ]
      }
    ]
  },
  disclaimer: {
    title: 'Educational Disclaimer',
    subtitle: 'Important disclosures regarding our study materials, academic calculators, and external references.',
    lastUpdated: 'September 2026',
    sections: [
      {
        heading: '1. General Educational & Informational Purpose Only',
        body: [
          'All content published on [Your Website Name]—including study notes, algorithms, summaries, code samples, practice questions, and calculators—is created solely for general informational and educational self-study purposes.',
          'Nothing contained on this website is intended to constitute, nor should it be treated as, formal academic advice, legal counsel, professional software engineering certification, or institutional credit qualification.'
        ]
      },
      {
        heading: '2. Academic Calculators & Estimations',
        body: [
          'The student calculators on this platform (including the GPA / CGPA Calculator, Attendance Tracker, Percentage Calculator, and Unit Converter) perform mathematical calculations based strictly on the numerical values provided by the user.',
          'Please be aware that colleges, universities, and academic examination boards utilize varying grading scales, quality point multipliers, attendance thresholds, and rounding rules. The outputs provided by our calculators are mathematical estimates only and should always be verified against your official university student portal, course syllabus, or academic registrar.'
        ]
      },
      {
        heading: '3. No Institutional Affiliation or Accreditation',
        body: [
          '[Your Website Name] is an independent educational platform. We are not an accredited college, university, or educational testing agency.',
          'Completion of practice quizzes or study modules does not award formal educational credentials, course units, degrees, or certifications.'
        ]
      },
      {
        heading: '4. Accuracy & Currency of Materials',
        body: [
          'While we take reasonable measures to verify the accuracy of our computer science, programming, and mathematical materials, technology standards, software versions, and academic curricula change over time. We make no representations or warranties of any kind, express or implied, regarding the completeness, accuracy, reliability, or suitability of the information.',
          'If you notice a typo, out-of-date syntax, or conceptual error, please report it via our Contact Us page or at [Your Email Address] so we can review and correct it.'
        ]
      },
      {
        heading: '5. Third-Party Trademarks & Fair Use',
        body: [
          'All product names, trademarks, logos, and registered trademarks mentioned on this website (including but not limited to Python, Java, JavaScript, C++, Docker, Kubernetes, Linux, MySQL, PostgreSQL, AWS, and Google) are the property of their respective trademark holders.',
          'Use of these names, logos, and brands does not imply endorsement, sponsorship, or affiliation. They are used on this website strictly for identification and educational explanation purposes under fair use.'
        ]
      }
    ]
  },
  contact: {
    title: 'Contact Us',
    subtitle: 'Have a question, feedback, or content suggestion? We would love to hear from you.',
    lastUpdated: 'September 2026',
    sections: [
      {
        heading: 'Get in Touch with Our Educational Team',
        body: [
          'We welcome feedback from students, educators, and lifelong learners. Whether you have a question about a study note, spotted a typo, want to suggest a new computer science topic, or have questions regarding our website policies, please reach out.',
          'You can use the simple contact form below, or send an email directly to our support address at [Your Email Address].'
        ]
      },
      {
        heading: 'Expected Response Times',
        body: [
          'Because [Your Website Name] is an independent educational initiative, we typically review inquiries within 24 to 48 business hours.',
          'We appreciate your patience while our team reviews student suggestions and policy inquiries.'
        ]
      },
      {
        heading: 'Privacy Commitment for Inquiries',
        body: [
          'When you contact us, your email address and name are used solely to reply to your specific inquiry.',
          'We do not add you to marketing mailing lists, send unsolicited promotional messages, or share your contact details with external third parties.'
        ]
      }
    ]
  },
  copyright: {
    title: 'Copyright & Content Policy',
    subtitle: 'Our commitment to original educational authorship and intellectual property protection.',
    lastUpdated: 'September 2026',
    sections: [
      {
        heading: 'Original Educational Authorship',
        body: [
          'All text explanations, diagrams, original practice questions, and software utilities published on [Your Website Name] are authored and curated by our editorial team.',
          'We strictly respect copyright: we do not scrape proprietary websites, republish protected textbook chapters, or host pirated academic materials.'
        ]
      },
      {
        heading: 'Code Examples & Open Standards',
        body: [
          'Code snippets demonstrating algorithms, data structures, and programming patterns adhere to public documentation conventions and are provided for educational learning.',
          'Students and learners are welcome to run, modify, and test these examples in their own local development environments.'
        ]
      },
      {
        heading: 'DMCA & Takedown Notices',
        body: [
          'If you believe that any material on this website infringes upon your copyright, please submit a written notification with proof of ownership to: [Your Email Address].',
          'Upon receipt of a substantiated request, we will promptly investigate and take appropriate action, including removal or correction of the identified content.'
        ]
      }
    ]
  }
};
