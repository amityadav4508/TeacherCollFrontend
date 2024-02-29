import React from 'react'
import { Card, Container } from 'react-bootstrap'
import Footer from 'src/layout/Footer'
import NavTopBar from 'src/layout/NavTopBar'

const HonorCode = () => {
  const BoldText = (props) => {
    const children = props
    return <p className="fs-5 gray-600 fw-normal text-left mb-2 mt-2">{children.children}</p>
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

  return (
    <>
      <NavTopBar />
      <Container>
        <Card className="border-0 shadow policy p-5">
          <HeadText>
            The Terms of Use and these Additional Terms apply. To the extent there is a conflict
            between these Additional Terms and the Terms of Use, these Additional Terms will
            control.
          </HeadText>
          <HeadText>Our Commitment to Upholding Academic Integrity</HeadText>
          <BoldText>
            Teachercool is committed to students and their learning outcomes. We believe academic
            integrity is a fundamental part of the learning process, and we work hard to preserve
            it.{' '}
          </BoldText>
          <NormalText>
            • Our services are designed to support learning, not replace it. We provide on demand
            learning support online, 24/7. We offer step-by-step explanations and learning support
            tools like flashcards, exam prep, writing and anti-plagiarism tools, and other services,
            including textbook rentals, to support students wherever and whenever they need it.
          </NormalText>
          <NormalText>
            • Our services should only be used to support learning and assist with understanding
            coursework and study.
          </NormalText>
          <NormalText>
            • They are expressly not intended to be used for cheating or fraud – like asking for
            answers to an active test or exam, or copying answers found online and submitting them
            as one’s own. These actions defeat the purpose of learning and are not fair to anyone.
          </NormalText>
          <NormalText>
            We don’t tolerate abuse of our platform or services. Misuse of our Services can have
            serious consequences, including, without limitation, being banned from our platform. If
            we learn that our Services have been misused, we may take any action necessary to
            maintain the integrity of our platform and our community. This may include removing
            offending materials and terminating the accounts of users involved with misusing our
            platform.
          </NormalText>
          <HeadText>Teachercool Honor Code </HeadText>
          <NormalText>
            Use of any information provided on the Teachercool platform for any service including
            solutions, answers, materials, or information available on or through the platform used
            to cheat on an exam or graded work is a violation of our Honor Code.
          </NormalText>
          <NormalText>Examples of misuse include:</NormalText>
          <NormalText>
            1. Using Services to ask questions that are being asked as part of an exam or graded
            work.
          </NormalText>
          <NormalText>
            2. Passing along any solutions, materials, or other information from the Services as
            your own work without attribution to Teachercool .
          </NormalText>
          <NormalText>
            We will take swift action against anyone found violating our Honor Code. If Teachercool
            is presented with evidence that its Services have been used in a manner contrary to its
            Honor Code or any other part of our Terms of Use, Teachercool may, in its sole
            discretion, remove the materials and terminate the account of the involved users. Learn
            more about Teachercool`&#39;`s approach to upholding  Academic Integrity
          </NormalText>
          <HeadText>Open an Honor Code Investigation</HeadText>
          <NormalText>
            Professors and official representatives of a college or university can request an honor
            code investigation.
          </NormalText>
          <NormalText>
            Upon verification of the request, Teachercool will provide the following information for
            each URL submitted:
          </NormalText>
          <NormalText>• Time and date stamp of question posted</NormalText>
          <NormalText>• Time and date stamp of solution posted</NormalText>
          <NormalText>
            To ensure we protect the privacy of our users, we do not share personal information as
            part of honor code investigations.
          </NormalText>
          <NormalText>
            To initiate an honor code investigation, please complete this form and provide an
            official letter of request on the affiliated school’s letterhead signed by a Dean or
            Academic Integrity officer from the same institution. This step cannot be waived or
            circumvented, as it is part of Teachercool ’s commitment to student privacy.
          </NormalText>
          <HeadText>Honor Shield® Answer Blocking Tool Terms</HeadText>
          <NormalText>
            The Terms of Use and these Additional Terms apply to the Honor Shield® Answer Blocking
            Tool (the “Tool”). To the extent there is a conflict between these Additional Terms and
            the Terms of Use, the Additional Terms will control. These terms apply to you if you are
            an instructor.
          </NormalText>
          <BoldText>Purpose of the Tool</BoldText>
          <NormalText>
            The Tool is provided free of charge in order to deter cheating on Exams using
            Teachercool Study. The Tool blocks answers to Exam questions for the duration of the
            Exam (“Exam Timeframe”).
          </NormalText>
          <NormalText>
            Instructors (“you” or “your”) can use the Tool to confidentially upload exam content
            (“Exam Content”) at least 48 hours prior to an examination (“Exam”). Please allow for up
            to five (5) days prior to your first Exam for first time account set up and verification
            of your credentials.
          </NormalText>
          <NormalText>
            Teachercool (“we” or “our”) will not post your uploaded Exam Content or use it for any
            purpose other than as described in these Additional Terms. Please be assured that
            Teachercool deletes your uploaded Exam Content on a monthly basis.
          </NormalText>
          <NormalText>
            Teachercool may respond to your inquiries regarding your Exam with metrics related to
            your Exam. Further, Teachercool may use aggregated anonymized data related to the usage
            of the Tool to provide feedback and to improve the Tool.
          </NormalText>
          <NormalText>
            Teachercool may modify the Tool, including to add features or improve existing features,
            at any time without notice.
          </NormalText>
          <BoldText>Your Content</BoldText>
          <NormalText>
            Exam Content that you upload to the Tool is and remains your content. Teachercool does
            not claim any intellectual property rights over the materials you upload to the Tool. By
            uploading your content to the Tool, you agree that Teachercool may review your Exam
            Content for any reason, including for compliance with our prohibited content
            requirements, but Teachercool has no obligation to review anything that you upload. You
            agree that you are uploading your Exam Content to the Tool at your direction and
            Teachercool does not in any way certify, provide approval or permission prior to you
            uploading your Exam Content
          </NormalText>
          <BoldText>Limitations of the Tool</BoldText>
          <NormalText>
            The Tool is not perfect; Teachercool is still working out the kinks. It is our intention
            to iterate on and improve the Tool and we hope to provide increased accuracy and
            functionality over time.
          </NormalText>
          <NormalText>Here are some of its limitations:</NormalText>
          <NormalText>
            • If an Exam question is independently available in our Textbook Solutions product, the
            Tool will not to be able to block the corresponding answer during the Exam Timeframe.
          </NormalText>
          <NormalText>
            • If a user posts an Exam question outside of the Exam Timeframe, it will not be
            blocked. In accordance with Teachercool ’s Copyright Policy, copyright owners may submit
            a
          </NormalText>
          <NormalText>• Copyright takedown request to remove copyrighted material.</NormalText>
          <NormalText>
            • The Tool currently only accepts pdf and word (docx) files that are no more than 10MB
            in size and with no more than 200 questions.
          </NormalText>
          <NormalText>
            • You must have established a verified account at least five (5) days prior to your
            first Exam.
          </NormalText>
          <NormalText>
            • You must upload the Exam Content at least 48 hours prior to the start of the Exam
            Timeframe, which is up to twenty-four (24) hours.
          </NormalText>
          <NormalText>
            • If there are more than 48 hours remaining prior to the start of the Exam Timeframe,
            you have the ability to edit your Exam Content or upload a new Exam file altogether. If
            there are fewer than 48 hours remaining prior to the start of the Timeframe, you have
            the ability to edit the title of the Exam or cancel the Exam. You will not be able to
            edit the questions or upload a new file.
          </NormalText>
          <NormalText>
            • We are unable to provide any information regarding users who attempt to post a blocked
            Exam question during the Exam Timeframe.
          </NormalText>
          <BoldText>Right to Refuse Service</BoldText>
          <NormalText>
            Teachercool reserves the right to refuse to process any request received via the Tool.
            Some reasons that we may not process Tool requests may be: (i) the request was made less
            than forty-eight (48) hours from the start of the Exam Timeframe, (ii) the volume of
            requests received by our team becomes too great to timely process, (iii) we believe that
            requesters are not or are no longer verifiable educators, or (iv) an individual abuses
            the system, for example, by submitting an excessive number of requests. Those who, in
            our sole determination, abuse the Tool or take any action hindering our ability to
            operate the Tool for others, may be refused service and their account terminated.
          </NormalText>
        </Card>
      </Container>
      <Footer />
    </>
  )
}

export default HonorCode
