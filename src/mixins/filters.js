"use strict";

import moment from "moment";

const filters = {
  filters: {
    date: (item) => moment(item).format("MMMM DD YYYY, HH:mm:ss"),
    shortDate: (item) => moment(item).format("MMM Do YYYY"),
    slicePublish: (item) => (item ? "Published" : "Unpublished"),
  },
};

export default filters;
