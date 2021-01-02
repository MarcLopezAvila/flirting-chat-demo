App.factory('profilesFactory', ['$sessionStorage', function($sessionStorage) {
    
    //Set array with all the fake profiles
    var profile =
        {
            image:'./src/assets/img/girl.jpg',
            name: 'Sophie',
            yearsOld: 20,
            city: 'Barcelona',
            greet: 'Hi!',
            description: 'My name is Sophie, I consider myself a perseverant person in what I propose until I achieve my goals. I like going out to spend a good time with friends and my family. I always try to see the positive side of things, and I\'m looking for a man who makes me laugh',
            greets: [
                'Hello!!! How are you? :)',
                'I want a real man, are you what I\'m looking for? ^^',
                'Hey! Would you like to meet this weekend? :P',
                'Hey, can we talk?',
                'Hi, Marc, what did you do yesterday? :)',
                'Mmmmm...',
                'Good morning! I\'m in my way to the gym, how are you? :D'
            ],

            responses: [
                'Oh! You are so funny!! ^^',
                'Thats right.. I\'m agree with you, i think we have a lot in common :P',
                'You are crazy!',
                'Ooh, man, I love the way you talk...'
            ]
        };

    //Return object getters and action function
    return {
        getProfileName: function() {
            return profile.name;
        },

        getAllProfile: function() {
            return profile;
        },

        getProfileStatus: function() {
            return true;
        },

        getProfileId: function() {
            return womanProfile;
        },

        isMyFriend: function() {
            return $sessionStorage.friend;
        },

        getProfileRandomMessage: function() {
            return profile.greets[Math.floor((Math.random() * 7))]
        },

        getProfileResponse: function() {
            return profile.responses[Math.floor((Math.random() * 4))]
        }
    }
}]);