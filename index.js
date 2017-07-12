const AWS = require('aws-sdk')
const S3 = new AWS.S3()
const express = require('express')
const app = express()
const path = require("path")

app.use(express.static('public'))

function s3_list_objects() {
  var params = {
    Bucket: "examplebucket",
    MaxKeys: 200
  }
  let objects = []
  S3.listObjectsV2(params, function(err, data) {
    if (err) {
      console.log(err, err.stack)
    } else {
      for (let i=0; i<data.Contents.length; i++) {
        let s3_object = data.Contents[i]
        let img_obj = {
          img_url: `https://${params.Bucket}/${s3_object.Key}`,
          img_text: s3_object.LastModified
        }
        objects.push(img_obj)
      }
    }
    return objects
  })
}

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname+'/index.html'))
})

app.get('/thumbnails', function(req, res) {
  res.send({images: s3_list_objects()})
  /*
  let dummy = {images: [
    {    img_url: 'https://cdn-a.verkkokauppa.com/files/59562/04cec/50327/e161f/9da3.jpg',
        img_text: 'Robert'
    },
    {    img_url: 'https://cdn-a.verkkokauppa.com/files/59562/04cec/50327/e161f/9da3.jpg',
        img_text: 'Robert'
    },
    {    img_url: 'https://cdn-a.verkkokauppa.com/files/59562/04cec/50327/e161f/9da3.jpg',
        img_text: 'Robert'
    },
    {    img_url: 'https://cdn-a.verkkokauppa.com/files/59562/04cec/50327/e161f/9da3.jpg',
        img_text: 'Robert'
    },
    {    img_url: 'https://cdn-a.verkkokauppa.com/files/59562/04cec/50327/e161f/9da3.jpg',
        img_text: 'Robert'
    },
    {    img_url: 'https://cdn-a.verkkokauppa.com/files/59562/04cec/50327/e161f/9da3.jpg',
        img_text: 'Robert'
    },
    {    img_url: 'https://cdn-a.verkkokauppa.com/files/59562/04cec/50327/e161f/9da3.jpg',
        img_text: 'Robert'
    },
    {    img_url: 'https://cdn-a.verkkokauppa.com/files/59562/04cec/50327/e161f/9da3.jpg',
        img_text: 'Robert'
    },
    {    img_url: 'https://cdn-a.verkkokauppa.com/files/59562/04cec/50327/e161f/9da3.jpg',
        img_text: 'Robert'
    },
    {    img_url: 'https://cdn-a.verkkokauppa.com/files/59562/04cec/50327/e161f/9da3.jpg',
        img_text: 'Robert'
    },
    {    img_url: 'https://cdn-a.verkkokauppa.com/files/59562/04cec/50327/e161f/9da3.jpg',
        img_text: 'Robert'
    },
    {    img_url: 'https://cdn-a.verkkokauppa.com/files/59562/04cec/50327/e161f/9da3.jpg',
        img_text: 'Robert'
    },
    {    img_url: 'https://cdn-a.verkkokauppa.com/files/59562/04cec/50327/e161f/9da3.jpg',
        img_text: 'Robert'
    },
    {    img_url: 'https://cdn-a.verkkokauppa.com/files/59562/04cec/50327/e161f/9da3.jpg',
        img_text: 'Robert'
    },
    {    img_url: 'https://cdn-a.verkkokauppa.com/files/59562/04cec/50327/e161f/9da3.jpg',
        img_text: 'Robert'
    }
  ]}
  res.send(dummy)
  */
})

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
})