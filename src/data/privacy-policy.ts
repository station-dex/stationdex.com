import { getHashFromTitle } from "@/util/link";

const intro: string[] = [
  "StationDEX and its affiliates (hereinafter referred to as, “StationDEX”, “we or our”) is committed to safeguarding personal data. This Privacy Policy relates to our use and collection of personal information and data relating to visitor and user who visits, access and/or use this website or any StationDEX’s application or protocol (hereinafter referred to as “you”, “your” or “user”).",
  "With respect to users, StationDEX is the data controller of your personal information processed under this Privacy Policy.",
  "This Privacy Policy provides you with detail about how we use your personal information. We use commercially reasonable physical, electronic and procedural measures to protect your personal information in accordance with data protection legislative requirements, i.e. British Virgin Islands' Data Protection Act 2021 and European General Data Protection Regulation.",
  "This Privacy Policy does not apply to anonymized data as it cannot be used to identify you.",
  "We will not use your personal information for purposes other than those purposes we have disclosed to you in this Privacy Policy without your permission.",
  "By visiting, accessing or using our applications, blockchain protocol, our Website and/or any features on the Website, you acknowledge that we use your personal information as set out in this Privacy Policy.",
  "Unless stated otherwise, we adopt in this Privacy Policy the defined terms used in the Term of Use Agreement."
];

interface Policy {
  title: string;
  content?: (string | string[])[];
  sections?: {
    title: string;
    content: (string | string[])[]
  }[]

}

