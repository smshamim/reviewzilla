Reviews = new Mongo.Collection("reviews");

Meteor.autorun(function (){
    Meteor.subscribe("all-reviews");
});


Template.reviewSummary.rendered = function() {
    drawStar(document.getElementById("starMean"), 5, 3);
};

Template.reviewSummary.helpers({
    numberOfStarts: function() {
        return ["1", "2", "3", "4", "5"];
    },
    reviewTotal: function() {
        return 20;
    }
});

Template.reviews.helpers({
    reviews: function() {
        return Reviews.find();
    }
});

Template.newReview.rendered = function() {
    drawStar(document.getElementById("starNew"), 5, 0);
};

Template.newReview.events({
    'click input.reviewClass' : function(event) {
        event.preventDefault();
        var reviewText = document.getElementById("reviewText").value;
        Meteor.call("addReview", reviewText, function(error , reviewId){
            console.log('added review with Id .. ' + reviewId);
        });
        document.getElementById("reviewText").value = "";
    }
})

function drawStar(canvas, stars, filledStar) {
    var canvas, ctx, length = 8; // length of the star's arm

    ctx = canvas.getContext("2d");
    var top = 12; left = 0;
    var shouldFill = true;
    for (var i = 0; i < stars; i++) {
        if (i >= filledStar) shouldFill = false;
        left += 20;
        star(ctx, left, top, 8, 5, 0.5, shouldFill)
    }
}

function star(ctx, x, y, r, p, m, isFilled){
    ctx.save();
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.moveTo(0,0-r);
    for (var i = 0; i < p; i++) {
        ctx.rotate(Math.PI / p);
        ctx.lineTo(0, 0 - (r*m));
        ctx.rotate(Math.PI / p);
        ctx.lineTo(0, 0 - r);
    }
    ctx.stroke();
    if (isFilled)
        ctx.fill();
    ctx.restore();
}
