import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchStickyData,
  updateStickyData,
  addStickyData,
} from "../actions/StickyDataActions";
import StickyItem from "./StickyItem.js";
import StackGrid from "react-stack-grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

class StickyList extends Component {
  state = {
    showDelete: false,
    showStar: "ALL", // Move ALL to constants
  };
  componentDidMount() {
    // this.props.fetchStickyData();
  }

  updateSticky = (data, index) => {
    this.props.updateStickyData(data, index);
  };

  handleDelete = () => {
    this.setState({ showDelete: !this.state.showDelete });
  };

  handleStar = () => {
    if (this.state.showStar === "ALL") {
      this.setState({ showStar: "STAR" });
    } else {
      this.setState({ showStar: "ALL" });
    }
  };

  stickyShowConditions = (sticky) => {
    const { showStar, showDelete } = this.state;
    const { searchText } = this.props;
    var descriptionMatch = true;
    let starCondition;
    let deletedCondition;
    if (showStar === "STAR") {
      starCondition = sticky.star === true;
    } else {
      starCondition = true;
    }
    if (showDelete === true) {
      deletedCondition = sticky.deleted === true;
    } else {
      deletedCondition = sticky.deleted === false;
    }
    if (searchText !== "") {
      var description = sticky.description.toLowerCase();
      descriptionMatch = description.includes(searchText);
    }
    return starCondition && deletedCondition && descriptionMatch;
  };

  addSticky = () => {
    const { stickyData } = this.props;
    this.props.addStickyData(stickyData.length);
  };

  // get Notes Data
  render() {
    const { stickyData } = this.props;
    const { showDelete, showStar } = this.state;
    return (
      <div>
        {stickyData.length !== 0 && (
          <>
            <div className="contenthead" style={{ textAlign: "end" }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={showStar === "STAR"}
                    onChange={this.handleStar}
                    name="checkedB"
                    className="other-button"
                  />
                }
                label={showStar === "STAR" ? "Show All" : "Show Stared"}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={showDelete}
                    onChange={this.handleDelete}
                    name="checkedB"
                    color="primary"
                    className="other-button"
                  />
                }
                label={showDelete ? "Hide Deleted" : "Show Deleted"}
              />
            </div>
            <StackGrid columnWidth={300}>
              {stickyData.map(
                (sticky, index) =>
                  this.stickyShowConditions(sticky) && (
                    <StickyItem
                      key={index}
                      data={sticky}
                      index={index}
                      updateSticky={this.updateSticky}
                    />
                  )
              )}
            </StackGrid>
          </>
        )}
        {stickyData.length === 0 && (
          <div className="no-sticky">
            No Sticky Let's Add One
            <br />
            <button className="add-new-button" onClick={this.addSticky}>
              +
            </button>
          </div>
        )}
      </div>
    );
    // var renderNote = note => (
    //   <Note
    //     note={note}
    //     key={note.id}
    //     onType={props.onType}
    //     remove={props.remove}
    //   />
    // );

    // var searchMatches = props.notes.filter(keepSearchMatches);
    // var noteElements = searchMatches.map(renderNote);
    // return <ul className="notes-list">{noteElements}</ul>;
  }
}

const mapStateToProps = (reducerObj) => {
  const stickyData = reducerObj.stickyData.stickyArray;
  return { stickyData };
};

export default connect(mapStateToProps, {
  fetchStickyData,
  updateStickyData,
  addStickyData,
})(StickyList);