const policies: Policy[] = [
  {
    title: "Section 1 - Scope of this Privacy Policy",
    content: [
      "This Privacy Policy is intended to explain our privacy practices and covers the following areas:",
      [
        "What personal information about you we may collect",
        "Our use of cookies and similar technology",
        "How we may use your personal information",
        "Whom we may disclose your personal information to",
        "Our use of automated decision-making",
        "How we protect your personal information",
        "How to contact us",
        "Your rights to prevent marketing and to access and update your personal information",
        "How changes to this Privacy Policy will be made"
      ]
    ]
  },
  {
    title: "Section 2 - Information We May Collect About You",
    content: [
      "We may collect the following personal information from you when you access with our applications, access with our protocol, register with us or sign up with our newsletter (if any):",
      [
        "Contact Information: name and email address",
        "Account information: username and password",
        "Financial Information: your network address, digital wallet information, transaction history, trading data, etc.",
        "Correspondence: your feedback, response, and any information you provided to our team via various channels, including social media channels."
      ],
      "We may also automatically collect certain computer, device and browsing information when you access our website and/or our application or protocol:",
      [
        "Online identifiers: computer or mobile device information, including IP address, operating system, browser type and version, internet service provider (ISP).",
        "Website usage information such as user preferences and other data collected via cookies and similar technologies, referring/exit pages, operating system, date/time stamp, clickstream data, etc",
        "Location information or tracking details",
        "Transaction information: the transaction information you made on StationDEX applications and protocol, transaction amount and timestamp."
      ],
      "In case if you register with us, we may also collect personal information about you from public databases or third party partner including:",
      [
        "Reputational information or financial information",
        "status on any politically exposed person and sanctions lists",
        "digital asset transaction record",
        "business activities of corporate users",
        "other information to help validate your identity"
      ],
      "We also collect personal information disclosed by you when you contact us or respond to our communications (e.g., email, social media, or other writing)."
    ]
  },
  {
    title: "Section 3 - Uses Made of Your Personal Information",
    content: [
      "We may use your personal information in the ways listed below.",
      [
        "To provide, personalize, maintain and improve our Site, service, applications effectively to users; to administer, operate, maintain, customize, measure and improve our Site, applications and protocols; to create and update users’ accounts (if any), to process transaction, to send information including confirmations, notices, updates, security alerts and support and administrative messages, and to create de-identified or aggregated data. We may also use your personal information to develop our products and services, to evaluate new products and services and to improve our service quality, including by performing statistical analysis and reporting on transactions and site usage. In addition, we may use your personal information for financial reporting, management reporting, audit and record keeping purposes.",
        "To manage our risk: we may use your personal information in managing the risk of our users, including for assessing and processing applications, instructions or requests from you, maintaining our infrastructure and complying with internal policies and procedures and monitoring the use of our Website.",
        "To verify your identity: if you are registering an account with us, for the purposes of providing products or services, including conducting screenings or due diligence checks as may be required under applicable law, regulation, directive or our Term of User Agreement.",
        "To provide safety and security for users and prevent fraud: we and other organizations may also access and use certain information to maintain the safety, security and integrity of you and our Site, and to prevent fraud as may be required by applicable law and regulation and best practice at any given time. Such use of information may include (i) to protect, investigate and deter against fraudulent, unauthorized or illegal activity; (ii) to monitor and verify identity or Site access, combat spam, malware or security risks; (iii) to perform internal operations necessary to provide our Site, including to troubleshoot software bugs and operational problems; (iv) to enforce our agreement with third parties and address violations of our Term of User Agreement; and (v) to comply with applicable security laws and regulations. If false or inaccurate information is provided or fraud is identified or suspected, details may be passed to law enforcement and fraud prevention agencies and may be recorded by us or by them.",
        "In connection with legal or regulatory obligations towards law enforcement, regulators and the court service: we may share your information with law enforcement, regulatory authorities and officials, or other third parties when we are compelled to do so by a subpoena, court order, or similar legal procedure, or when we believe in good faith that the disclosure of personal information is necessary to prevent physical harm or financial loss, to report suspected illegal activity or to investigate violations of our Terms of Use Agreement or any other applicable policies. We may also use your personal information to otherwise comply with all applicable laws, regulations, rules, directives and orders.",
        "In order to communicate with you: we may use your personal information to communicate with you, including providing you with updates on changes to Website, products and services including any additions, expansions, suspensions and replacements of or to such features on the Site.",
        "In connection with disputes: we may use your personal information to address or investigate any complaints, claims or disputes and to enforce obligations owed to us.",
        "For research and development: we may use the information we collect for testing, research, analysis and product development to improve your experience. This helps us to improve and enhance the safety and security of our Site, improve our ability to prevent the use of our Site for illegal or improper purposes and enhance our Service.",
        "For marketing: subject to applicable laws and regulations, we may use your personal information to inform our marketing strategy and to tailor our messaging to your needs. Where required by law, we will ask for your consent at the time we collect your data to conduct such marketing. An opt-out mechanism will be provided to you in each communication to enable you to exercise your right to opt out of any direct marketing. We never sell your information. You may withdraw this consent/opt-out at any time without affecting the lawfulness of processing based on your prior consent."
      ]
    ]
  },
  {
    title: "Section 4 - Automated Decision-Making",
    content: [
      "Our operation of the Site may rely on automated analysis of personal information provided by you, alongside that received from AML and fraud prevention agencies. For more information on the anti-fraud measures adopted by us, please see section 7 of this Privacy Policy.",
      "We may use criteria such as your identifying information (e.g, your name, email address, wallet address, or other information) to compare public records on an automated basis or without human/manual intervention in order to comply with any applicable AML law or regulations.",
      "We do this on the basis that it is necessary for us to enter into a contract with you. If you fail to meet these criteria, your application to use our Site will be rejected.",
      "You may also request that we provide information about our methodology and ask us to verify that the automated decision has been made correctly. We may reject the request, as permitted by applicable law, including when providing the information would result in a disclosure of a trade secret or would interfere with the prevention or detection of fraud or other crime. However, generally in these circumstances we will verify (or request the relevant third party to verify) that the algorithm and source data are functioning as anticipated without error or bias."
    ]
  },
  {
    title: "Section 5 - Transmission, Storage and Security of Your Personal Information",
    sections: [
      {
        title: "Security over the Internet",
        content: [
          "No data transmission over the Internet or website can be guaranteed to be secure from intrusion. However, we maintain commercially reasonable physical, electronic and procedural safeguards to protect your personal information in accordance with data protection legislative requirements.",
          "All information you provide to us is stored on our or our contractors’ secure servers and accessed and used subject to our security policies and standards. Where we have given you (or where you have chosen) a password that enables you to access certain parts of our websites, you are responsible for keeping this password confidential and for complying with any other security procedures that we notify you of. We ask you not to share a password with anyone.",
          "Your personal information may be accessed by staff or suppliers in, transferred to, and/or stored at, a destination outside of BVI and/or the European Union in which data protection laws may be of a lower standard. Regardless of location or whether the person is an employee or contractor, we will impose the same data protection safeguards that we deploy herein.",
          "We will retain your personal information for as long as is necessary for the processing purpose(s) for which they were collected and any other permitted linked purpose (for example certain transaction details and correspondence may be retained until the time limit for claims in respect of the transaction has expired or in order to comply with regulatory requirements regarding the retention of such data). So if information is used for two purposes, we will retain it until the purpose with the latest period expires; but we will stop using it for the purpose with a shorter period once that period expires.",
          "We restrict access to your personal information to those persons who need to use it for the relevant purpose(s). Our retention periods are based on business needs, and your information that is no longer needed is either irreversibly anonymised (and the anonymised information may be retained) or securely destroyed. By way of example:",
          [
            "Use to perform a contract: in relation to your personal information used to perform any contractual obligation to you, we may retain that personal information whilst the contract remains in force plus a further period (depending on jurisdiction and other factors) to deal with any queries or claims thereafter;",
            "Copies of evidence obtained in relation to AML checks: in relation to your personal information obtained in relation to AML checks, we may retain that personal information in force for a 6 years to deal with any queries or claims thereafter; and",
            "Where claims are contemplated: in relation to any information where we reasonably believe it will be necessary to defend or prosecute or make a claim against you, us or a third party, we may retain that information for as long as that claim could be pursued."
          ]
        ]
      },
      {
        title: "Anonymity",
        content: [
          "Digital Assets may not be fully anonymous as a result of the public digital ledgers reflecting these assets. Generally, anyone can view the balance and transaction history of any public wallet address. We, and others who are able to match your public wallet address to other information about you, and also may be able to identify you from a blockchain transaction. Furthermore, third parties may use data analytics to identify other information about you. Please note that such third parties have their own privacy policies and that we do not accept any responsibility or liability for their policies or processing of your personal information."
        ]
      }
    ]
  },
  {
    title: "Section 6 - Your Rights & Contacting Us",
    sections: [
      {
        title: "Your Statutory Rights",
        content: [
          "Access: you are entitled to ask us if we are processing your information and, if we are, you can request access to your Personal Data. This enables you to receive a copy of the Personal Data we hold on you and certain other information about it to check that we are processing it lawfully. We process a large quantity of information and can thus request, in accordance with the regulations, that before the information is delivered, you specify the information or processing activities to which your request relates.",
          "Correction: you are entitled to request that any incomplete or inaccurate Personal Data we hold about you is corrected.",
          "Erasure: you are entitled to ask us to delete or remove Personal Data in certain circumstances. There are also certain exceptions where we may refuse a request for erasure; for example, where the Personal Data is required for compliance with law or in connection with claims.",
          "Restriction: you are entitled to ask us to suspend the processing of certain parts of your Personal Data; for example, if you want us to establish its accuracy or disclose the reason for processing it.",
          "Transfer: you may request the transfer of a certain part of your Personal Data to another party.",
          "Objection: where we are processing your Personal Data based on a legitimate interest (or that of a third-party) you may challenge this. However, we may be entitled to continue processing your information based on our legitimate interests or where this is relevant to legal claims. You also have the right to object where we are processing your Personal Data for direct marketing purposes."
        ]
      },
      {
        title: "Marketing",
        content: [
          "Particularly, you have the right to ask us not to process your personal information for marketing purposes. We will inform you if we intend to use your information for such purposes or if we intend to disclose your information to any third party for such purposes. You can exercise your right to prevent such processing by not checking certain boxes on our marketing consent form. You can also exercise the right at any time by contacting us as set out below."
        ]
      }
    ]
  },
  {
    title: "Section 7 - Processing for AML & Fraud Prevention and Detection Purposes",
    content: [
      "Before we provide our services under the Site to you, we undertake checks for the purposes of preventing fraud and money laundering. These checks require us to process personal information about you.",
      "The personal information you have provided, we have collected from you, or we have received from third parties will be used to prevent fraud and money laundering and may be used to verify your identity.",
      "In order to do so, we may provide information to, obtain information from, and verify information with fraud prevention and any enforcement agency. We may continue to exchange information with such parties while you have a relationship with us, if necessary.",
      "We may enable law enforcement agencies in a competent jurisdiction to access and use your personal information to detect, investigate and prevent crime, and in such circumstances, we will not notify you of such investigation.",
      "AML and enforcement agencies can hold your personal information for different periods of time, and if you are considered to pose a fraud or money laundering risk, your data can be held for up to seven years.",
      "As part of the processing of your personal information, decisions may be made by automated means. This means we may automatically decide that you pose a fraud or money laundering risk if our processing reveals your behavior to be consistent with money laundering or known fraudulent conduct, or is inconsistent with your previous submissions, or you appear to have deliberately hidden your true identity. You have rights in relation to automated decision making as set out in section 4 of this policy.",
      "As a consequence of processing, if we, or any AML & enforcement agency, determine that you pose a fraud or money laundering risk, we may refuse to allow you to access part of the Site or we may stop providing existing services to you."
    ]
  },
  {
    title: "Section 8 - Cookies Policy",
    content: [
      "We use cookies on the websites. Cookies are small text files that are placed on your computer by websites that you visit. They are widely used in order to make websites work, or work more efficiently, as well as to provide information to the owners of the site.",
      "Cookies are typically stored on your computer’s hard drive. Information collected from cookies is used by us to evaluate the effectiveness of our Site, analyze trends and administer the Site. The information collected from cookies allows us to determine such things as which parts of our website are most visited and what difficulties our visitors may experience in accessing our website. With this knowledge, we can improve the quality of your experience on the Website by recognising and delivering more of the most desired features and information, as well as by resolving access difficulties. We also use cookies and/or a technology known as web bugs or clear gifs, which are typically stored in emails to help us confirm your receipt of, and response to, our emails and to provide you with a more personalized experience when using our Site.",
      "We may use one or more third-party service providers, to assist us in better understanding the use of our Site. Our Service provider(s) will place cookies on the hard drive of your computer and will receive information that we select that will educate us on such things as how visitors navigate around our Site, what page are browsed and general transaction information. Our service provider(s) will analyze this information and provide us with aggregate reports. The information and analysis provided by our service provider(s) will be used to assist us in better understanding our visitors’ interests in our Site and how to better serve those interests. The information collected by our service provider(s) may be linked to and combined with information that we collect about you while you are using the Website. Our service provider(s) is/are contractually restricted from using the information they receive from our Site for any other purpose than to assist us.",
      "If you want to avoid using cookies altogether, you can disable cookies in your browser. However, disabling cookies might make it impossible for you to use certain features of our Website or other features."
    ]
  },
  {
    title: "Section 9 - Changes to our Privacy Policy and/or Cookies Policy",
    content: [
      "We may change the content of our Privacy Policy from time to time in the future. We therefore encourage you to review this policy from time to time to stay informed of how we are using personal information. This Privacy Policy was updated on 28 November 2022."
    ]
  },
  {
    title: "Section 10 - Contact Us",
    content: [
      "Please contact us if you have any questions about this Privacy Policy or if you are seeking to exercise any of your statutory rights. We will respond within a reasonable timeframe. You may contact our legal and compliance department by leaving a message on our Website."
    ]
  }
]


export interface Link {
  title: string;
  hash: string;
  links?: Link[];
}

const tocTitles: Link[] = policies.map(policy => {
  const link: Link = {
    title: policy.title,
    hash: getHashFromTitle(policy.title),
  }

  if(policy.sections) {
    link.links = policy.sections.map(section => ({
      title: section.title,
      hash: getHashFromTitle(section.title)
    }))
  }

  return link;
});

export {
  intro,
  policies,
  tocTitles
}