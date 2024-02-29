import React from 'react'
// import { Card, Col, Container, Row, Table } from 'react-bootstrap'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'
import { useSelector } from 'react-redux'

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
  },
  header : {
    display: "flex",
    justifyContent: "space-between"
  },
  left : {
    marginLeft: "20px"
  },
  right : {
    marginRight: "20px"
  },
  section: {
    margin: 10,
    padding: 10,
  },
  viewer: {
    width: window.innerWidth, //the pdf viewer will take up all of the width and height
    height: window.innerHeight,
  },
})

const PaymentInvoice = (props) => {
  return (
    <Document>
      <Page size="A4">
        <Text style={styles?.page}>
          <View style={styles?.header}>
            <Text style={styles?.left}>Company Name</Text>
            <Text style={styles?.right} >Date</Text>
          </View>
          <Text style={styles?.section}> Payment Status : Pending</Text>
          <Text style={styles?.section}> Transaction ID </Text>
          <Text style={styles?.section}> Order amount </Text>
        </Text>
      </Page>
    </Document>
  )
}

export default PaymentInvoice
