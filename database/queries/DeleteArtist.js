const Artist = require("../models/artist");

/**
 * Deletes a single artist from the Artists collection
 * @param {string} _id - The ID of the artist to delete.
 * @return {promise} A promise that resolves when the record is deleted
 */
module.exports = (_id) => {
  return Artist.deleteOne({ _id });

  // return Artist.findByIdAndRemove(_id); // Better to use a one step approach
  // return Artist.remove({ _id: _id }); // deprecated; use deleteOne() or deleteMany();
};

/*
  // Avoid possible two step operation
  return Artist.findById(_id)
    .then((artist) => artist.remove())
*/
