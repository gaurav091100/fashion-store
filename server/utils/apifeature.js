// // class ApiFeatures {
// //   constructor(query, queryStr) {
// //     this.query = query;
// //     this.queryStr = queryStr;
// //   }
// //   search() {
// //     const keyword = this.queryStr.keyword
// //       ? {
// //           title: {
// //             $regex: this.queryStr.keyword,
// //             $options: "i",
// //           },
// //         }
// //       : {};
// //     console.log(keyword);
// //     this.query = this.query.find({ ...keyword });
// //     return this;
// //   }
// //   filter() {
// //     const queryCopy = { ...this.queryStr };
// //     // REMOVING SOME FIELDS FOR CATEGORY
// //     const removeFields = ["keyword", "page", "limit"];
// //     removeFields.forEach((key) => delete queryCopy[key]);

// //     // FILTER FOR PRICE AND RATING
   

// //     let queryStr = JSON.stringify(queryCopy);
// //     queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

// //     this.query = this.query.find(JSON.parse(queryStr));
// //     return this;
// //   }
// //   pagination(resultPerPage) {
// //     const currentPage = Number(this.queryStr.page) || 1;
// //     const skip = resultPerPage * (currentPage - 1);
// //     this.query = this.query.limit(resultPerPage).skip(skip);
// //     return this;
// //   }
// // }

// // module.exports = ApiFeatures;



// class ApiFeatures {
//   constructor(query, queryString) {
//     this.query = query;
//     this.queryString = queryString;
//   }

//   search() {
//     const searchQuery = this.queryString.query
//       ? {
//           name: {
//             $regex: this.queryString.query,
//             $options: 'i', // case insensitive
//           },
//         }
//       : {};
//     this.query = this.query.find({ ...searchQuery });
//     return this;
//   }

//   filter() {
//     const queryCopy = { ...this.queryString };
//     // Remove fields for filtering
//     delete queryCopy.query;
//     delete queryCopy.page;
    
//     // Apply filters (e.g., category, rating)
//     this.query = this.query.find(queryCopy);
//     return this;
//   }

//   pagination(resultPerPage) {
//     const currentPage = this.queryString.page || 1;
//     const skip = resultPerPage * (currentPage - 1);
//     this.query = this.query.limit(resultPerPage).skip(skip);
//     return this;
//   }
// }

// module.exports = ApiFeatures;




// class ApiFeatures {
//   constructor(query, queryString) {
//     this.query = query;
//     this.queryString = queryString;
//   }

//   search() {
//     const searchQuery = this.queryString.query
//       ? {
//           name: {
//             $regex: this.queryString.query,
//             $options: 'i', // case insensitive
//           },
//         }
//       : {};
//     this.query = this.query.find({ ...searchQuery });
//     return this;
//   }

//   filter() {
//     const queryCopy = { ...this.queryString };
//     // Remove fields for filtering
//     delete queryCopy.query;
//     delete queryCopy.page;

//     // Prepare the filter object
//     const filters = {};

//     // Handle rating filter
//     if (queryCopy.rating) {
//       filters.rating = { $gte: Number(queryCopy.rating.gte) }; // Ensure rating is a number
//     }

//     console.log("mrpp",queryCopy)
//     // Handle price filter
//     if (queryCopy.mrp) {
//       filters.mrp = {
//         $gte: Number(queryCopy.mrp.gte),
//         $lte: Number(queryCopy.mrp.lte),
//       };
//     }

//     // Append category filter if present
//     if (queryCopy.category) {
//       filters.category = queryCopy.category;
//     }

//     this.query = this.query.find(filters);
//     return this;
//   }

//   pagination(resultPerPage) {
//     const currentPage = this.queryString.page || 1;
//     const skip = resultPerPage * (currentPage - 1);
//     this.query = this.query.limit(resultPerPage).skip(skip);
//     return this;
//   }
// }

// module.exports = ApiFeatures;





class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search() {
    const searchQuery = this.queryString.query
      ? {
          title: {
            $regex: this.queryString.query,
            $options: 'i', // case insensitive
          },
        }
      : {};
    this.query = this.query.find({ ...searchQuery });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryString };
    // Remove fields for filtering
    delete queryCopy.query;
    delete queryCopy.page;

    // Prepare the filter object
    const filters = {};

    // Handle rating filter
    if (queryCopy.rating) {
      filters.rating = { $gte: Number(queryCopy.rating.gte) }; // Ensure rating is a number
    }

    // Handle price filter
    if (queryCopy.mrp) {
      filters.mrp = {
        $gte: Number(queryCopy.mrp.gte),
        $lte: Number(queryCopy.mrp.lte),
      };
    }

    // Append category filter if present
    if (queryCopy.category) {
      filters.category = queryCopy.category;
    }

    this.query = this.query.find(filters);
    return this;
  }

  pagination(resultPerPage) {
    const currentPage = this.queryString.page || 1;
    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }

  // Method to get the total count of filtered products
  async getCount() {
    return await this.query.countDocuments();
  }
}

module.exports = ApiFeatures;
