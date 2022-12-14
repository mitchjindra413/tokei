const { S3 } = require("aws-sdk")
const { awsAccessKey, awsBucket, awsSecretKey, awsRegion } = require('./keys')

exports.s3Upload = async (files) => {
    const s3 = new S3();

    const params = files.map((file) => {
        return {
            Bucket: awsBucket,
            Key: `uploads/${file.originalname}`,
            Body: file.buffer,
        };
    });

    return await Promise.all(params.map((param) => s3.upload(param).promise()));
};
