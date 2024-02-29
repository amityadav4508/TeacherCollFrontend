import React from 'react'
import { Card, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Footer from 'src/layout/Footer'
import NavTopBar from 'src/layout/NavTopBar'

const GeneralPolicies = () => {

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

  const Linked = (props) => {
    const children = props
    return <Link to={children.to}        target="_blank"
    rel="noopener noreferrer" className="fs-5 gray-600 fw-normal text-left mb-5 ">{children.children}</Link>
  }

  return (
    <>
      <NavTopBar />
      <Container>
        <Card className="border-0 shadow policy p-5">
          <h2 className="text-center">General Policies</h2>
          <NormalText>
            If you`&apos;`re not satisfied in any way with the physical book you receive, or it turns out
            you don`&apos;`t need it, just return the book in the same condition within 21 days of your
            purchase using our box and the prepaid shipping label we provide. We`&apos;`ll provide a full
            refund minus the original cost of shipping, if applicable. When returning a book early
            using the prepaid label, the return shipping costs are covered at no cost. We do not
            charge any hidden restocking fees. If you are returning a book you purchased in new
            condition, it must be returned in new condition to be eligible for a refund. The 21-day
            refund qualifying period begins the day you place your order. This date can be found in
            My Account and in your order confirmation email. To qualify for your refund, your return
            package must be postmarked within 21 days of your ordered-on date. You can print your
            label from My Account.
          </NormalText>
          <HeadText>Digital Return Policy:</HeadText>
          <NormalText>
            If you`&apos;`re not satisfied with any digital book that you rent or purchase from us, or you
            cancel a class and don`&apos;`t need it, you may return it for a full refund within the first
            10 days of your purchase by going to your My Account page and following the instructions
            for digital returns. No returns on digital products are available after 10 days from
            purchase have elapsed. You may only return the same digital book once. If you rent or
            buy a digital book after returning that same book, no returns will be available.
          </NormalText>
          <HeadText>Shipping Policy:</HeadText>
          <NormalText>
            We work with our third-party partners to guarantee arrival of your textbooks no later
            than the date stated on your order confirmation. If you still haven`&apos;`t received your
            order by then, let us know and we`&apos;`ll refund your shipping costs and, if necessary, ship
            you another copy.
          </NormalText>
          <HeadText>Missing Books:</HeadText>
          <NormalText>
            If your book is missing, you must reach out to our customer service team within 45 days
            of the guaranteed shipment date on your order confirmation in order to receive a refund
            or a replacement. Otherwise, if your book is not returned by the due date listed on the
            order confirmation and in your MyAccount page, Teachercool may automatically extend the
            rental for a fee or charge you the purchase price of the book minus any rental fees you
            have paid. Teachercool will email you prior to the due date with your options and a
            reminder. If you were charged the purchase price but still want to return the book, you
            must return the book within 7 days of being charged for a refund of the purchase fee. If
            you decide to keep a book it will never cost more than the purchase price.
          </NormalText>
          <HeadText>Quality of Book Guarantee:</HeadText>
          <NormalText>
            If you`&apos;`re unhappy with the quality of any of our books, we`&apos;`ll immediately have another
            copy of the same book shipped to you at our expense. To qualify, you must return the
            original rental book to one of our third-party partners in accordance with the Return
            Shipping Policy section below. If you`&apos;`ve purchased a new book, the book must be returned
            in brand new condition to qualify for a refund.
          </NormalText>
          <HeadText>Highlighting:</HeadText>
          <NormalText>
            Limited highlighting is permitted, but please do not write in rented physical books.
            Remember that rentals are intended for multiple users.
          </NormalText>
          <HeadText>Supplemental Material:</HeadText>
          <NormalText>
            Unfortunately, we cannot guarantee that supplemental materials (CDs and CD-ROMs,
            Workbooks, Study Guides) will be included with your rental. They are available for
            purchase on select titles, however. If you receive your book with any of the above
            items, you are welcome to use it. We ask that you return your book complete with any
            supplemental materials you received.
          </NormalText>
          <HeadText>Damage to Books:</HeadText>
          <NormalText>
            We expect books to have some ordinary wear, and limited highlighting is permitted. If a
            book is returned in damaged condition (stained, torn pages, loose binding etc.), you`&apos;`ll
            be charged the purchase price of the book, that is, the list price minus any rental fees
            you have already paid. In those cases, we`&apos;`ll contact you and offer to have the damaged
            book returned to you at your cost. If you do not claim the book within 14 days of our
            contact, Teachercool will assume you have abandoned the book, and will work with our
            third-party partners to donate the book, recycle it or otherwise dispose of it.
          </NormalText>
          <HeadText>Lost Books:</HeadText>
          <NormalText>
            If your book is lost or stolen, you can always try to find an identical book in the same
            condition and send it back. Or pay the purchase price of the lost book, that is, the
            list price minus any rental fees you have already paid. To pay for a lost, stolen, or
            damaged book, you can find instructions in My Account.
          </NormalText>
          <HeadText>Extension Policy:</HeadText>
          <NormalText>
            You can extend your rental through My Account. If you plan on renting your books for the
            upcoming term and our term due date does not cover your full term, please contact us via
            phone or chat, and we will extend your rental period to fit your term. Extensions may
            not be available on some products.
          </NormalText>
          <HeadText>Late Returns:</HeadText>
          <NormalText>
            When you rent your book, you will be given a due date for returning the book. Your book
            is `&apos;`returned`&apos;` as of the date that you drop off your book, properly packaged and labeled,
            with the specified carrier for delivery to one of our third-party partners. You may
            print your return shipping label by logging into your account. The shipping label will
            contain information on the third-party partner that the book will need to be returned
            to. If your book is not returned by the due date, Teachercool may automatically extend
            the rental for a fee or charge you the purchase price of the book minus any rental fees
            you have paid -- Teachercool will email you prior to the due date with your options and
            a reminder. If you were charged the purchase price but still want to return the book,
            you must return the book within 7 days of being charged for a refund of the purchase
            fee. If you decide to keep a book it will never cost more than the purchase price.
          </NormalText>
          <HeadText>Purchasing a Book:</HeadText>
          <NormalText>
            If you need to purchase your rental, you can do so through My Account. The purchase
            price is the list price minus any rental fees you have already paid. You can purchase
            your book or request an extension at any time during your rental period, up until your
            due date. Digital products may have their own purchase requirements.
          </NormalText>
          <HeadText>Out-of-Stock Products:</HeadText>
          <NormalText>
            If an item is out of stock, your order may be delayed. We will notify you of any book
            that is unavailable for immediate shipment. You may cancel any item not being prepared
            for shipment. You may request a cancellation through the `&apos;`My Account`&apos;` section of
          <Linked to="/">Teachercool.com</Linked>   or by contacting customer service.
          </NormalText>
          <HeadText>Multiple Product Orders:</HeadText>
          <NormalText>
            We work with our third-party partners to attempt to have all products in an order
            shipped at the same time and in the same package. However, all your books may not come
            from the same third-party partner and may be shipped separately. Products that are
            unavailable at the time of shipping will be shipped as they become available. Digital
            products may be delivered electronically or made available through password or other
            access to a website.
          </NormalText>
          <HeadText>Return Shipping Policy (Rentals):</HeadText>
          <NormalText>
            When you rent non-digital items through the Service, you must return those items to our
            third-party partner (as indicated on the shipping label) by the end of your rental
            period. If you purchased the book, you need not return it. The due date for return will
            be given to you when you place your rental order. You are responsible for any late
            return shipments that are not postmarked by the due date. You must ship your items to
            our third-party partner as indicated on the shipping label at its designated location by
            your due date to avoid extension or replacement fees. If you do need to keep your rental
            for longer than the original term, you may purchase the book or buy an extension in the
            `&apos;`My Account`&apos;` section on the Teachercool Websites.
          </NormalText>
          <NormalText>
            You may return the items to our third-party partners by using the shipping carrier
            label. We will provide you with a printable prepaid shipping label. Simply log on to the
            Teachercool Websites and click the `&apos;`Return`&apos;`button on the `&apos;`My Account`&apos;` page. Follow the
            prompts to generate the label. If you return your items in this manner, you must use
            this prepaid shipping label to ensure delivery and proper accounting of your return.
          </NormalText>
          <NormalText>
            If your return is not postmarked by your due date, you may be charged extension and/or
            replacement fees according to Teachercool`&apos;`s then-current Replacement Policy. Teachercool
            may change this policy at any time, and the change will take effect immediately for any
            book rented on or after the date of the change, so please check the Teachercool Websites
            regularly for the most recent return terms.
          </NormalText>
          <NormalText>
            Books and other items should be packaged appropriately to keep them from being damaged
            during shipping. If an item is sent back without proper packaging material, and the item
            has visible damage, it will be your responsibility to pay for that damage. If you were
            charged the purchase price but still want to return the book, you must return the book
            within 7 days of being charged for a refund of the purchase fee.
          </NormalText>
          <HeadText>Returning the Wrong Book:</HeadText>
          <NormalText>
            If you return the wrong book or personal property to our third-party partners, your
            property will be held for 14 days in their warehouse. You may contact us within this
            time to have it returned to you at your expense or Teachercool will treat this as
            abandoned property and may direct our third-party partners to donate it, recycle it or
            liquidate it.
          </NormalText>
          <HeadText>Buyback Program:</HeadText>
          <NormalText>
            Teachercool`&apos;`s third-party partners may, from time to time, offer a `&apos;`buyback`&apos;`program
            where they may purchase textbooks. For the terms of the buyback program, please visit
            this website.
          </NormalText>
          <HeadText>Abandoned Books:</HeadText>
          <NormalText>
            Teachercool may need to contact you to determine whether you wish to have books returned
            to you at your expense. This may occur, for example, if you return a book that has been
            damaged beyond repair and you are charged for a replacement book, or if you return the
            wrong book. In those circumstances, Teachercool will attempt to contact you at the email
            address you have on file with us to ask you what you would like us to do with the book.
            If you do not respond to Teachercool`&apos;`s email within 14 days, Teachercool will assume you
            have abandoned the book, and Teachercool will work with our third-party partners to
            donate the book, liquidate it or recycle it.
          </NormalText>
          <HeadText>Gift Certificates:</HeadText>
          <NormalText>
            Teachercool gift certificates never expire, and the recipient can use them toward any
            book that Teachercool rents or sells, even shipping and tax. It`&apos;`s an electronic
            certificate, which means that you can deliver it right away and they can start using it.
            It`&apos;`s a credit on their Teachercool account, so it won`&apos;`t get lost. It may not be redeemed
            for cash.
          </NormalText>
          <HeadText>Teachercool Credit:</HeadText>
          <NormalText>
            Teachercool Credit can be used toward any book that Teachercool rents or sells, even
            shipping and tax. If you were given a credit from customer support, it may not be
            redeemed for cash.
          </NormalText>
          <HeadText>Teachercool Coupon Codes:</HeadText>
          <NormalText>
            From time to time, Teachercool may offer savings programs that give students a discount
            when they enter a code at checkout. Teachercool may end the discount programs and expire
            these codes at any time without notice to the recipients. Coupon codes apply only toward
            the book rental or purchase cost; they do not apply to taxes, shipping, extension or
            late fees, or purchase fees.
          </NormalText>
          <HeadText>Suspicious Activity Policy:</HeadText>
          <NormalText>
            At Teachercool, we always assume best-intent from our students. However, in order to
            protect our users and content, we may take measures to prevent content capture and other
            forms of misuse of our product. We reserve the right to restrict the number of devices,
            payment methods, access locations, screenshots, subjects, topics, and content a user can
            access over a given time period. Violations may result in multifactor authentication and
            password resets and, in extreme cases, account suspension and deactivation.
          </NormalText>
        </Card>
      </Container>
      <Footer />
    </>
  )
}

export default GeneralPolicies
