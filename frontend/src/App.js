// import './App.css';
import React from 'react';
import SearchBar from "material-ui-search-bar";
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  cardstyle:{
        // marginTop: theme.spacing(20),
        margin:'auto',
        flexDirection: 'column',
    },
}));

export default function App() {

  const [responseData, setResponseData] = React.useState({})
  const [searchQuery, setSearchQuery] = React.useState('')
  // const [searchHistory, setSearchHistory] = React.useState({})

  const ShowResult = (data) => {
    console.log(data.data.data.data)
    const classes = useStyles();
    const response_data = data.data.data.data

    return (
      <>
      <Grid
            xs={12} md={4} lg={12}
            container
            direction="column"
            justify="center"
            alighItems="center"
            >
            <Typography variant="h4" align="center">Search Result</Typography>
            <Card className={classes.cardstyle}>
              <CardContent>
                <Typography variant="body1" align="center">Domain Name: {response_data.domain_name} <br/>
                Organization: {response_data.org} <br/>
                Country: {response_data.country} <br/>
                Status: {response_data.status?'Up':'Down'} <br/>
                </Typography>
              </CardContent>
            </Card>
      </Grid>
      </>
    )
  }

  const showSearches = async () => {
    var res = []
      res = await axios({
          method: "get",
          url: `http://127.0.0.1:8000/api/history/`,
          headers: {
            'Authorization': 'Token e3155517c6d39a5e3825196c20f328b1dcaf2c04',
          },
        })
        .then((response) => response)
        .catch(function (response) {
            console.log('Error: ', response);
        });
        console.log(res)
    };

  const onSearchClick = (val) => {
    setSearchQuery(val)

    axios({
      method: "get",
      url: `http://127.0.0.1:8000/api/search/?name=${searchQuery}`,
      headers: {
        'Authorization': 'Token e3155517c6d39a5e3825196c20f328b1dcaf2c04',
        "Content-Type": 'application/json'
      },
  })
      .then((response) => setResponseData(response))
      .catch(function (response) {
          console.log('Error: ', response);
      });
  };

  const handleChange = (val) => {
    setSearchQuery(val)
  };


  return (
    <div className="App">
      {Object.keys(responseData).length ? (
        <ShowResult data={responseData}/>
        ):(
        <Container>

        <Grid
            container
            wrap='nowrap'
            justify="space-between"
            direction="row"
            alignItems="center"
          >
            <Grid item xs={6}>
              <Typography variant="h6">Search Domain</Typography>
            </Grid>
            <Grid item xs={3}>
            <Button p={5} onClick={showSearches} variant="contained" color="primary">
            Show Search History
              </Button>
            </Grid>
          </Grid>
          <SearchBar
            value={searchQuery}
            onChange={(value) => handleChange(value) }
            onRequestSearch={onSearchClick}
            style={{
              margin: "0 auto",
              maxWidth: 800
            }}
          />
        </Container>
        )
      }
    </div>
  );


}
