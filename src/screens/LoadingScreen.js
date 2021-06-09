import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const LoadingScreen = ({ classes }) => {
  return (
    <div className={classes.loadingScreenContainer}>
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
};

const styles = {
  loadingScreenContainer: {
    display: "flex",
    padding: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fafafa",
    fontSize: 16,
    fontFamily: '"Helvetica", "Arial"',
    opacity: 0.8,
  },
};

export default withStyles(styles)(LoadingScreen);

LoadingScreen.propTypes = {
  classes: PropTypes.object.isRequired,
};
