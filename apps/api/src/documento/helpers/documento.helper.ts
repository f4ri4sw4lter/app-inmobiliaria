export const renameFile = (req, file, callback) => {

    const fileName = file.originalname;
    callback(null, `${fileName}`);

}

export const fileFilter = (req, file, callback) => {

    if(!file.originalname.match(/\.(pdf|doc|csv|xls|xlsx|txt|png|jpeg|jpg)$/)){

        return callback( new Error('Invalid format type'), false)

    }

    callback(null, true);
} 