import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import crypto from 'crypto'
import { Mongo } from '../config/database.js'
import { findUserByEmail} from './authService.js'

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
        const user = await findUserByEmail(email)
        if (!user) {
            return done(null, false, { message: 'Incorrect email' });
        }

        const saltBuffer = user.salt.buffer
        crypto.pbkdf2(password, saltBuffer, 310000, 32, 'sha256', (err, hashedPassword) => {
            if (err) {
                return done(err)
            }

            const userPasswordBuffer = Buffer.from(user.password.buffer)
            if (!crypto.timingSafeEqual(userPasswordBuffer, hashedPassword)) {
                return done(null, false, { message: 'Incorrect password.' })
            }

            const { password, salt, ...userWithoutPassword } = user
            return done(null, userWithoutPassword)
        })
    } catch (error) {
        return done(error)
    }
}))

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await Mongo.getDb().collection('users').findOne({ _id: id }, { projection: { password: 0, salt: 0 } })
        done(null, user)
    } catch (error) {
        done(error)
    }
})

export default passport