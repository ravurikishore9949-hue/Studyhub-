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
    title: 'About Student Study Hub',
    subtitle: 'An independent, open educational initiative dedicated to accessible learning.',
    lastUpdated: 'September 2026',
    sections: [
      {
        heading: 'Our Educational Purpose',
        body: [
          'Student Study Hub is a student-focused educational platform created to make core concepts in Computer Science, Programming, Information Technology, and Mathematics straightforward, structured, and freely accessible to learners worldwide.',
          'Rather than relying on dense academic jargon or fragmented forum discussions, our goal is to deliver concise explanations, visual diagrams, verified examples, interactive quizzes, and practical daily utility tools.'
        ]
      },
      {
        heading: 'Independent & Transparent Operations',
        body: [
          'Student Study Hub is an independent educational web resource managed by [Site Owner / Educator Name - Insert Your Name Here].',
          'We do not claim affiliation, partnership, sponsorship, or accreditation with any official university, government educational board, or corporate technology certification body.',
          'All guides, notes, and exercises are developed for informational, self-study, and supplementary practice purposes.'
        ]
      },
      {
        heading: 'Content Integrity & Verification Standard',
        body: [
          'We emphasize rigor and factual accuracy in our materials. Topics in computer architecture, database normalization, algorithms, and networking follow established engineering specifications (such as IEEE, ISO, and W3C standard publications).',
          'We welcome feedback from students, educators, and engineers to continually refine, update, and improve the clarity of our educational archives.'
        ]
      }
    ]
  },
  privacy: {
    title: 'Privacy Policy',
    subtitle: 'How we respect your privacy and handle student data with total transparency.',
    lastUpdated: 'September 2026',
    sections: [
      {
        heading: 'No Unnecessary Account Requirements',
        body: [
          'At Student Study Hub, we firmly believe education should be accessible without barrier. You are not required to create an account, register, or disclose your name, email address, or phone number to access study notes, practice quizzes, or use calculators.'
        ]
      },
      {
        heading: 'Local Storage & Device-Only Persistence',
        body: [
          'Features that allow you to customize your experience—such as the Study Task Planner, Dark Mode preference, and Study Stopwatch notes—are saved exclusively on your local device via your web browser’s LocalStorage API.',
          'This data remains strictly on your device and is never transmitted, sold, or uploaded to external remote servers.'
        ]
      },
      {
        heading: 'Contact Inquiries & Forms',
        body: [
          'If you choose to submit a query or report a correction through our Contact Us form, you may provide your email address solely so that we can send a response. Your contact details are never shared with marketing brokers or third parties.'
        ]
      },
      {
        heading: 'Cookies & Future Third-Party Advertising',
        body: [
          'The core application does not use tracking cookies. In the future, legitimate third-party advertising networks (such as contextual ad providers) may place standard cookies to serve relevant educational advertisements in designated, clearly separated ad slots.',
          'Users maintain full control to block or delete cookies at any time through their browser privacy settings.'
        ]
      },
      {
        heading: 'Contact Information',
        body: [
          'For any questions regarding this Privacy Policy, please contact the site operator at [admin@studentstudyhub.edu / Insert Your Contact Email].'
        ]
      }
    ]
  },
  terms: {
    title: 'Terms of Use',
    subtitle: 'Rules and guidelines for accessing and utilizing Student Study Hub resources.',
    lastUpdated: 'September 2026',
    sections: [
      {
        heading: 'Acceptance of Terms',
        body: [
          'By accessing or using Student Study Hub, you acknowledge that you have read, understood, and agreed to be bound by these Terms of Use and applicable local and international laws.'
        ]
      },
      {
        heading: 'Permitted Educational Use',
        body: [
          'All notes, quizzes, code samples, and calculators are provided for individual personal, academic, and non-commercial educational study.',
          'You may freely review, reference, and run sample code in your personal learning projects. Systematic scraping, mass redistribution, or claiming authorship of original site content without proper attribution is strictly prohibited.'
        ]
      },
      {
        heading: 'Limitation of Liability',
        body: [
          'While we strive for accurate calculations and reliable notes, Student Study Hub provides all materials "as is" without warranty of any kind. We are not liable for academic outcomes, exam results, or technical decisions made in reliance upon this content.'
        ]
      }
    ]
  },
  disclaimer: {
    title: 'Educational Disclaimer',
    subtitle: 'Important disclosures regarding academic results, grading tools, and external references.',
    lastUpdated: 'September 2026',
    sections: [
      {
        heading: 'Academic & Grading Disclaimer',
        body: [
          'The calculators (including CGPA/GPA, Attendance, and Percentage calculators) provide mathematical approximations based solely upon the input numbers you supply.',
          'Different colleges, universities, and examination boards employ varying weighting policies, credit normalization formulas, and rounding conventions. Always consult your university’s official academic handbook or registrar office for binding GPA and graduation calculations.'
        ]
      },
      {
        heading: 'No Official Accreditation Claim',
        body: [
          'Student Study Hub is not an accredited university, college, or degree-granting institution. Quizzes and study modules represent self-assessment exercises and do not bestow formal academic credits or official certifications.'
        ]
      },
      {
        heading: 'Search Engine & Ad Policy Notice',
        body: [
          'Student Study Hub adheres strictly to ethical webmaster and educational quality standards. We do not guarantee indexing, search ranking positions, or advertising network approval, as those determinations are made independently by third-party search and advertising platform operators.'
        ]
      }
    ]
  },
  copyright: {
    title: 'Copyright & Content Policy',
    subtitle: 'Our commitment to original authorship and intellectual property protection.',
    lastUpdated: 'September 2026',
    sections: [
      {
        heading: 'Original Educational Authorship',
        body: [
          'All text explanations, diagrams, original practice questions, and software utilities published on Student Study Hub are drafted, structured, and reviewed by our editorial team.',
          'We strictly enforce a policy against copyright infringement: we do not scrape third-party websites, copy proprietary textbook pages, or pirate unauthorized lecture notes.'
        ]
      },
      {
        heading: 'Code Examples & Open Standards',
        body: [
          'Code snippets illustrating standard algorithms and language features adhere to public software documentation conventions and are provided for educational learning.',
          'Trademarks, including Python, Java, Docker, AWS, and Linux, are the registered trademarks of their respective owners and are referenced purely for informational, descriptive identification purposes under Fair Use.'
        ]
      },
      {
        heading: 'DMCA & Takedown Notices',
        body: [
          'If you believe that any material on this website infringes upon your copyright, please submit a written notification with proof of ownership to: [copyright@studentstudyhub.edu / Insert Takedown Contact Address]. Upon verification, substantiated materials will be promptly removed or attributed.'
        ]
      }
    ]
  }
};
