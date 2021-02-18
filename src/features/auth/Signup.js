import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Formsy from "formsy-react";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import MuiSnackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Loader from "../common/Loader";
import TextField from "../common/Input";
import ErrorBox from "../common/ErrorBox";

import { signup, selectAuth, setError } from "./authSlice";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  input: {
    margin: theme.spacing(1, 0, 1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props) {
  const classes = useStyles();
  const [isLoading, setLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const formRef = useRef(null);

  const submit = async ({ email, password, name }) => {
    try {
      setLoading(true);
      await dispatch(signup({ email, password, name }));
      setLoading(false);
      setOpenSnackbar(true);
    } catch (error) {
      setLoading(false);
      dispatch(setError(error.message));
    }
  };

  function disableButton() {
    setIsFormValid(false);
  }

  function enableButton() {
    setIsFormValid(true);
  }

  useEffect(() => {
    if (auth.error) {
      setShowError(true);
      disableButton();
    }
    if (auth.isAuthenticated) {
      props.history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.error, auth.isAuthenticated]);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create an account
        </Typography>
        <Card elevation={2}>
          <CardContent>
            <Formsy
              onValidSubmit={submit}
              onValid={enableButton}
              onInvalid={disableButton}
              ref={formRef}
              className={classes.form}
            >
              <TextField
                variant="outlined"
                className={classes.input}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                validations={{
                  minLength: 6,
                }}
                validationErrors={{
                  minLength: "Min character length is 6",
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Icon className="text-20" color="action">
                        email
                      </Icon>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                variant="outlined"
                className={classes.input}
                margin="normal"
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                autoComplete="name"
                autoFocus
                validations={{
                  minLength: 3,
                }}
                validationErrors={{
                  minLength: "Min character length is 3",
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Icon className="text-20" color="action">
                        person
                      </Icon>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                variant="outlined"
                className={classes.input}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                validations={{
                  minLength: 8,
                }}
                validationErrors={{
                  minLength: "Min character length is 8",
                }}
                InputProps={{
                  type: showPassword ? "text" : "password",
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <Icon className="text-20" color="action">
                          {showPassword ? "visibility" : "visibility_off"}
                        </Icon>
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {showError && <ErrorBox>{auth.error}</ErrorBox>}
              {isLoading && <Loader type="ThreeDots" />}
              <Button
                type="submit"
                disabled={!isFormValid}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              have an account already? <Link to="/login">Sign In</Link>
            </Formsy>
          </CardContent>
        </Card>
      </div>
      <MuiSnackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <MuiAlert onClose={() => setOpenSnackbar(false)} severity="info">
          Account created, please login
        </MuiAlert>
      </MuiSnackbar>
    </Container>
  );
}
