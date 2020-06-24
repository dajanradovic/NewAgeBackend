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
            clientID: '198807829924-hqju5f7emsufpj2m7d3k4rmndcgditkg.apps.googleusercontent.com',
            clientSecret: 'bkVB_7eqtbJiD-WEK5wdXWk1'


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