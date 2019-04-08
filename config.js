'use strict'

module.exports = {
    mailer : {
        service : 'Gmail',
        auth : {
            user : process.env.EMAIL,
            pass : process.env.PASSWORD
        }
    },
    dbConnString : 'mongodb://admin:password123@ds123196.mlab.com:23196/codecollab',
    //dbConnString : 'mongodb://192.168.43.240:27017/codecollab',
    sessionKey : 'ThisIsLiveCodeCollaborator'
}