/** Action Types */
export const UPDATE_STICKY_DATA = "update-sticky-data";
export const ADD_STICKY_DATA = "add-sticky-data";
export const GET_STICKY_DATA = "get-sticky-data";

export const fetchStickyData = (callback, callbackError) => {
  return (dispatch) => {
    //for now getting static data, in near future will get data from node backend
    dispatch(getDataFromReducer());
    callback && callback();
    //});
  };
};

export const addStickyData = (id) => {
  //Add one Sticky in stickyJSON

  return (dispatch) => {
    dispatch(addReducer(id));
  };
};
export const updateStickyData = (data, index, callback) => {
  //update data in stickyJSON
  //stickyArray[index].push(data);
  return (dispatch) => {
    dispatch(updateReducer({ data: data, index: index }));
    callback && callback();
  };
};

export const addReducer = (data) => {
  return {
    type: ADD_STICKY_DATA,
    payload: data,
  };
};

export const updateReducer = (data) => {
  return {
    type: UPDATE_STICKY_DATA,
    payload: data,
  };
};

export const getDataFromReducer = () => {
  return {
    type: GET_STICKY_DATA,
  };
};
