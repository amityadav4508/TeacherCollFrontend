import React from 'react'
import { Card, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Footer from 'src/layout/Footer'
import NavTopBar from 'src/layout/NavTopBar'

const CopyRightPolicy = () => {
  const BoldText = (props) => {
    const children = props
    return <p className="fs-5 gray-600 fw-normal text-left mb-5 mt-5">{children.children}</p>
  }
  const Linked = (props) => {
    const children = props
    return <Link to={children.to}        target="_blank"
    rel="noopener noreferrer" className="fs-5 gray-600 fw-normal text-left mb-5 ">{children.children}</Link>
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
  const UnderLineText = (props) => {
    const children = props
    return (
      <div>
        <p className="fs-5 gray-600 fw-normal text-left mb-2 ">{children.children}</p>
      </div>
    )
  }

  return (
    <>
      <NavTopBar />
      <Container>
        <Card className="border-0 shadow policy p-5">
          <h2 className="text-center">Copyright Policy – Teachercool.com</h2>
          <BoldText>
            Teachercool respects the intellectual property rights of others and we expect users of
            our websites and services to do the same.
          </BoldText>
          <BoldText>
            Teachercool is designed to support learning, not replace it. Misuse of our platform by
            any user may have serious consequences, up to and including being banned from our sites
            or having an academic integrity investigation opened by the user’s institution. To learn
            more about our academic integrity policy, please <br />
            visit <Linked to="/honorcode">https://www.Teachercool.com/honorcode.</Linked>
          </BoldText>
          <BoldText>
            In keeping with the Digital Millennium Copyright Act, we will respond promptly to valid
            written notification of claimed infringement regarding content posted on Teachercool
            sites. Please note that Teachercool may forward the written notification, including the
            complainant’s contact information, to the user who posted the content. It is also our
            policy to disable and/or terminate the accounts of users who repeatedly infringe the
            copyrights of others.
          </BoldText>
          <HeadText>Notice of Copyright Infringement</HeadText>
          <NormalText>
            If you are a copyright owner or are otherwise authorized to act on behalf of one, you
            can report alleged copyright infringement on Teachercool sites by filling out our DMCA
            Notice of Claimed Infringement Form or sending the following information to
            Teachercool’s Copyright Agent via (i) email to CopyrightAgent@Teachercool.com, An
            electronic or physical signature of the copyright owner or the person authorized to act
            on behalf of the owner of the copyright interest;
          </NormalText>
          <BoldText>
            A description of the copyrighted work that you claim has been infringed;
          </BoldText>
          <UnderLineText>
            1. The URL(s) of our website where the material that you claim is infringing occurs;
          </UnderLineText>
          <UnderLineText>2. Your contact information;</UnderLineText>
          <UnderLineText>
            3. Your sworn statement that you have a good faith belief that the disputed use is not
            authorized by the copyright owner, its agent, or the law; and
          </UnderLineText>
          <UnderLineText>
            4. Your sworn statement, made under penalty of perjury, that the information in your
            notice is accurate and that you are the copyright owner or are authorized to act on the
            copyright owner’s behalf.
          </UnderLineText>
          <HeadText>Counter-Notice</HeadText>
          <NormalText>
            If you believe that a notice of copyright infringement has been improperly submitted
            against you, you may submit a counter-notice to Teachercool’s Copyright Agent via the
            contact information provided above.
          </NormalText>
          <HeadText>FAQs</HeadText>
          <NormalText>
            As with all legal matters, it is always best to consult with a professional about your
            specific questions or situation. We strongly encourage you to do so before taking any
            action that might impact your rights. These FAQs are not legal advice and shouldn’t be
            taken as such.
          </NormalText>
          <HeadText>Why was my posting removed?</HeadText>
          <NormalText>
            Your posting was removed because the owner of copyrights in that content requested that
            it be removed.
          </NormalText>
          <NormalText>
            If you have concerns or questions about why your posting was reported, you may contact
            the copyright owner directly. Their contact information is in the email you received
            from us when your posting was removed. You may also contest the removal by submitting a
            counter-notice to <p className="fw-bold">Teachercool’s</p> Copyright Agent as described
            above.
          </NormalText>
          <HeadText>Can I repost material that you have removed?</HeadText>
          <NormalText>
            Generally, no. If you believe that your post was removed in error, try to contact the
            rights owner directly or submit at counter-notice as described above.
          </NormalText>
          <NormalText>
            If you continue to post infringing material or repost content that have been reported to
            and taken down by Teachercool, Teachercool may suspend or terminate your ability to post
            content on all Teachercool sites and/or terminate your account with Teachercool.
          </NormalText>
          <HeadText>
            Can I copy portions of textbooks and include them in my postings to Teachercool sites?
          </HeadText>
          <NormalText>
            Generally, you may not copy portions of copyrighted works and include them in your
            postings without permission from the rights owner. Postings that include excerpts from
            copyrighted works (such as, textbooks, ebooks, test banks, solutions manuals, or
            teacher’s editions books) may be blocked or removed by Teachercool.
          </NormalText>
        </Card>
      </Container>
      <Footer />
    </>
  )
}

export default CopyRightPolicy
