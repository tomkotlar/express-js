const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`)
    //give us original url 
    next()
};

module.exports = logger