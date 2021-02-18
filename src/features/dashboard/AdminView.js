import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import InputAdornment from "@material-ui/core/InputAdornment";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import MuiSnackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Formsy from "formsy-react";
import {
  searchCategories,
  selectDashboard,
  addOrder,
  setError,
} from "./dashboardSlice";
import Loader from "../common/Loader";
import TextField from "../common/Input";
import ErrorBox from "../common/ErrorBox";

export default function AdminView(props) {
  const [isLoading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isPageLoading, setPageLoading] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [itemName, setItemName] = useState("");
  const [open, setOpen] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const { categories, error } = useSelector(selectDashboard);
  const dispatch = useDispatch();
  const formRef = useRef(null);

  const saveOrder = async () => {
    try {
      setPageLoading(true);
      await dispatch(addOrder({ itemName, categoryId }));
      setPageLoading(false);
      setOpenSnackbar(true);
    } catch (error) {
      setPageLoading(false);
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
    if (error) {
      setShowError(true);
      disableButton();
    }
  }, [error]);

  return (
    <Container>
      <h1>Dashboard</h1>
      <Formsy
        onValidSubmit={saveOrder}
        onValid={enableButton}
        onInvalid={disableButton}
        ref={formRef}
      >
        <Grid container justify="center" spacing={2}>
          <Grid item>
            <TextField
              variant="outlined"
              margin="normal"
              required
              label="Item name"
              name="itemName"
              onChange={(e) => setItemName(e.target.value.trim())}
            />
          </Grid>
          <Grid item>
            <Autocomplete
              options={categories}
              style={{ width: 300 }}
              open={open}
              onOpen={() => {
                setOpen(true);
              }}
              onClose={() => {
                setOpen(false);
              }}
              getOptionLabel={(option) => option.name}
              getOptionSelected={(option, value) => option.name === value.name}
              loading={isLoading}
              onInputChange={async (e, val) => {
                setLoading(true);
                await dispatch(searchCategories(val));
                setLoading(false);
              }}
              onChange={(e, value) => {
                if (e.type === "click" || e.type === "keydown") {
                  setCategoryId(value.id);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="category"
                  variant="outlined"
                  margin="normal"
                  label="Search Categories"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <InputAdornment position="end">
                        {isLoading && (
                          <Loader type="Oval" height={40} width={40} />
                        )}
                        {!isLoading && (
                          <Icon className="text-20" color="action">
                            search
                          </Icon>
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            {showError && <ErrorBox>{error}</ErrorBox>}
            {isPageLoading && <Loader type="ThreeDots" />}
            <Button
              type="submit"
              disabled={!isFormValid}
              variant="contained"
              onClick={saveOrder}
              color="secondary"
            >
              Add Order
            </Button>
          </Grid>
        </Grid>
      </Formsy>
      <MuiSnackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <MuiAlert onClose={() => setOpenSnackbar(false)} severity="success">
          Order added successfully
        </MuiAlert>
      </MuiSnackbar>
    </Container>
  );
}
