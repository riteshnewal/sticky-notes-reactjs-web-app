import React from "react";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { addStickyData } from "../actions/StickyDataActions";

const Header = (props) => {
  const { title, addStickyData, stickyData } = props;
  const addSticky = () => {
    addStickyData(stickyData.length);
  };
  return (
    <div>
      <Grid container>
        <Grid item xs>
          <Typography variant="h3" className="app-header_title">
            {title}
          </Typography>
        </Grid>
        <Grid item xs>
          <input
            className="search"
            type="text"
            placeholder="Type here to search..."
            value={props.searchText}
            onChange={props.onSearch}
          />
        </Grid>
        <Grid item align="right" xs>
          <button className="add-new-button" onClick={addSticky}>
            +
          </button>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (reducerObj) => {
  const stickyData = reducerObj.stickyData.stickyArray;
  return { stickyData };
};

export default connect(mapStateToProps, {
  addStickyData,
})(Header);
