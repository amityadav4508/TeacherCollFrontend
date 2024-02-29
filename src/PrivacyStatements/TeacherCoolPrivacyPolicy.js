import React from 'react'
import { Card, Container } from 'react-bootstrap'
import Footer from 'src/layout/Footer'
import NavTopBar from 'src/layout/NavTopBar'

const TeacherCoolPrivacyPolicy = () => {
  const BoldText = (props) => {
    const children = props
    return <p className="fs-5 gray-600 fw-normal text-left mb-2 mt-2">{children.children}</p>
  }
  const Linked = (props) => {
    const children = props
    return <a className="fs-5 gray-600 fw-normal text-left mb-2 fs-6  ms-2"  target="_blank"
    rel="noopener noreferrer" href={children.href}>{children.children}</a>
  }

  const HeadText = (props) => {
    const children = props
    return <h5 className="fw-bold text-left mt-5">{children.children}</h5>
  }
  const NormalText = (props) => {
    const children = props
    return (
      <div>
        <p className="terms-use text-left">{children.children}</p>
      </div>
    )
  }
  // const UnderLineText = (props) => {
  //   const children = props
  //   return (
  //     <div>
  //       <p className="fs-5 gray-600 fw-normal text-left mb-2 ">{children.children}</p>
  //     </div>
  //   )
  // }
  return (
    <>
      <NavTopBar />
      <Container>
        <Card className="border-0 shadow policy p-5">
          <h2 className="text-center">Teachercool Privacy Policy</h2>
          <NormalText>
            We at Teachercool, Inc. (“Teachercool”) have created this Privacy Policy to describe our
            practices and your choices regarding information we collect through our websites, apps,
            mobile features, and other services that post a link to this Privacy Policy (“Service”
            or “Services”), as well as offline sources that may then be combined in our databases.
            Please read this Privacy Policy carefully. If you are a resident of any country or
            region listed in the “Country” menu above, please read the Privacy Policy associated
            with that country; it may include additional rights and information. By accessing or
            using the Services, you agree to the Privacy Policy associated with your country, state,
            or region, as well as the Terms of Use.
          </NormalText>
          <BoldText>Table of Contents</BoldText>
          <BoldText>Information We Collect and How We Collect It</BoldText>
          <BoldText>How We Use Your Personal Information</BoldText>
          <BoldText>
            How We Share Your Personal InformationThird Party Advertising & Analytics
          </BoldText>
          <BoldText>“Do Not Track” and Global Privacy Control Signals</BoldText>
          <BoldText>Third Party Content, Applications, and Links</BoldText>
          <BoldText>Your Choices About the Information We Collect</BoldText>
          <BoldText>Security of Your Information</BoldText>
          <BoldText>General Audience Services</BoldText>
          <BoldText>Changes to This Privacy Policy</BoldText>
          <BoldText>
            Consent to International Transfers of Your Information and General Processing
          </BoldText>
          <BoldText>How Long We Retain Your Information</BoldText>
          <BoldText>Contact Us & Right to Lodge a Complaint</BoldText>
          <BoldText>Notice to Nevada Residents</BoldText>
          <BoldText>Notice to California Residents</BoldText>
          <BoldText>Notice to Virginia Residents</BoldText>
          <BoldText>Information We Collect and How We Collect It</BoldText>
          <NormalText>
            We may collect information from you both directly and automatically when you use our
            Services. Some of this information may be considered “personal information” or “personal
            data,” some of which may be considered “sensitive,” under various applicable laws. We
            consider information that identifies you as a specific, identified individual to be
            personal information (such as your name and email address), and we treat additional
            information, including IP addresses and online identifiers, as personal information
            where required by applicable law. Note that we may pseudonymize, de-identify, or
            anonymize personal information so that it is non-personal, such as by aggregating it or
            converting it to a code, sometimes using a function commonly known as a “hash.” We
            maintain and use de-identified data without attempting to re-identify it, except where
            permitted by applicable law, such as to determine whether our de-identification
            processes satisfy legal requirements. We will treat pseudonymized, de-identified, or
            anonymized information as non-personal to the fullest extent allowed by applicable law.
          </NormalText>
          <BoldText>We collect information in the following ways:</BoldText>
          <NormalText>
            a. Information You Submit Via our Services. In the course of using our Services, you may
            provide us with certain information, including contact information (such as your name,
            email address, telephone number, and social media user name); account information (such
            as your profile picture and birthday); payment and financial information; educational
            information (such as your school and year of graduation); demographic information (such
            as your gender, race, eligibility to work in the United States, and work history);
            information about your interests and preferences (such as your career goals, academic
            interests and clubs or sports you participate in). Some features may allow you to
            communicate and collaborate with each other, including through video or text chat, or
            otherwise to view, create, reproduce, submit, display, perform, and/or share content,
            which includes videos, audio, images, graphics, written posts, comments, survey
            responses, and other forms of multimedia (collectively, “User Content”). Note that our
            servers may record user-to-user communications, note taking you do within our systems,
            and exercise corrections by instructors, and we may retain the records of the content of
            any such communications and interactions.
          </NormalText>
          <NormalText>
            Registration to become an Instructor: When you register to be an Instructor, we will
            collect information from you such as your education and employment history, phone
            number, photo, country of residence, and information we need to process payments to you,
            such as your bank account information, social security number, or taxpayer
            identification number, as necessary to facilitate payment and to comply with related
            legal obligations.
          </NormalText>
          <NormalText>
            b. Information We Collect Automatically From Your Use of our Services. When you use our
            Services, we, our third-party service providers, and our business partners may
            automatically collect certain information (“Usage Information”). One of the ways we
            collect Usage Information is when you visit portions of our Services, our servers
            automatically generate logs to help us determine how people navigate through our
            Services, the content you access, and other interactions you may have with our Services.
            We use this insight to create a better and more secure experience for our users. Usage
            Information does not generally identify you, but if we associate it with you as a
            specific person, we treat it as personal information. This Usage Information may include
            your IP address and unique device identifiers (“Device IDs”) for your computer, mobile
            phone, or other device used to access our Services. A Device ID is a number that is
            automatically assigned to your device, and our servers identify your device by its
            Device ID. We will also collect other information relating to your device, including the
            Internet service provider you are using, the type of computer operating system you are
            using, the type of browser you use, and the approximate location of your device, which
            may be collected or inferred through other information we collect, such as IP address.
          </NormalText>
          <BoldText>
            We use the following types of tracking technologies (collectively referred to as
            “Tracking Technologies”) to automatically collect information when you interact with us
            online:
          </BoldText>
          <NormalText>
            Cookies and Local Storage are small text files stored locally on your device that help
            store user preferences. These technologies are able to store a unique identifier for a
            device that allows us to recognize the device whenever it is used to visit our Services.
            These technologies may be used for many purposes by us, our service providers, and our
            third-party business partners, such as automatically collecting Usage Information,
            enabling features, serving advertisements to you online, and remembering your
            preferences. We may use cookies and other technologies to help keep your use of the
            Services more secure, to study traffic patterns on the Services, to study the
            effectiveness of our customer communications, to maintain the integrity of the Services,
            to measure crash analytics and other maintenance-related information, to manage and
            measure the performance of advertisements displayed on or delivered by or through the
            Services, and to personalize your experience through the Services, such as to recognize
            you when you return to the Services. The information we store includes internet protocol
            (IP) addresses, browser type, Internet service provider (ISP), referring/exit pages,
            operating system, date/time stamp, and clickstream data. If you do not want to accept
            cookies, you can block them by adjusting the settings on your Internet browser, or
            depending on your location, via settings we make available on our Services. You can find
            more information about cookies and how they work at www.allaboutcookies.org. You can
            also find our cookie notice here.
          </NormalText>
          <NormalText>
            Web beacons (also known as clear GIFs and pixel tags) are small pieces of code used to
            collect usage analytics. They help us to determine, for instance, whether a page has
            been viewed or not and, if so, how many times. When you ask us to send you information
            on a promotion or a newsletter, we may use web beacons to establish when an email is
            opened.
          </NormalText>
          <NormalText>
            Embedded scripts are programming code designed to collect information about your
            interactions with our Services, such as the links you click on. The code is temporarily
            used by our server or a third-party service provider or business partner while you
            browse or interact with our Services and is deactivated or deleted when you disconnect
            from our Services.
          </NormalText>
          <NormalText>
            Software Development Kits (SDKs) are a software package that contains a set of tools
            that can be used to help build applications and implement new features in existing apps.
            These tools can be used to create and operate features that collect information from
            your device.
          </NormalText>
          <NormalText>
            Data Collection from Mobile Devices. We use embedded scripts and the tools provided in
            SDKs to collect information from mobile devices such as the hardware model, operating
            system and version, identification numbers assigned to your mobile device, such as the
            ID for Advertising (IDFA) on Apple devices, and the Advertising ID on Android devices,
            mobile network information, and website usage behavior. In addition, we may use a
            variety of other technologies that collect similar information for security, fraud
            detection, and maintenance purposes.
          </NormalText>
          <NormalText>
            In addition, we may record your interactions with the Service’s user interfaces,
            including what pages you visit on our Services and how long you visit those pages, the
            links you click, and your path through our Services. We capture this for website
            analytics purposes, solely for our internal business purposes, to improve the Services
            and to address functionality issues.
          </NormalText>
          <NormalText>
            c. Chat Boxes. When you participate in our chat with Teachercool Support sessions, we
            can record and use your communications and the information you provide in order to
            assist you during the chat session and to improve the Services.
          </NormalText>
          <NormalText>
            d. Video Call Recording. If you use our Thinkful service, we may record video calls
            between instructors and students, for example one-to-one meetings between instructors
            and students and class instruction sessions for quality assurance and security purposes.
            If we record such a call, notice will be provided to you within the video call tool.
          </NormalText>
          <NormalText>
            e. Information from Third Parties. We may receive information about you from third
            parties, such as data providers who enhance the information we have about you, publicly
            available information, third parties with whom we partner to offer our services to their
            subscribers, loan partners, or third parties that you integrate into the Services, such
            as social media platforms.
          </NormalText>
          <NormalText>
            f. Social Media and Other Third-Party Platforms. We may enable you to interact with
            social media and other third-party platforms, including Google, Apple, Facebook,
            Twitter, Pinterest, YouTube, and LinkedIn, including the use of their login service.
            When you interact with third party platforms through the Services, we will receive
            information about you. We may also receive information about you if other users of
            social media give us access to their profiles and you are one of their connections. The
            information we collect is subject to this Privacy Policy. The information collected and
            stored by the third party remains subject to the third party’s privacy practices,
            including, without limitation, whether the third party continues to share information
            with us, the types of information shared, and your choices about what is visible to
            others on that third-party website or service. We or the third party may allow you to
            disable or remove the application or feature, in which case we will no longer collect
            information about you through the application or feature, but we may retain the
            information previously collected.
          </NormalText>
          <NormalText>
            If you choose to post information to a third-party platform, that information may be
            public, and the third party may have access to information about you and your use of the
            Services. You may also choose to participate in a way that connects that third-party
            service with the Services, such as posting to one of our pages on a social media site.
            Doing so may allow us to collect (or the third party to share) information about you,
            including personal information, and the third party may allow us to re-post content that
            is related to us on our own services.
          </NormalText>
          <NormalText>
            In addition, these third parties may set their own cookies and collect information about
            your use of the Services, including your IP address or other device identifiers, and
            which areas of our Services you visit. Certain third-party platforms may be able to
            collect information on your visits to our Services, regardless of whether you
            affirmatively interact with the feature and whether you are logged into (or have) an
            account. We encourage you to review the privacy policies of third parties that control
            platforms you post to or that connect to the Services and set your privacy preferences
            directly with them.
          </NormalText>
          <NormalText>
            g. Referral Features. We may make available referral functions that permit you to send
            invitations, content, or other information directly to a third party through the
            Services. If you send a communication using such functionality, the information you
            provide about the recipient (e.g., name and e-mail address) is used to facilitate the
            communication and is not used for any other marketing purpose unless we obtain consent
            from that person. Any information you provide in connection with sending the message,
            (e.g., your name and your email address) will, of course, be disclosed to the recipient.
            When you disclose any personal information relating to other people, you represent that
            you have the authority to do so and to permit us to use the information in accordance
            with this Privacy Policy.
          </NormalText>
          <HeadText>2. How We Use Your Personal Information</HeadText>
          <NormalText>
            We may use non-personal information for any purpose, including for advertising,
            research, and marketing purposes. We also use information that we collect, including
            personal information and Usage Information, as disclosed in this Privacy Policy and as
            follows:
          </NormalText>
          <BoldText>a. To provide our Services, including to:</BoldText>
          <NormalText>
            i. allow you to register your account and participate in community forums or learning
            activities;
          </NormalText>
          <NormalText>
            ii. to fulfill and track your orders, and process returns, including processing your
            financial information and payment methods to complete your transactions;
          </NormalText>
          <NormalText>
            iii. to contact you to respond to your questions, feedback, or requests or to provide
            you with technical support;
          </NormalText>
          <BoldText>b. To personalize our Services, including to:</BoldText>
          <NormalText>i. provide recommendations to you when you use our Services ;</NormalText>
          <NormalText>
            ii. to provide information on products or services we think you may be interested in,
            including special offers and promotions from us, our advertisers, and third-party
            partners, using the contact information you provide or displaying them to you when you
            use our Services or elsewhere online;
          </NormalText>
          <BoldText>c. To optimize our Services, including to:</BoldText>
          <NormalText>i. to recognize you across our Services and across your devices;</NormalText>
          <NormalText>
            ii. to improve the Services, which may include tracking traffic, usage, trends and
            navigation patterns related to your activities on the Services and combining third-party
            data with your information;
          </NormalText>
          <BoldText>
            d. To facilitate your job search via our Services and prepare related governmental and
            internal statistical reports;
          </BoldText>
          <BoldText>e. For administrative, legal, and internal purposes, including to:</BoldText>
          <NormalText>
            i. communicate with you about the services, content, features or products you use or
            request, including to provide you with information concerning changes to our Services
            which may affect your account and/or your use of our Services, or in our discretion,
            changes to our policies;
          </NormalText>
          <NormalText>
            ii. to respond to subpoenas, court orders or legal processes, or to establish or
            exercise our legal rights or defend against legal claims;
          </NormalText>
          <NormalText>
            iii. for internal business purposes, including to verify your identity, prevent fraud or
            other illegal activity, to prevent imminent bodily harm, or to protect ourselves and you
            from people violating our Terms of Service, or otherwise to protect our or third-party
            rights or interests, which may include sharing information with other companies,
            lawyers, courts, or other government entities; and
          </NormalText>
          <BoldText>
            f. In any other way we describe when you provide your information to us, or otherwise
            with your prior consent.
          </BoldText>
          <HeadText>3. How We Share Your Information</HeadText>
          <NormalText>
            We may aggregate, pseudonymize, de-identify, and/or anonymize any information collected
            through the Services such that such information is no longer linked to you personally as
            described above. We may share this non-personal information with third parties for
            advertising and other purposes.
          </NormalText>
          <NormalText>
            In addition, we may share the information we have collected about you, including
            personal information and Usage Information, as disclosed at the time you provide us with
            information or your consent, and as described in this Privacy Policy, including:
          </NormalText>
          <NormalText>
            a. Instructors/Students. If you use our Thinkful Service, portions of your User Content
            and profile information may be available to instructors or other students (if you are a
            student) or to students (if you are an instructor), such as your name, profile picture,
            and, depending on which of our Services you use, your email address and any information
            you choose to provide in your profile or via the communication tools used for the
            Service.
          </NormalText>
          <NormalText>
            b. Publicly Available Content/At Your Direction. User Content and profile information
            may also be available to other registered users of the Services and other visitors to
            the Services, such as if you post a public comment. In addition, the Services may allow
            you to communicate and collaborate with each other, including via video chat or text
            chat. We may also share information when you direct us to do so, such as if you consent
            to post your testimonial along with your name, if you choose to link your account with a
            social networking service or other third party application or feature through which
            information is shared, if you apply for tuition assistance through a lender, or if we
            present you with an opportunity to receive marketing offers from a third party. We do
            not control the actions of third parties and you post content and share your information
            at your own risk.
          </NormalText>
          <NormalText>
            c. Third Party Offers/Bundled Products. We may offer through the Services the services
            of a third party, or we may offer our Services to you through a third party. In those
            instances, by signing up for the third party service or signing up for our Services
            through a third party, you are agreeing and directing us, to disclose your information
            to that third party (or parties), and your information will be subject to the privacy
            policy and practices of that third party. This includes, without limitation, instances
            in which you use our Services to purchase products or services provided, in whole or
            part, by third parties. You also may request, sometimes through your use of an
            interactive feature or social media feature, that we share information about you with a
            third party or publicly.
          </NormalText>
          <NormalText>
            d. Affiliated Entities. We offer a number of websites and services, and we may share
            information among our affiliated corporate entities for their business and marketing
            purposes.
          </NormalText>
          <NormalText>
            e. During Academic Investigations. Certain of our Services have an associated Honor
            Code, and these may vary according to your location. If you use such Services, you agree
            to abide by the Honor Code applicable to your country as part of your use of the
            Services. We may disclose personal information in accordance with the terms of the
            applicable Honor Code.
          </NormalText>
          <NormalText>
            f. Service Providers. We contract with other companies to perform services on our
            behalf, including advertising, marketing, e-mail delivery, cloud hosting services, site
            maintenance and repair, security, quality assurance, customer service, surveys, and
            research and analysis. We provide your information to them only to fulfill such
            services.
          </NormalText>
          <NormalText>
            g. Sweepstakes, Contests and Promotions. We may offer sweepstakes, contests, or other
            promotions (any of which, a “Promotion”) that may require registration. By participating
            in a Promotion, you are agreeing to the provisions, conditions, or official rules that
            govern the Promotion, which may contain specific requirements of you (including, except
            where prohibited by law, allowing the sponsor(s) of the Promotion to use your name,
            voice, likeness, or other indicia of persona in advertising or marketing materials). If
            you choose to enter a Promotion, personal information may be disclosed to third parties
            or the public in connection with the administration of such Promotion, including in
            connection with winner selection, prize fulfillment, as required by law, or as permitted
            by the Promotion’s terms or official rules (such as on a winner’s list).
          </NormalText>
          <NormalText>
            h. Employment Applications. If you apply for a job through our Services, we or our
            service provider(s) may ask you to provide self-identifying information such as your
            veteran status, gender, and ethnicity in conjunction with laws and regulations enforced
            by the Equal Employment Opportunity Commission and other federal, state, and local
            regulatory agencies. Providing such information is voluntary, but if you do provide such
            information, we and/or our service provider may submit that information to the
            appropriate government or regulatory agencies to fulfill reporting requirements and use
            that information to defend against employment-related complaints. Please note that we
            may utilize a careers portal that is operated by a third party, in which case, your
            registration and use of the careers portal will be subject to the third party’s privacy
            practices as disclosed on the portal.
          </NormalText>
          <NormalText>
            i. In Connection with Business Transactions. In the event Teachercool undergoes a
            business transition, such as a merger with or acquisition by another company, or sale of
            all or a portion of its assets, we may transfer your personal information and other
            information to the successor organization in connection with such transaction, including
            during the course of any due diligence. By providing your personal information, you
            agree that we may transfer such information to the other entity in such a transaction
            without your further consent. If material changes to our privacy practices will occur as
            a result of the business transition, Teachercool or its successor will attempt to notify
            you, including by posting a notice on the Services so that you can elect whether to
            delete your Account.
          </NormalText>
          <NormalText>
            j. For Administrative and Legal Reasons. We reserve the right to use or disclose any
            information as needed to satisfy any law, regulation, or legal request; to protect the
            integrity of the Services, including for anti-fraud purposes; to fulfill your requests;
            to cooperate in a law enforcement investigation, an investigation on a public safety
            matter, or an investigation into claims of intellectual property infringement; to
            protect and defend the legal rights and/or property of Teachercool and any of our
            subsidiaries, affiliates, and shareholders, or the Services and any of their users, or
            any other party; or, in an emergency, to protect the health and safety of users or the
            general public.
          </NormalText>
          <HeadText>4. Third Party Advertising and Analytics</HeadText>
          <NormalText>
            Teachercool works with third party business partners such as online advertising
            companies, analytics providers, and other partners to serve our ads online, to serve
            third party ads through the Services and to provide us with information regarding the
            use of the Services and the effectiveness of our advertisements. We allow these
            companies to place tracking technologies like cookies and web tags on the Services, and
            they may otherwise collect or have access to Usage Information and other information
            about you. Some of these parties may collect personal information over time when you
            visit the Services or other online websites and services. We may share information,
            typically information that has been aggregated, pseudonymized, or de-identified, Usage
            Information, and location information with third party advertising companies, analytics
            providers, and other third parties including for targeted advertising purposes.
          </NormalText>
          <NormalText>
            Specifically, we use Google Analytics, which uses cookies and similar technologies to
            collect and analyze information about the use of the Services and report on activities
            and trends. This service may also collect information about the use of other websites,
            apps, and online services. You can learn about Google’s practices by going to
            https://policies.google.com/technologies/partner-sites, and opt out of them by
            downloading the Google Analytics opt-out browser add-on, available at
            https://tools.google.com/dlpage/gaoptout.
          </NormalText>
          <NormalText>
            Unless you have not consented to targeted ads or exercised your ‘Do Not Sell/Share’
            rights under applicable laws, we may share your email (in hashed form) and certain
            device/browser data, with our partner, LiveRamp, Inc. and its group of companies
            (“LiveRamp”). Using your hashed email, LiveRamp will create an encrypted envelope that
            can be associated with our stored first party data which may contain your IP address and
            other browser/device-related information. This envelope can be read and decrypted by
            RampID enabled advertisers across the web. Advertisers will match this shared
            information to LiveRamp’s on- and offline marketing databases and those of its
            advertising partners. This creates a link between your browser and information in those
            other databases, allowing advertisers to serve you more relevant ads. To opt out of
            LiveRamp’s targeted advertising, please click here.
          </NormalText>
          <NormalText>
            We use a variety of other third parties to perform advertising and analytics services,
            and some of these companies may be members of the Network Advertising Initiative (“NAI”)
            or the Digital Advertising Alliance (“DAA”). You may wish to visit
            optout.networkadvertising.org, which provides information regarding targeted advertising
            and the opt-out procedures of NAI members, including opt out mechanisms for web
            browsers, mobile and other connected devices, and a tool to opt out from participating
            NAI members using your hashed email address for interest-based advertising. You may also
            want to visit optout.aboutads.info which provides information regarding targeted
            advertising and offers an opt-out for DAA-participating companies.
          </NormalText>
          <NormalText>
            Options for Our Apps. Mobile devices may contain settings that allow you to disable
            tracking advertising and/or analytics. In addition, the digital advertising industry has
            provided the ability for mobile users to register their intent not to receive targeted
            advertising at http://www.aboutads.info/appchoices.
          </NormalText>
          <NormalText>
            Please note that opting out through these mechanisms does not opt you out of being
            served all advertising, and that you will continue to receive generic ads while online.
          </NormalText>
          <NormalText>
            If you are a California resident, please see our “Notice to California Residents”
            regarding additional rights you have, including how to exercise your “Do Not Sell”
            right.
          </NormalText>
          <HeadText>5. “Do Not Track” and Global Privacy Control Signals</HeadText>
          <NormalText>
            Please note that your browser settings may allow you to automatically transmit a “Do Not
            Track” signal to websites and online services that you visit. When you choose to turn on
            the “Do Not Track” setting in your browser, your browser will send a signal to websites,
            analytics providers, advertisement networks, plug-in providers, and other web service
            providers you encounter while browsing to stop tracking your activity. To find out more
            about and set up “Do Not Track,” please visit 
            <Linked href='http://www.allaboutdnt.com' >http://www.allaboutdnt.com.</Linked>
          </NormalText>
          <NormalText>
            Global Privacy Control (“GPC”) is a technical specification in your browser settings
            that you can use to automatically inform websites of your privacy preferences with
            regard to third party online tracking. To find out more about and set up GPC, please
            visit https://globalprivacycontrol.org/#about.
          </NormalText>
          <HeadText>6. Third Party Content, Applications, and Links</HeadText>
          <NormalText>
            This Privacy Policy does not apply to the practices of third parties that we do not own
            or control, including, but not limited to, any third-party websites, services and
            applications (and the information or content contained therein) (
            {'"Third-Party Services"'}) that may link to or be linked from the Services and/or that
            you elect to access through the Services. Those Third-Party Services may use their own
            cookies or other tracking technologies, may independently collect information from you
            or about you, and match your data with data from other sources and use your data in ways
            other than described in this Privacy Policy. Your browsing and interaction on any
            Third-Party Services is subject to such Third-Party Services’ own rules and policies,
            which we encourage you to review prior to providing them with your information.
          </NormalText>
          <HeadText>7. Your Choices About the Information We Collect</HeadText>
          <NormalText>
            We provide you with a number of choices with respect to your personal information,
            including the right to access, request, delete, and in some cases prevent the “sale” or
            “sharing” of your personal information.
          </NormalText>
          <NormalText>
            Please note that although you are not required to provide us with personal information,
            we may not be able to provide you with access to some or all of our Services if you do
            not provide us with the requested information, (including, for example, personalization
            features, relevant advertisements, and special promotions).
          </NormalText>
          <BoldText>a. Exercising your Rights.</BoldText>
          <NormalText>
            i. To submit a request to access, delete, correct your personal information, or opt-out
            of the offline sale or sharing for cross contextual behavioral advertising of your
            personal information (targeting/advertising), please click here or follow the (
            {'"Privacy Rights"'}) button in the footer.
          </NormalText>
          <NormalText>
            ii. Depending on your location, you may also have access to a link in the footer titled
            “DO NOT SELL MY INFO” or “Manage Preferences” at the bottom of this webpage. To opt-out
            of the sale or sharing of your personal information (targeted advertising) via cookies,
            use the tool available at this link. Note that you will need to do this on each of our
            Services for which you would like to exercise this opt-out right.
          </NormalText>
          <BoldText>
            b. State-specific Notices. Residents of the below listed states should refer to the
            linked notices for more information:
          </BoldText>
          <NormalText>Notice to California Residents</NormalText>
          <NormalText>Notice to Nevada Residents</NormalText>
          <NormalText>Notice to Virginia Residents</NormalText>
          <BoldText>
            c. Marketing Choices. We also offer the below options specifically with respect to
            marketing:
          </BoldText>
          <NormalText>
            i. Email. You may unsubscribe from all future marketing emails through the opt-out
            mechanism included in any marketing email. We reserve the right to send you
            administrative or transactional communications relating to your use of the Services,
            such as service announcements, notices of changes to this Privacy Policy, or other
            terms. Such messages will be unaffected by any choice to opt out of marketing
            communications.
          </NormalText>
          <NormalText>
            ii. Push Notifications. If you consent, we may send promotional and non-promotional push
            notifications or alerts to your mobile device. You can elect to stop receiving those
            messages by changing the notification settings on your mobile device.
          </NormalText>
          <NormalText>
            iii. Text Messages. You may be able to opt-in to receiving marketing text messages from
            one or more of our Services. You may opt-out by replying “STOP” to any of these text
            messages.
          </NormalText>
          <HeadText>8. Security of Your Information</HeadText>
          <NormalText>
            We implement commercially reasonable security measures to protect the security of your
            information. However, no website or Internet transmission is completely secure, and we
            cannot guarantee that unauthorized access, hacking, data loss, or other breaches will
            never occur. We urge you to take steps to keep your personal information (including your
            account password) safe, including logging out of your account after use, and not
            re-using the same or similar passwords on different services.
          </NormalText>
          <HeadText>9. General Audience Services</HeadText>
          <NormalText>
            The Services are not intended for children younger than the age of 13. We do not
            knowingly collect or solicit personal information from children younger than the age of
            13.
          </NormalText>
          <HeadText>10. Changes to this Privacy Policy</HeadText>
          <NormalText>
            To the extent allowed by applicable law, we reserve the right to change this Privacy
            Policy at any time. The date at the top of this Privacy Policy will tell you when the
            most recent changes were made. We may also provide notice to you in other ways, such as
            through contact information you have provided. Your continued use of the Services after
            the effective date of the revised Privacy Policy will constitute your consent to those
            changes to the fullest extent allowed by applicable law. However, we will provide notice
            and obtain your consent (opt-in or opt-out) if required. Note that you may no longer be
            able to use certain or any features of the Services if you do not consent to the revised
            Privacy Policy.
          </NormalText>
          <HeadText>
            11. Consent to International Transfer of Your Information and General Processing
          </HeadText>
          <NormalText>
            We are a US-based company, so if you are located outside of the United States, please be
            aware that the information that we collect from you will be transferred to, and stored
            at, a destination outside of your country. By using the Services or providing us with
            any information, you understand and consent to this transfer to, and processing, usage,
            sharing, and storage of your information in the United States and other jurisdictions,
            which may have different or less protective privacy laws than those in your country. As
            a result, this information may be subject to access requests from governments, courts,
            or law enforcement in the United States and other countries according to the laws in
            those jurisdictions. Your information will also be disclosed to third parties as
            described in the “How We Share Your Information” section above.
          </NormalText>
          <NormalText>
            In certain jurisdictions we may require your consent or authorization to use or share
            your personal information for the purposes described in this Privacy Policy. By
            providing your personal information to us, you expressly provide such consent or
            authorization to the extent it is required. In addition, you may have additional privacy
            rights under the law of your country of residence such as the rights to access, correct,
            delete, or object to further processing of your Personal Data. To submit a request,
            please click here: If you do not see an option that is applicable to you, please email
            us at <a href="mailto:privacy@Teachercool.com">privacy@Teachercool.com</a>.
          </NormalText>
          <HeadText>12. How Long We Retain Your Information</HeadText>
          <NormalText>
            We will retain the personal information described in this policy for as long as it is
            reasonably necessary for the purposes described herein, considering the time period
            reasonably necessary to: provide our Services to you; fulfill and honor the choices and
            rights you have requested; comply with our contractual obligations; enforce our Terms of
            Use for the Services; and comply with legal and regulatory requirements. Except as noted
            differently within our Services, we retain your personal information while you have an
            account with us, or while you are using our Services or continuing to visit us.
          </NormalText>
          <HeadText>13. Contact Us & Right to Lodge a Complaint</HeadText>
          <NormalText>
            If you have any questions, comments, or concerns regarding our Privacy Policy and/or
            practices, please send an email to: <a href="mailto:privacy@Teachercool.com">privacy@Teachercool.com</a> You may also contact us at
            Teachercool, Inc., Attn: Privacy Team, 3990 Freedom Circle, Santa Clara, California
            95054 USA. We would appreciate the opportunity to address your questions, comments and
            concerns directly via the contact information above. However, depending on your
            location, you may have the right to lodge a complaint with your local supervisory
            authority if you believe our processing of your personal information violates applicable
            law.
          </NormalText>
          <HeadText>14. Notice to Nevada Residents</HeadText>
          <NormalText>
            Nevada S.B. 220 provides consumers with the ability to opt out of the sale of their
            personal information. We do not sell your personal information as defined in S.B. 220.
            However, you may still submit an opt-out request, and if our practices were to change in
            the future, we would honor your request. If you are a Nevada resident and would like to
            opt out of the sale of your covered information, your request must be submitted to
            Teachercool, Inc., Attn: Privacy Team, 3990 Freedom Circle, Santa Clara, California
            95054 USA. Your request must include your full name, street address, city, state, zip
            code, and a valid email address so that we can contact you if needed regarding your
            request. If you previously provided a phone number, including it will assist us in
            making sure we identify you as someone who wants to opt out. You may be required to take
            reasonable steps as we determine from time to time to verify your identity and/or the
            authenticity of your request.
          </NormalText>
          <HeadText>15. Notice to California Residents</HeadText>
          <NormalText>
            This California Privacy Notice sets forth the disclosures and rights for California
            Consumers regarding their Personal Information, as required by the California Consumer
            Privacy Act of 2018 ({'"CCPA"'}), the California Privacy Rights Act of 2020 ({'"CPRA"'}
            ), and any implementing regulations adopted thereunder. Terms (including defined
            capitalized terms) used in this California Privacy Notice have the same meanings given
            in the CCPA and CPRA and the associated regulations, unless otherwise defined.
          </NormalText>
          <HeadText>EXERCISING YOUR CALIFORNIA RIGHTS</HeadText>
          <NormalText>
            California Consumers have the right to request: (1) that we disclose to you what
            Personal Information we collect, use, disclose, and sell, including the right to request
            that we provide to you the categories and specific pieces of Personal Information we
            have collected about you ({'"Right to Know"'}); (2) that we delete the Personal
            Information we collect about you ({'"Right to Delete"'}); (3) that we correct inaccurate
            Personal Information we hold about you (“Right to Correct”), (4) to opt-out from the
            sharing of your Personal Information and Sensitive Personal Information to a third party
            for cross-context behavioral advertising (i.e., targeted advertising) (
            {'“Right to Opt-Out of Sharing”'}), (5) to opt-out from the sale of their Personal
            Information and Sensitive Personal Information ({'“Right to Opt-Out of Sale”'}), and (6)
            that we limit the use or disclosure of your Sensitive Personal Information to purposes
            set forth in the statute, including that use which is necessary and anticipated to
            perform the services or provide the goods reasonably expected by an average consumer who
            requests those goods or services (
            {'“Right to Limit The Use and Disclosure of Sensitive Personal Information”'}), all
            subject to the meanings and exceptions set forth in the CCPA and CPRA. More information
            on each of these rights is below.
          </NormalText>
          <NormalText>
            In your request, you must provide enough information to allow us to verify you are the
            person about whom we collected personal information, or their authorized representative.
            You must also describe your request with enough detail so that we can understand,
            evaluate and respond to it. We can’t respond to your request if we can’t verify your
            identity. Making such a request does not require you to create an account with us, and
            we will only use the information you provide in a request to verify your identity.
          </NormalText>
          <NormalText>Verifying Your Requests</NormalText>
          <NormalText>
            We will take reasonable steps to verify your identity based upon the information you
            provide and the type of request you are making.
          </NormalText>
          <NormalText>
            When you exercise your Right to Know, Right to Delete, and/or Right to Correct, we may
            ask that you provide us with information, beyond your full name, in order to verify your
            identity and fulfill your request. If we are unable to verify that the individual
            submitting the request is the same individual about whom we have collected information
            (or someone authorized by that individual to act on their behalf), we will not be able
            to process the request. Pursuant to the CPRA, we will not require you to verify your
            identity, beyond asking for the information necessary to complete your request, when you
            exercise your Right to Opt-Out of Sharing, Right to Opt-Out of Sale, or Right to Limit
            the Use and Disclosure of Sensitive Personal Information.
          </NormalText>
          <HeadText>Agents</HeadText>
          <NormalText>
            If you are an authorized representative submitting a request on a user’s behalf, please
            email your request to <a href="mailto:privacy@Teachercool.com">privacy@Teachercool.com</a>per the instructions below. You may also
            make a request on behalf of your minor child. We will follow up to request a signed,
            written permission signed by the individual who is the subject of the request
            authorizing you to make the request on their behalf. The written permission must state
            your full legal name, the full legal name of the individual who is the subject of the
            request and needs to be clear about the permission granted. Alternatively, you may, but
            are not required, to submit a copy of a power of attorney under Probate Code sections
            4000-4465. In either case, please also indicate in your email the nature of your
            request. The consumer’s identity, in addition to your own, will need to be independently
            verified in order for us to be able to fulfill your request. We may also ask the
            consumer to directly confirm with us that they provided you permission to submit a
            request. Please keep in mind that if we do not receive adequate proof that you are
            authorized to act on the consumer’s behalf, we may deny the request.
          </NormalText>
          <HeadText>Right to Know</HeadText>
          <NormalText>
            California Consumers have the right to know what information we have collected about you
            (the categories and the specific pieces of information).
          </NormalText>
          <NormalText>
            If you are a California Consumer and would like to exercise your Right to Know, please
            submit your request here.
          </NormalText>
          <NormalText>
            In order to have us provide specific pieces of information, we will require a signed
            declaration under penalty of perjury that you are the consumer whose Personal
            Information is the subject of the request.
          </NormalText>
          <HeadText>Right to Delete</HeadText>
          <NormalText>
            California Consumers have the right to request that we delete information we have
            collected from you. If you are a California Consumer and would like to exercise your
            Right to Delete, please submit your request here.
          </NormalText>
          <NormalText>
            Please note that as part of the verification process, once you submit a request to
            delete, we may follow up and require you to confirm that you want your information
            deleted.
          </NormalText>
          <HeadText>Right to Correct Inaccurate Information</HeadText>
          <NormalText>
            California Consumers have the right to request that we correct inaccurate information we
            hold about you. If you are a California Consumer and would like to exercise your Right
            to Correct, please submit your request here.
          </NormalText>
          <HeadText>
            Right to Limit the Use and Disclosure of Sensitive Personal Information
          </HeadText>
          <NormalText>
            As disclosed in the chart below, we may collect certain information which is considered
            Sensitive Personal Information under California law. This includes race and gender
            identity. Under the CPRA Regulations, a business must provide the Right to Limit the Use
            and Disclosure of Sensitive Personal Information only when its use does not fall within
            the list of exceptions outlined in Sec. 7027(m). Teachercool’s use and disclosure of
            Sensitive Personal Information falls within this list of exemptions and we therefore do
            not offer an opt-out right at this time.
          </NormalText>
          <NormalText>
            Do Not Sell My Personal Information or Share for Cross Contextual Behavioral Advertising
          </NormalText>
          <NormalText>
            California Consumers have the right to opt-out of the sale of your Personal Information
            or Sensitive Personal Information. Teachercool does not sell Personal Information for
            monetary compensation.
          </NormalText>
          <NormalText>
            California Consumers also have the right to opt-out of the sharing of your Personal
            Information or Sensitive Personal Information to a third party for cross-context
            behavioral advertising (i.e., targeted advertising), whether or not for monetary or
            other valuable consideration. If you are a California Consumer and would like exercise
            your Right to Opt-Out of “Sales” or “Sharing” for Cross Contextual Behavioral
            Advertising, please submit your request here.
          </NormalText>
          <NormalText>
            Cookie-Based Opt-Outs for Do Not Sell My Personal Information or Share for Cross
            Contextual Behavioral Advertising
          </NormalText>
          <NormalText>
            Teachercool engages in online advertising practices (and certain analytics or similar
            activities), which may be considered a “sale” or “share” for cross-context behavioral
            advertising under the CCPA and CPRA. To opt out of cookies set by 3rd parties that may
            be considered {'"sales"'} or ({'“sharing”'}) under the CCPA and CPRA, please use the
            footer titled: {'“DO NOT SELL MY INFO”'} at the bottom of this webpage.
          </NormalText>
          <NormalText>
            In addition, the Digital Advertising Alliance offers tools for California consumers to
            send requests under the CCPA and CPRA to opt out of the sale of personal information by
            some or all of the participating companies. For more information, please visit:
            <Linked>https://www.privacyrights.info/</Linked>.
          </NormalText>
          <HeadText>Data Retention</HeadText>
          <NormalText>
            We will retain all categories of personal information described in this California
            Privacy Notice for as long as it is reasonably necessary for the purposes set out in
            this California Privacy Notice, considering the time period reasonably necessary to:
            provide our Services to you; fulfill and honor the choices and rights you have
            requested; comply with our contractual obligations; enforce our Terms of Use for the
            Services; and comply with legal and regulatory requirements. Except as noted differently
            within our Services, we retain your personal information while you have an account with
            us, or while you are using our Services or continuing to visit us.
          </NormalText>
          <NormalText>
            Right to Non-Discrimination for the Exercise of a Consumer’s Privacy Rights
          </NormalText>
          <NormalText>
            California consumers have the right to not receive discriminatory treatment for
            exercising CCPA and CPRA rights. We will not discriminate against you for exercising
            your CCPA and CPRA rights.
          </NormalText>
          <HeadText>PERSONAL INFORMATION WE COLLECT</HeadText>
          <NormalText>
            The Personal Information we collect about you will depend upon how you use the Services
            or otherwise interact with us. Accordingly, we may not collect all of the below
            information about you.
          </NormalText>
          <NormalText>
            In addition to the below, we may collect and/or use additional types of information and
            will do so after providing notice to you and obtaining your consent to the extent such
            notice and consent is required by the CCPA and CPRA.
          </NormalText>
          <HeadText>
            A. Category of Personal Information Collected: Identifiers (such as name, address,
            telephone number, email address, IP address, or account name)
          </HeadText>
          <HeadText>
            Categories of Sources from which the Information was Collected. We may collect this type
            of information from:
          </HeadText>
          <NormalText>You</NormalText>

          <NormalText>Third parties we partner with to offer services</NormalText>
          <NormalText>Third party financial assistance partners</NormalText>
          <NormalText>Cookies and Tracking Technologies,</NormalText>
          <NormalText>Third party social media companies</NormalText>
          <NormalText>Third party business partners</NormalText>
          <HeadText>
            Business or Commercial Purpose(s) for which Information is Collected. We may use this
            type of information to:
          </HeadText>
          <NormalText>
            Provide the Services and allow you to participate in features we offer
          </NormalText>
          <NormalText>Recognize you across devices</NormalText>
          <NormalText>
            Identify your preferences and tailor content recommendations and offers we display to
            you
          </NormalText>
          <NormalText>Process your transactions</NormalText>
          <NormalText>Verify your identity</NormalText>
          <NormalText>
            Investigate and prevent fraud and other illegal activities or activities that violate
            our policies
          </NormalText>
          <NormalText>Improve our Services and marketing endeavors</NormalText>
          <NormalText>
            Contact you regarding your use of the Services, and in our discretion, changes to our
            policies
          </NormalText>
          <NormalText>
            Facilitate your job search , process your employment application, and prepare related
            governmental and internal statistics reports
          </NormalText>
          <NormalText>
            Comply with the law and protecting the safety, rights, property, or security of
            Teachercool, the Services, consumers, and the general public
          </NormalText>
          <NormalText>For internal business purposes</NormalText>
          <NormalText>
            For other purposes disclosed to you at the time you provide your information or
            otherwise with your consent
          </NormalText>
          <HeadText>
            Categories of Third Parties to whom this type of Personal Information is Disclosed for a
            Business Purpose. We may disclose this type of information to:
          </HeadText>
          <NormalText>Instructors</NormalText>
          <NormalText>Other Users</NormalText>
          <NormalText>Affiliated Companies</NormalText>
          <NormalText>Service Providers</NormalText>
          <NormalText>Third parties we partner with to offer services</NormalText>
          <NormalText>Third party financial assistance partners</NormalText>
          <NormalText>
            Third parties whose features are integrated into the Services, such as social media
            companies
          </NormalText>
          <NormalText>
            Third parties with whom we have joint marketing and similar arrangements
          </NormalText>
          <NormalText>
            Third parties we partner with for contests, sweepstakes, or promotions
          </NormalText>
          <NormalText>Third party advertising and analytics companies</NormalText>
          <NormalText>
            Third parties who may acquire your information as a result of a merger, acquisition or
            otherwise ownership transition
          </NormalText>
          <NormalText>
            Other third parties (including government agencies) as required by law or in connection
            with court proceedings (such as pursuant to subpoenas or court orders)
          </NormalText>
          <NormalText>
            Third parties when you agree to or direct that we share your information with them
          </NormalText>
          <NormalText>
            Categories of Third Parties to Whom this Type of Personal Information is Sold or Shared
            for Cross Contextual Behavioral Advertising
          </NormalText>
          <NormalText>
            Third party advertising, analytics, and other marketing business partners may have
            access to this data through cookies and similar technologies, and this may be considered
            a “sale” or “share” under the CCPA and CPRA under certain circumstances.
          </NormalText>
          <HeadText>
            B. Category of Personal Information Collected: Any categories of Personal Information
            described in subdivision (v) of Section 1798.140 (such as name, address, or telephone
            number)
          </HeadText>
          <NormalText>
            Categories of Sources from which the Information was Collected. We may collect this type
            of information from:
          </NormalText>
          <NormalText>You</NormalText>
          <NormalText>Affiliated Companies</NormalText>
          <NormalText>Third parties we partner with to offer services</NormalText>
          <NormalText>Third party financial assistance partners</NormalText>
          <NormalText>Cookies and Tracking Technologies,</NormalText>
          <NormalText>Third party social media companies</NormalText>
          <NormalText>Third party business partners</NormalText>
          <NormalText>
            Business or Commercial Purpose(s) for which Information is Collected. We may use this
            type of information to:
          </NormalText>
          <NormalText>
            Provide the Services and allow you to participate in features we offer
          </NormalText>
          <NormalText>Recognize you across devices</NormalText>
          <NormalText>
            Identify your preferences and tailor content recommendations and offers we display to
            you
          </NormalText>
          <NormalText>Process your transactions</NormalText>
          <NormalText>Verify your identity</NormalText>
          <NormalText>
            Investigate and prevent fraud and other illegal activities or activities that violate
            our policies
          </NormalText>
          <NormalText>Improve our Services and marketing endeavors</NormalText>
          <NormalText>
            Contact you regarding your use of the Services, and in our discretion, changes to our
            policies
          </NormalText>
          <NormalText>
            Facilitate your job search , process your employment application, and prepare related
            governmental and internal statistics reports
          </NormalText>
          <NormalText>
            Comply with the law and protecting the safety, rights, property, or security of
            Teachercool, the Services, consumers, and the general public
          </NormalText>
          <NormalText>For internal business purposes</NormalText>
          <NormalText>
            For other purposes disclosed to you at the time you provide your information or
            otherwise with your consent
          </NormalText>
          <HeadText>
            Categories of Third Parties to whom this type of Personal Information is Disclosed for a
            Business Purpose. We may disclose this type of information to:
          </HeadText>
          <NormalText>Instructors</NormalText>
          <NormalText>Other Users</NormalText>
          <NormalText>Affiliated Companies</NormalText>
          <NormalText>Service Providers</NormalText>
          <NormalText>Third parties we partner with to offer services</NormalText>
          <NormalText>Third party financial assistance partners</NormalText>
          <NormalText>
            Third parties whose features are integrated into the Services, such as social media
            companies
          </NormalText>
          <NormalText>
            Third parties with whom we have joint marketing and similar arrangements
          </NormalText>
          <NormalText>
            Third parties we partner with for contests, sweepstakes, or promotions
          </NormalText>
          <NormalText>Third party advertising and analytics companies</NormalText>
          <NormalText>
            Third parties who may acquire your information as a result of a merger, acquisition or
            otherwise ownership transition
          </NormalText>
          <NormalText>
            Other third parties (including government agencies) as required by law or in connection
            with court proceedings (such as pursuant to subpoenas or court orders)
          </NormalText>
          <NormalText>
            Third parties when you agree to or direct that we share your information with them
          </NormalText>
          <NormalText>
            Categories of Third Parties to Whom this Type of Personal Information is Sold or Shared
            for Cross Contextual Behavioral Advertising
          </NormalText>
          <NormalText>
            Third party advertising, analytics, and other marketing business partners may have
            access to this data through cookies and similar technologies, and this may be considered
            a “sale” or “share” under the CCPA and CPRA under certain circumstances.
          </NormalText>
          <HeadText>
            C. Category of Personal Information Collected: Protected classification characteristics
            (such as race, age and gender)
          </HeadText>
          <NormalText>
            Categories of Sources from which the Information was Collected. We may collect this type
            of information from:
          </NormalText>
          <NormalText>You</NormalText>
          <NormalText>
            Business or Commercial Purpose(s) for which Information is Collected. We may use this
            type of information to:
          </NormalText>
          <NormalText>
            Provide the Services and allow you to participate in features we offer
          </NormalText>
          <NormalText>
            Investigate and prevent fraud and other illegal activities or activities that violate
            our policies
          </NormalText>
          <NormalText>Improve our Services and marketing endeavors</NormalText>
          <NormalText>
            Facilitate your job search, process your employment application, and prepare related
            governmental and internal statistics reports
          </NormalText>
          <NormalText>
            Comply with the law and protect the safety, rights, property, or security of
            Teachercool, the Services, consumers, and the general public
          </NormalText>
          <NormalText>For internal business purposes</NormalText>
          <NormalText>
            For other purposes disclosed to you at the time you provide your information or
            otherwise with your consent
          </NormalText>
          <HeadText>
            Categories of Third Parties to whom this type of Personal Information is Disclosed for a
            Business Purpose. We may disclose this type of information to:
          </HeadText>
          <NormalText>Third party service providers</NormalText>
          <NormalText>Affiliated Companies</NormalText>
          <NormalText>
            Third parties whose features are integrated with the Services, such as social media
            companies
          </NormalText>
          <NormalText>Third party advertising and analytics companies</NormalText>
          <NormalText>
            Third parties with whom we have joint marketing and similar arrangements
          </NormalText>
          <NormalText>
            Law enforcement, government entities, or others if required by law or in connection with
            court proceedings (such as pursuant to subpoenas or court orders)
          </NormalText>
          <NormalText>
            Third parties who may acquire your information as a result of a merger, acquisition, or
            other ownership transition;
          </NormalText>
          <NormalText>
            Third parties when you agree to or direct that we share your information with them
          </NormalText>
          <NormalText>
            Categories of Third Parties to Whom this Type of Personal Information is Sold or Shared
            for Cross Contextual Behavioral Advertising
          </NormalText>
          <NormalText>
            Third party advertising, analytics, and other marketing business partners may have
            access to this data through cookies and similar technologies, and this may be considered
            a “sale” or “share” under the CCPA and CPRA under certain circumstances.
          </NormalText>
          <HeadText>
            D. Category of Personal Information Collected: Commercial information (such as what you
            purchase or consider purchasing and other requests you make)
          </HeadText>
          <NormalText>
            Categories of Sources from which the Information was Collected. We may collect this type
            of information from:
          </NormalText>
          <NormalText>You</NormalText>
          <NormalText>Affiliated Companies</NormalText>
          <NormalText>Third parties we partner with to offer services</NormalText>
          <NormalText>Third party financial assistance partners</NormalText>
          <NormalText>Cookies and Tracking Technologies,</NormalText>
          <NormalText>Third party social media companies</NormalText>
          <NormalText>Third party business partners</NormalText>
          <NormalText>
            Business or Commercial Purpose(s) for which Information is Collected. We may use this
            type of information to:
          </NormalText>
          <NormalText>
            Provide the Services and allow you to participate in features we offer
          </NormalText>
          <NormalText>
            Identify your preferences and tailor content recommendations and offers we display to
            you
          </NormalText>
          <NormalText>Process your transactions</NormalText>
          <HeadText>Verify your identity</HeadText>
          <NormalText>
            Investigate and prevent fraud and other illegal activities or activities that violate
            our policies
          </NormalText>
          <NormalText>Improve our Services and marketing endeavors</NormalText>
          <NormalText>
            Comply with the law and protecting the safety, rights, property, or security of
            Teachercool, the Services, consumers, and the general public
          </NormalText>
          <NormalText>For internal business purposes</NormalText>
          <NormalText>
            For other purposes disclosed to you at the time you provide your information or
            otherwise with your consent
          </NormalText>
          <HeadText>
            Categories of Third Parties to whom this type of Personal Information is Disclosed for a
            Business Purpose. We may disclose this type of information to:
          </HeadText>
          <NormalText>Affiliated Companies</NormalText>
          <NormalText>Service Providers</NormalText>
          <NormalText>Third parties we partner with to offer services</NormalText>
          <NormalText>
            Third parties whose features are integrated into the Services, such as social media
            companies
          </NormalText>
          <NormalText>
            Third parties with whom we have joint marketing and similar arrangements
          </NormalText>
          <NormalText>Third party advertising and analytics companies</NormalText>
          <NormalText>
            Third parties who may acquire your information as a result of a merger, acquisition or
            otherwise ownership transition
          </NormalText>
          <NormalText>
            Other third parties (including government agencies) as required by law or in connection
            with court proceedings (such as pursuant to subpoenas or court orders)
          </NormalText>
          <NormalText>
            Third parties when you agree to or direct that we share your information with them
          </NormalText>
          <NormalText>
            Categories of Third Parties to Whom this Type of Personal Information is Sold or Shared
            for Cross Contextual Behavioral Advertising
          </NormalText>
          <NormalText>
            Third party advertising, analytics, and other marketing business partners may have
            access to this data through cookies and similar technologies, and this may be considered
            a “sale” or “share” under the CCPA and CPRA under certain circumstances
          </NormalText>
          <HeadText>
            E. Category of Personal Information Collected: Internet or other electronic network
            activity information(such as browsing history, buttons you click, and pages you visit on
            our Services)
          </HeadText>
          <NormalText>
            Categories of Sources from which the Information was Collected. We may collect this type
            of information from:
          </NormalText>
          <NormalText>You</NormalText>
          <NormalText>Cookies and Tracking Technologies</NormalText>
          <NormalText>Third party social media companies</NormalText>
          <NormalText>
            Business or Commercial Purpose(s) for which Information is Collected. We may use this
            type of information to:
          </NormalText>
          <NormalText>
            Provide the Services and allow you to participate in features we offer
          </NormalText>
          <NormalText>Recognize you across devices</NormalText>
          <NormalText>
            Identify your preferences and tailor content recommendations and offers we display to
            you
          </NormalText>
          <NormalText>Process your transactions</NormalText>
          <NormalText>
            Provide information on products/services we think you may be interested in
          </NormalText>
          <HeadText>Verify your identity</HeadText>
          <NormalText>
            Investigate and prevent fraud and other illegal activities or activities that violate
            our policies
          </NormalText>
          <NormalText>Improve our Services and marketing endeavors</NormalText>
          <NormalText>
            Contact you regarding your use of the services and, in our discretion, changes to our
            policies
          </NormalText>
          <NormalText>
            Comply with the law and protecting the safety, rights, property, or security of
            Teachercool, the Services, consumers, and the general public
          </NormalText>
          <NormalText>For internal business purposes</NormalText>
          <NormalText>
            For other purposes disclosed to you at the time you provide your information or
            otherwise with your consent
          </NormalText>
          <HeadText>
            Categories of Third Parties to whom this type of Personal Information is Disclosed for a
            Business Purpose. We may disclose this type of information to:
          </HeadText>
          <NormalText>Affiliated Companies</NormalText>
          <NormalText>Service Providers</NormalText>
          <NormalText>
            Third parties whose features are integrated into the Services, such as social media
            companies
          </NormalText>
          <NormalText>
            Third parties with whom we have joint marketing and similar arrangements
          </NormalText>
          <NormalText>Third party advertising and analytics companies</NormalText>
          <NormalText>
            Third parties who may acquire your information as a result of a merger, acquisition or
            otherwise ownership transition
          </NormalText>
          <NormalText>
            Other third parties (including government agencies) as required by law or in connection
            with court proceedings (such as pursuant to subpoenas or court orders)
          </NormalText>
          <NormalText>
            Third parties when you agree to or direct that we share your information with them
          </NormalText>
          <NormalText>
            Categories of Third Parties to Whom this Type of Personal Information is Sold or Shared
            for Cross Contextual Behavioral Advertising
          </NormalText>
          <NormalText>
            Third party advertising, analytics, and other marketing business partners may have
            access to this data through cookies and similar technologies, and this may be considered
            a “sale” or “share” under the CCPA and CPRA under certain circumstances.
          </NormalText>
          <HeadText>
            F. Category of Personal Information Collected: Sensory data (such as audio, video, or
            pictorial information)
          </HeadText>
          <NormalText>You</NormalText>
          <NormalText>Service providers</NormalText>
          <NormalText>
            Business or Commercial Purpose(s) for which Information is Collected. We may use this
            type of information to:
          </NormalText>
          <NormalText>
            Provide the Services and allow you to participate in features we offer
          </NormalText>
          <NormalText>Verify your identity</NormalText>
          <NormalText>
            Facilitate your job search , process your employment application, and prepare related
            governmental and internal statistics reports
          </NormalText>
          <NormalText>
            Investigate and prevent fraud and other illegal activities or activities that violate
            our policies
          </NormalText>
          <NormalText>
            Comply with the law and protecting the safety, rights, property, or security of
            Teachercool, the Services, consumers, and the general public
          </NormalText>
          <NormalText>For internal business purposes</NormalText>
          <NormalText>
            For other purposes disclosed to you at the time you provide your information or
            otherwise with your consent
          </NormalText>
          <HeadText>
            Categories of Third Parties to whom this type of Personal Information is Disclosed for a
            Business Purpose. We may disclose this type of information to:
          </HeadText>
          <NormalText>Instructors</NormalText>
          <NormalText>Other users</NormalText>
          <NormalText>Affiliated Companies</NormalText>
          <NormalText>Service Providers</NormalText>
          <NormalText>Third party advertising and analytics companies</NormalText>
          <NormalText>
            Third parties whose features are integrated into the Services, such as social media
            companies
          </NormalText>
          <NormalText>
            Third parties with whom we have joint marketing and similar arrangements
          </NormalText>
          <NormalText>
            Third parties who may acquire your information as a result of a merger, acquisition or
            other ownership transition
          </NormalText>
          <NormalText>
            Other third parties (including government agencies) as required by law or in connection
            with court proceedings
          </NormalText>
          <NormalText>
            Third parties when you agree to or direct that we share your information with them
          </NormalText>
          <NormalText>
            Categories of Third Parties to Whom this Type of Personal Information is Sold or Shared
            for Cross Contextual Behavioral Advertising
          </NormalText>
          <NormalText>
            We do not “sell” or “share” this information with third parties for cross-context
            behavioral advertising (i.e. targeted advertising).
          </NormalText>
          <HeadText>
            G. Category of Personal Information Collected: Professional or employment-related
            information
          </HeadText>
          <NormalText>
            Categories of Sources from which the Information was Collected. We may collect this type
            of information from:
          </NormalText>
          <NormalText>You</NormalText>
          <NormalText>Third party social media companies</NormalText>
          <NormalText>Service providers</NormalText>
          <HeadText>
            Business or Commercial Purpose(s) for which Information is Collected. We may use this
            type of information to:
          </HeadText>
          <NormalText>
            Provide the Services and allow you to participate in features we offer
          </NormalText>
          <NormalText>
            Identify your preferences and tailor content recommendations and offers we display to
            you
          </NormalText>
          <NormalText>Verify your identity</NormalText>
          <NormalText>
            Investigate and prevent fraud and other illegal activities or activities that violate
            our policies
          </NormalText>
          <NormalText>Improve our Services and marketing endeavors</NormalText>
          <NormalText>
            Contact you regarding your use of the Services, and in our discretion, changes to our
            policies
          </NormalText>
          <NormalText>
            Facilitate your job search , process your employment application, and prepare related
            governmental and internal statistics reports
          </NormalText>
          <NormalText>
            Comply with the law and protecting the safety, rights, property, or security of
            Teachercool, the Services, consumers, and the general public
          </NormalText>
          <NormalText>For internal business purposes</NormalText>
          <NormalText>
            For other purposes disclosed to you at the time you provide your information or
            otherwise with your consent
          </NormalText>

          <HeadText>
            Categories of Third Parties to whom this type of Personal Information is Disclosed for a
            Business Purpose. We may disclose this type of information to:
          </HeadText>
          <NormalText>Instructors</NormalText>
          <NormalText>Other Users</NormalText>
          <NormalText>Affiliated Companies</NormalText>
          <NormalText>Service Providers</NormalText>
          <NormalText>Third parties we partner with to offer services</NormalText>
          <NormalText>Third party financial assistance partners</NormalText>
          <NormalText>
            Third parties whose features are integrated into the Services, such as social media
            companies
          </NormalText>
          <NormalText>
            Third parties we partner with for contests, sweepstakes, or promotions
          </NormalText>
          <NormalText>Third party advertising and analytics companies</NormalText>
          <NormalText>
            Third parties who may acquire your information as a result of a merger, acquisition or
            otherwise ownership transition
          </NormalText>
          <NormalText>
            Other third parties (including government agencies) as required by law or in connection
            with court proceedings (such as pursuant to subpoenas or court orders)
          </NormalText>
          <NormalText>
            Third parties when you agree to or direct that we share your information with them
          </NormalText>
          <NormalText>
            Categories of Third Parties to Whom this Type of Personal Information is Sold or Shared
            for Cross Contextual Behavioral Advertising
          </NormalText>
          <NormalText>
            We do not “sell” or “share” this information with third parties for cross-context
            behavioral advertising (i.e. targeted advertising).
          </NormalText>
          <HeadText>H. Category of Personal Information Collected: Education Information</HeadText>
          <NormalText>
            Categories of Sources from which the Information was Collected. We may collect this type
            of information from:
          </NormalText>
          <NormalText>You</NormalText>
          <NormalText>
            Business or Commercial Purpose(s) for which Information is Collected. We may use this
            type of information to:
          </NormalText>
          <NormalText>
            Identify your preferences and tailor content recommendations and offers we display to
            you
          </NormalText>
          <NormalText>
            Investigate and prevent fraud and other illegal activities or activities that violate
            our policies
          </NormalText>
          <NormalText>Improve our Services and marketing endeavors</NormalText>
          <NormalText>
            Comply with the law and protecting the safety, rights, property, or security of
            Teachercool, the Services, consumers, and the general public
          </NormalText>
          <NormalText>For internal business purposes</NormalText>
          <NormalText>
            For other purposes disclosed to you at the time you provide your information or
            otherwise with your consent
          </NormalText>
          <HeadText>
            Categories of Third Parties to whom this type of Personal Information is Disclosed for a
            Business Purpose. We may disclose this type of information to:
          </HeadText>
          <NormalText>You</NormalText>
          <NormalText>Affiliated Companies</NormalText>
          <NormalText>Service Providers</NormalText>
          <NormalText>
            Third parties who may acquire your information as a result of a merger, acquisition or
            other ownership transition
          </NormalText>
          <NormalText>
            Other third parties (including government agencies) as required by law or in connection
            with court proceedings
          </NormalText>
          <NormalText>
            Third parties when you agree to or direct that we share your information with them
          </NormalText>
          <NormalText>
            Categories of Third Parties to Whom this Type of Personal Information is Sold or Shared
            for Cross Contextual Behavioral Advertising
          </NormalText>
          <NormalText>
            We do not “sell” or “share” this information with third parties for cross-context
            behavioral advertising (i.e. targeted advertising).
          </NormalText>
          <HeadText>
            I. Category of Personal Information Collected: Inferences drawn from other personal
            information (such as preferences, characteristics, predispositions, and behaviors)
          </HeadText>
          <NormalText>
            Categories of Sources from which the Information was Collected. We may collect this type
            of information from:
          </NormalText>
          <NormalText>You</NormalText>
          <NormalText>Tracking Technologies</NormalText>
          <NormalText>Third party social media companies</NormalText>
          <NormalText>Third party business partners</NormalText>
          <NormalText>
            Business or Commercial Purpose(s) for which Information is Collected. We may use this
            type of information to:
          </NormalText>
          <NormalText>
            Identify your preferences and tailor content recommendations and offers we display to
            you
          </NormalText>
          <NormalText>
            Investigate and prevent fraud and other illegal activities or activities that violate
            our policies
          </NormalText>
          <NormalText>Improve our Services and marketing endeavors</NormalText>
          <NormalText>
            Comply with the law and protecting the safety, rights, property, or security of
            Teachercool, the Services, consumers, and the general public
          </NormalText>
          <NormalText>For internal business purposes</NormalText>
          <NormalText>
            For other purposes disclosed to you at the time you provide your information or
            otherwise with your consent
          </NormalText>
          <HeadText>
            Categories of Third Parties to whom this type of Personal Information is Disclosed for a
            Business Purpose. We may disclose this type of information to:
          </HeadText>
          <NormalText>Affiliated Companies</NormalText>
          <NormalText>Service Providers</NormalText>
          <NormalText>Third party advertising and analytics companies</NormalText>
          <NormalText>
            Third parties whose features are integrated into the Services, such as social media
            companies
          </NormalText>
          <NormalText>
            Third parties with whom we have joint marketing and similar arrangements
          </NormalText>

          <NormalText>
            Third parties who may acquire your information as a result of a merger, acquisition or
            other ownership transition
          </NormalText>
          <NormalText>
            Other third parties (including government agencies) as required by law or in connection
            with court proceedings
          </NormalText>

          <NormalText>
            Third parties when you agree to or direct that we share your information with them
          </NormalText>
          <NormalText>
            Categories of Third Parties to Whom this Type of Personal Information is Sold or Shared
            for Cross Contextual Behavioral Advertising
          </NormalText>
          <NormalText>
            Third party advertising, analytics, and other marketing business partners may have
            access to this data through cookies and similar technologies, and this may be considered
            a “sale” or “share” under the CCPA and CPRA under certain circumstances
          </NormalText>
          <HeadText>QUESTIONS AND CONTACT INFORMATION</HeadText>

          <BoldText>Teachercool, Inc.</BoldText>
          <BoldText>Attn: Privacy Team</BoldText>
          <BoldText>3990 Freedom Circle</BoldText>
          <BoldText>Santa Clara, CA 95054</BoldText>
          <BoldText><a href="mailto:privacy@Teachercool.com">privacy@Teachercool.com</a> Other California Rights</BoldText>
          <NormalText>
            California residents have the right to request from companies conducting business in
            California certain information relating to third parties to which the company has
            disclosed certain categories of personal information during the preceding year for the
            third parties’ direct marketing purposes. Alternatively, the law provides that a company
            may comply, as Teachercool does, by disclosing in its privacy policy that it provides
            consumers choice (opt-out or opt-in) regarding sharing personal information with third
            parties for those third parties’ direct marketing purposes, and information on how to
            exercise that choice. Teachercool will provide you choice prior to sharing your personal
            information with third parties for their direct marketing purposes. If you do not opt-in
            or if you choose to opt-out at the time Teachercool offers that choice, we will not
            share your personal information with that third party for its direct marketing purposes.
          </NormalText>
          <NormalText>
            California customers may request further information about our compliance with this law
            by e-mailing <a href="mailto:privacy@Teachercool.com">privacy@Teachercool.com</a> or writing to us at Teachercool, Inc., Attn:
            Privacy Team, 3990 Freedom Circle, Santa Clara, California 95054. You must put the
            statement “Your California Privacy Rights” in the subject field of your email or in the
            address line of your envelope. You must include your name, street address, city, state,
            and ZIP code. We are not responsible for notices that are not labeled or sent properly,
            or do not have complete information.
          </NormalText>
          <HeadText>16. Notice to Virginia Residents</HeadText>
          <NormalText>
            We set forth above the categories of personal data we process, the purpose for
            processing personal data, the categories of personal data shared, and the categories of
            third parties with whom personal data is shared.
          </NormalText>
          <NormalText>
            If you are a Virginia Consumer and would like to exercise your rights pursuant to the
            Virginia Consumer Data Protection Act (VCDPA), and any implementing regulations adopted
            thereunder, please complete this form to submit a request or use the “DO NOT SELL MY
            INFO” footer at the bottom of this webpage page to opt-out of certain processing as
            described in more detail below.
          </NormalText>
          <NormalText>
            Virginia Consumers have the following rights, all subject to the meanings and exceptions
            set forth in the VCDPA:
          </NormalText>
          <NormalText>
            1. To confirm whether we are processing your Personal Data and request to access such
            data ({'"Right to Access"'}).
          </NormalText>
          <NormalText>
            2. That we correct inaccurate Personal Data we hold about you (“Right to Correct”).
          </NormalText>
          <NormalText>
            3. That we delete the Personal Data provided by you or obtained about you ({'"Right to  Delete"'}).
          </NormalText>
          <NormalText>
            4. To obtain a copy of the Personal Data previously provided by you to us and, to the
            extent feasible, in a readily usable format to allow data portability (“Right to
            Obtain”).
          </NormalText>
          <NormalText>5. To opt-out out of:</NormalText>
          <NormalText>
            the processing of your Personal Data for the purposes of targeted advertising (“Right to
            Opt-Out of Targeted Advertising”).
          </NormalText>
          <NormalText>
            *Teachercool engages in online advertising practices (and certain analytics or similar
            activities) that may be considered “targeted advertising” under the VCDPA. You may opt
            out of this processing by using the “DO NOT SELL MY INFO” footer at the bottom of this
            webpage.
          </NormalText>
          <NormalText>
            the processing of your personal data for the purposes of a sale (“Right to Opt-Out of
            Sale”).
          </NormalText>
          <NormalText>
            *Teachercool does not sell your personal data as defined by the VCDPA and therefore does
            not offer this opt out right.
          </NormalText>
          <NormalText>
            the processing of your personal data for the purposes of profiling (“Right to Opt-Out of
            Profiling”).
          </NormalText>
          <NormalText>
            *Teachercool does not engage in profiling as defined by the VCDPA and therefore does not
            offer this opt out right.
          </NormalText>
          <HeadText>
            6. To opt-in to the processing of Sensitive Data (“Right to Opt-In to Processing of
            Sensitive Data”). If applicable, we will obtain your consent to processing of Sensitive
            Data we collect.
          </HeadText>
          <NormalText>VCDPA Appeals</NormalText>
          <NormalText>
            Pursuant to the VCDPA, if, for any reason, you would like to appeal our decision
            relating to your request, you have the right to submit an appeal and can do so by
            emailing us at <a href="mailto:privacy@Teachercool.com">privacy@Teachercool.com</a> or following the instructions contained in the
            communication of our initial decision relating to your request. Please include your full
            name, the basis for your appeal, and any additional information to consider
          </NormalText>
        </Card>
      </Container>
      <Footer />
    </>
  )
}

export default TeacherCoolPrivacyPolicy
