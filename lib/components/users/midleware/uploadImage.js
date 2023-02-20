import multer, { diskStorage } from 'multer';


export function uploadFile(imageFile) {
    let dateNow = new Date(); 
        let year = dateNow.toLocaleString("default", {year: "numeric"});
        let month = dateNow.toLocaleString("default", {month:"2-digit"});
        let day = dateNow.toLocaleString("default", {day:"2-digit"});
        let formatDate = day + "-" + month + "-" + year;
        
    const storage = diskStorage({
        //destination
        destination: function (req,file,cb) {
            switch (file.fieldname) {
                case "imageFile":
                cb(null, 'uploads');
                break;
            }
            
        },

        //rename file
        filename: function (req,file,cb) {
            cb(null, formatDate + file.originalname.replace(/\s/g, '')) //nama file
        },
    });

    //Filter file extension
    const fileFilter = function (req,file,cb)  {
        if(file.fieldname == imageFile) {
            if(!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
                req.fileValidationError = {
                    message: 'Only image files are allowed!',
                };
                return cb(new Error('Only image files are allowed!', false));
            }
        }
        cb(null, true)
    };

    // Maximum file size
    // MB -> KB -> byte
    const sizeInMB = 10;
    const maxSize = sizeInMB * 1000 * 1000;

    let upload = multer({
        storage,
        fileFilter,
        limits: {
            fileSize: maxSize
        },
    }).fields([
        {
            name: imageFile,
            maxCount: 5
        }
    ]);

    //handler required, if error, if limit size

    return (req,res,next) => { //function yang langsung di return
        upload(req, res, (err) => {
            // if filter error
            if (req.fileValidationError) {
                return res.status(400).send(req.fileValidationError);
            };

            // if file doesn't provided
            if(!req.file && !err) {
                return res.status(400).send({
                    messsage: 'Please select files to upload',
                }); 
            };

            //if exceed the max size
            if(err) {
                if(err.code == 'LIMIT_FILE_SIZE') {
                    return res.status(400).send({
                        messsage: 'Max file size 20Mb',
                    });
                }
                return res.status(400).send(err);
            }

            return next();
        })
    }
} 