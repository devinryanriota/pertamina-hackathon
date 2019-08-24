/*!

=========================================================
* Material Dashboard React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

import assetService from '../../services/AssetService'

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const tableHeader = ["ID", "Scheme", "Name", "City", "Start Price", "Start Time", "End Time"]

class AssetList extends React.Component {
  constructor(props) {
    super()
    this.state = {
      tableData: [],
      classes: props.classes
    }
  }

  formatDataTable(data) {
    let res = []
    data.forEach((d) => {
      let result = []
      result.push(d['id'])
      result.push(d['scheme'])
      result.push(d['name'])
      result.push(d['city'])
      result.push(d['start_price'])
      result.push(d['start_time'])
      result.push(d['end_time'])
  
      res.push(result)
    })
    return res
  }

  componentDidMount() {
    //api call
    assetService.getAllAssets((result) => {
      if (result.success) {
        console.log('res2', result.data)
        this.setState({
          tableData: this.formatDataTable(result.data.data)
        })
      }
    });
  }

  render() {
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="success">
              <h4 className={this.state.classes.cardTitleWhite}>Assets</h4>
              <p className={this.state.classes.cardCategoryWhite}>
                Aset-aset
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={ tableHeader }
                tableData={ this.state.tableData }
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(AssetList);