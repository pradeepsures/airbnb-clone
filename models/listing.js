const mongoose = require("mongoose");
const Schema  = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
       type: String,
       required: true,
    },
    description: String,
    image:{
         type: String,
         default: 
         "https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8fDA%3D",
         set: (v) => v === "" ? 
         "https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8fDA%3D"
          : v,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

listingSchema.post("findOneAndDelete", async (listing) => {
   if(listing) {
    await Review.deleteMany({_id: { $in: listing.review } });
   }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;