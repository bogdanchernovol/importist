var AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3')

if (process.env.NDOE_ENV !== 'production'){
  require('dotenv').config()
}

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,  
  secretAccessKey: process.env.AWS_SECRET_KEY,
  Bucket: 'upload',
});

exports.upload =  multer({
  storage: multerS3({
    s3,
    bucket: 'upload', // pass your bucket name
    key: (req, file, cb)=> {
      cb(null, `${Date.now().toString()}-${file.originalname}`)
    }, // file will be saved as testBucket/contacts.csv
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.originalname});
    },
    acl: 'public-read',
    public: true
  })
});

exports.delete = function(file, cb){
  s3.deleteObject({ Bucket: 'upload', Key: file.key}, cb);
}