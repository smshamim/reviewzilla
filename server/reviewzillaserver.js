Reviews = new Meteor.Collection("reviews");

Meteor.startup(function () {
    // code to run on server at startup
});

Meteor.methods({
    addReview : function(reviewText) {
        console.log('Adding review');
        var reviewId = Reviews.insert({
            'reviewText' : reviewText,
            'submittedOn': new Date(),
            'submittedBy': Meteor.userId()
        });
        return reviewId;
    }
    });

Meteor.publish("all-reviews", function() {
    return Reviews.find();
})