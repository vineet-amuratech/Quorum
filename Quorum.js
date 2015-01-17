Questions = new Mongo.Collection("questions");
Answers = new Mongo.Collection("answers");
// Answers = new Mongo.Collection("answers");

if (Meteor.isClient) {
  // counter starts at 0
      
    // q = Mongo.Collection.get("questions");
    // questions = q.find().fetch();
    // console.log(questions);


  // Session.setDefault("counter", 0);

  Template.questions.helpers({
    questions: function () {
      return Questions.find().fetch();
    }
  });

  Template.answer.helpers({
    first_answer: function (question_id) {
    	console.log("question_id : ", question_id);
      return Answers.findOne({question_id: question_id});
    }
  });

  Template.questions.events({
    'click .answer_question': function (e) {
      var answer = $(e.target).closest(".question-container").find("[name='answer']").val()
      console.log(this);
      Answers.insert({question_id: this._id,user_id: Meteor.userId(),content: answer});
      // increment the counter when button is clicked
      // Session.set("counter", Session.get("counter") + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup

    // People.allow({
    //   'insert': function (userId,doc) {
    //      user and doc checks ,
    //     return true to allow insert 
    //     return true; 
    //   }
    // });

  Meteor.users.allow({
      insert: function (userId, user) {
        // can only create users where you are the author
        // return user.createdBy === userId;
        return true;
      },
      update: function (userId, user) {
        // can only create users where you are the author
        // return user.createdBy === userId;
        return true;
      },
      remove: function (userId, user) {
        // can only delete your own users
        return user.createdBy === userId;
      }
      // since there is no update field, all updates
      // are automatically denied
    });
  });
}
