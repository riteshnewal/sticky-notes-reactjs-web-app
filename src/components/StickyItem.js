import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import { Star, DeleteForever, Edit, ColorLens } from "@material-ui/icons";
import { TwitterPicker } from "react-color";
import Editor from "react-medium-editor";
import "medium-editor/dist/css/medium-editor.css";
import "medium-editor/dist/css/themes/default.css";
import ConfirmDialog from "./ConfirmDialog";

class StickyItem extends Component {
  state = {
    editorDisabled: true,
    data: {},
    showColorPalate: false,
    showDeleteConfirmation: false,
  };
  componentDidMount() {
    this.setState({ data: this.props.data });
  }

  updateDescription = (value) => {
    debugger;
    const { editorDisabled, data } = this.state;
    if (!editorDisabled) {
      data.description = value;
    }
    this.props.updateSticky(data, this.props.index);
  };
  updateStatus = (status) => {
    const { data } = this.state;
    switch (status) {
      case "STAR":
        data.star = !data.star;
        break;
      case "DELETE":
        data.deleted = true;
        this.setState({ showDeleteConfirmation: false });
        break;
      default:
        break;
    }
    this.props.updateSticky(data, this.props.index);
  };

  updateEditable = (e) => {
    this.setState({ editorDisabled: !this.state.editorDisabled });
  };

  openColorPicker = () => {
    this.setState({ showColorPalate: !this.state.showColorPalate });
  };
  handleColorChange = (color) => {
    const { data } = this.state;
    data.color = color.hex;
    this.props.updateSticky(data, this.props.index);
    this.openColorPicker();
  };

  deleteOnClick = () => this.props.remove(this.props.note.id);
  render() {
    const { editorDisabled, data, showColorPalate, showDeleteConfirmation } =
      this.state;
    return (
      <div className="note" style={{ backgroundColor: data.color }}>
        <Grid container>
          <Grid item xs={12}>
            {editorDisabled ? (
              <div
                className="note_description"
                dangerouslySetInnerHTML={{ __html: data.description }}
              />
            ) : (
              <Editor
                text={data.description}
                onChange={this.updateDescription}
                className="note_description"
                options={{
                  //disableEditing: { editorDisabled },
                  updateOnEmptySelection: true,
                  toolbar: {
                    buttons: ["bold", "italic", "underline"],
                    align: "center",
                    static: true,
                  },
                  placeholder: {
                    text: "Enter Notes Here...",
                    hideOnClick: true,
                  },
                }}
              />
            )}
          </Grid>
          <Grid container>
            <Grid item xs={2} align="right">
              <div className="dateText">{data.date}</div>
            </Grid>
            <Grid item xs={10} align="right">
              <div className="note_icons">
                <ColorLens
                  className="note_icon"
                  fontSize="large"
                  style={{
                    color: this.state.showColorPalate ? "#f6d55c" : "#ffffff",
                  }}
                  onClick={this.openColorPicker}
                />
                <Star
                  className="note_icon"
                  fontSize="large"
                  style={{
                    color: data.star ? "#ed553b" : "#ffffff",
                  }}
                  onClick={() => this.updateStatus("STAR")}
                />
                <DeleteForever
                  className="note_icon"
                  fontSize="large"
                  style={{
                    color: data.deleted ? "#3caea3" : "#ffffff",
                  }}
                  onClick={() => {
                    this.setState({ showDeleteConfirmation: true });
                  }}
                />
                <Edit
                  className="note_icon"
                  fontSize="large"
                  style={{
                    color: editorDisabled ? "#ffffff" : "#f47820",
                  }}
                  onClick={this.updateEditable}
                />

                {showColorPalate && (
                  <TwitterPicker onChange={this.handleColorChange} />
                )}
              </div>
            </Grid>
          </Grid>
        </Grid>

        <ConfirmDialog
          closeDeleteDialog={() => {
            this.setState({ showDeleteConfirmation: false });
          }}
          showDeleteDialog={showDeleteConfirmation}
          handleConfirm={() => this.updateStatus("DELETE")}
        />
      </div>
    );
  }
}

export default StickyItem;
