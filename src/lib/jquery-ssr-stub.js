/** Stub jQuery during SSR/static export — real jQuery loads in the browser only. */
const stub = function () {
  return stub;
};
stub.fn = stub.prototype = {};
module.exports = stub;
