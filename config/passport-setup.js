const passport = require('passport');
const GoogleStrategy = require ('passport-google-oauth20');
const User = require ('../models/users');

passport.serializeUser((user,done) =>{

    done(null,user.id);
})

passport.deserializeUser((id,done) =>{
    User.findById(id).then((user)=>{

        done(null,user.id);

    })
})

passport.use(new GoogleStrategy({
            callbackURL: '/auth/google/redirect',
            clientID: '//',
            clientSecret: '//'


},(accessToken, refreshToken, profile, done )=>{

    User.findOne({googleId:profile.id}).then((currentUser)=>{
            if(currentUser){

                    console.log('user is:', currentUser); 
                    done(null, currentUser);
            }
            else{
                new User({

                    username:profile.displayName,
                    googleId:profile.id
                }).save().then((newUser) =>{
            
                        console.log('new user crated', newUser);
                        done(null, newUser);

                })
            


            }
    })

    

}

))
