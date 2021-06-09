import {
  UPDATE_STICKY_DATA,
  ADD_STICKY_DATA,
} from "../actions/StickyDataActions";

const colors = ["#f6d55c", "#ed553b", "#3caea3", "#20639b", "#173f5f"];
const blankSticky = {
  description: "",
  star: false,
  color: "#f6d55c",
  deleted: false,
};

const INITIAL_STATE = { stickyArray: [] };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case ADD_STICKY_DATA:
    //   let stickyObj = { ...blankSticky };
    //   stickyObj.id = action.payload;
    //   let stickyArray = state.stickyArray.concat(stickyObj);
    //   return {
    //     stickyArray,
    //   };
    case ADD_STICKY_DATA:
      let stickyObj = { ...blankSticky };
      var today = new Date();
      stickyObj.id = action.payload;
      stickyObj.date = `${today.getFullYear()}/${
        today.getMonth() + 1
      }/${today.getDate()}`;
      stickyObj.color = colors[Math.floor(Math.random() * colors.length)];
      let stickyArray = state.stickyArray.concat(stickyObj);
      return {
        stickyArray,
      };
    case UPDATE_STICKY_DATA:
      return {
        ...state,
        stickyArray: [
          ...state.stickyArray.slice(0, action.payload.index),
          action.payload.data,
          ...state.stickyArray.slice(action.payload.index + 1),
        ],
      };
    default:
      return state;
  }
};
