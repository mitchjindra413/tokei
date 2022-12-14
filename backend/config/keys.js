module.exports = {
    mongoURI: process.env.MONGO_URI,
    isProduction: process.env.NODE_ENV === 'production',
    secretOrKey: process.env.SECRET_OR_KEY,
    awsAccessKey: process.env.AWS_ACCESS_KEY_ID,
    awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
    awsRegion: process.env.AWS_REGION,
    awsBucket: process.env.AWS_BUCKET_NAME
}