// import './App.css';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import SearchBar from "material-ui-search-bar";
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import HistoryList from './ShowHistory';
import TextField from '@material-ui/core/TextField';
import { TextareaAutosize } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  cardstyle:{
      // marginTop: theme.spacing(20),
    margin:'auto',
    flexDirection: 'column',
  },
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function App() {

  const [responseData, setResponseData] = React.useState({})
  const [searchQuery, setSearchQuery] = React.useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [searchHistory, setSearchHistory] = React.useState({})
  const { register, handleSubmit, setValue } = useForm()
  const [authToken, setAuthToken] = React.useState('')


  const ShowResult = (data) => {
    const classes = useStyles();
    const response_data = data.data.data.data

    return (

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

    )
  }

  const showSearches = async () => {
    if (authToken) {

    var res = []
      res = await axios({
          method: "get",
          url: `http://127.0.0.1:8000/api/history/`,
          headers: {
            'Authorization': `Token ${authToken}` ,
          },
        })
        .then((response) => response)
        .catch(function (response) {
            console.log('Error: ', response);
        });
        console.log(res)
        setSearchHistory(res)
    }
    else {
      window.alert(`Login required`)
    }
    };

  const onSearchClick = (val) => {
    console.log(authToken)
    setSearchQuery(val)

    axios({
      method: "get",
      url: `http://127.0.0.1:8000/api/search/?name=${searchQuery}`,
      headers: {
        'Authorization': `Token ${authToken}` ,
        "Content-Type": 'application/json'
      },
  })
      .then((response) => setResponseData(response))
      .catch(function (response) {
          console.log('Error: ', response);
      });
  };

  const onFormSubmit = async(data) => {
    console.log(data)
    let authOutput = await axios({
      method: "post",
      url: `http://127.0.0.1:8000/login/`,
      headers: {
        "Content-Type": 'application/json',
      },
      data: data
  })
      .then((response) => response.data.token)
      .catch(function (response) {
          console.log('Error: ', response);
      });
      console.log(authOutput)
      if (authOutput){
        setAuthenticated(true)
        setAuthToken(authOutput)
      }
  };



  function SignIn() {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Typography align="center" component="h1" variant="h4">
                Sign in
            </Typography>
            <div className={classes.paper}>
                <form className={classes.form} onSubmit={handleSubmit(onFormSubmit)} noValidate>
                    <TextField
                        variant="outlined"form
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="username"
                        name="username"
                        inputRef={register}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        inputRef={register}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                </form>
            </div>
        </Container>
    );
  }

  const MainWindow = () => {
    return (
    <div className="App">
      {Object.keys(searchHistory).length ? (
        <HistoryList rows={searchHistory.data}/>
        ):(
        <Container>

        <Grid
            container
            // wrap='nowrap'
            justifyContent="center"
            direction="column"
            alignItems="center"
            spacing={3}
          >
            <Grid item xs={12} md={8} lg={6}>
              <Button m={2} py={2} onClick={showSearches} variant="contained" color="primary">
              Show Search History
              </Button>
            </Grid>
          </Grid>
          <SearchBar
          py={2}
            autoFocus
            placeholder="Search any domain"
            value={searchQuery}
            onChange={(value)=>setSearchQuery(value)}
            onRequestSearch={onSearchClick}
            style={{
              margin: "0 auto",
              maxWidth: 800
            }}
          />
          {Object.keys(responseData).length ? <ShowResult data={responseData}/>: null}
          {/* </Grid> */}
        </Container>
        )
      }
    </div>
  );
}

  const finalValue = authenticated ? <MainWindow  />: <SignIn />
  return finalValue
}
