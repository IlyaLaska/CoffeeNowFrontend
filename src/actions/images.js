"use strict";

import { HTTP } from "./index";

export function uploadImage(image) {
  return HTTP.post("/image", image)
    .then((x) => x)
    .catch((err) => err);
}
