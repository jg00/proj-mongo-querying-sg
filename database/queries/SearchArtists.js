const Artist = require("../models/artist");

/**
 * Searches through the Artist collection
 * @param {object} criteria An object with a name, age, and yearsActive
 * @param {string} sortProperty The property to sort the results by
 * @param {integer} offset How many records to skip in the result set
 * @param {integer} limit How many records to return in the result set
 * @return {promise} A promise that resolves with the artists, count, offset, and limit
 * result { all: [artists], count: count, offset: offset, limit: limit}
 */
module.exports = (criteria, sortProperty, offset = 0, limit = 20) => {
  // Sort, offset, limit
  // console.log(criteria);

  /* Fetch one page of data. Note that .skip and .limit is used and will 
     always return at best 20 recrods.  This is why we need a separate count query below.
  */
  const query = Artist.find(buildQuery(criteria))
    .sort({ [sortProperty]: 1 })
    .skip(offset)
    .limit(limit);

  const count = Artist.find(buildQuery(criteria)).count(); // Count matching the criteria

  return Promise.all([query, count]).then((results) => {
    return { all: results[0], count: results[1], offset, limit };
  });
};

const buildQuery = (criteria) => {
  const query = {};

  if (criteria.name) {
    query.$text = { $search: criteria.name };
  }

  if (criteria.age) {
    query.age = {
      $gte: criteria.age.min,
      $lte: criteria.age.max,
    };
  }

  if (criteria.yearsActive) {
    query.yearsActive = {
      $gte: criteria.yearsActive.min,
      $lte: criteria.yearsActive.max,
    };
  }

  return query;
};

/*
  1a Note 
  const sortProperty = 'name'
  const sortOrder = {}
  sortOrder[sortProperty] = 1 // {name: 1}

  1b Results in same solution as above ES6
  { [sortProperty] : 1 } // {name: 1}
*/
