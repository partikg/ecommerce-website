const nodemailer = require("nodemailer");
const usermodel = require('../../models/user')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


exports.sendmail = async (request, response) => {



    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "pratikgraut2610@gmail.com",
            pass: "iljzuoqluamyfryr",
        },
    });

    try {
        const info = await transporter.sendMail({
            from: '"pratik 👻" <pratik53@ethereal.email>', // sender address
            to: "pratikgraut2610@gmail.com",
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        });

        var success = {
            status: 'true',
            message: 'successfully send mail',
            data: info
        }
        response.send(success)
    }
    catch {
        var error = {
            status: 'false',
            message: 'error in send mail',
            data: error.message
        }
        response.send(error)
    }

}


exports.register = async (request, response) => {

    var data = new usermodel({
        name: request.body.name,
        // image: request.file.image,
        email: request.body.email,
        mobileno: request.body.mobileno,
        // password: request.body.password
        password: bcrypt.hashSync(request.body.password, 10)
    })

    if (request.file != undefined) {
        if (request.file != '') {
            data.image = request.file.filename
        }
    }
    console.log(request.file);

    await data.save()
        .then((result) => {
            var token = jwt.sign({
                userdata: result
            },
                'secretkey',
                { expiresIn: '1h' }
            );
            var result = {
                status: true,
                message: 'successfully registered',
                data: result,
                token: token
            }
            response.send(result);
        })
        .catch((error) => {
            var error = {
                status: false,
                message: 'error in registered',
            }
            response.send(error);
        })

}


exports.login = async (request, response) => {


    await usermodel.findOne({
        email: request.body.email
    })
        .then((result) => {
            if (result) {
                var compare = bcrypt.compareSync(request.body.password, result.password)
                if (compare) {
                    var token = jwt.sign({
                        userdata: result
                    },
                        'secretkey',
                        { expiresIn: '1h' }
                    );

                    var resp = {
                        status: true,
                        message: 'successfully login',
                        // data: result,
                        token: token
                    }
                }
                else {
                    var resp = {
                        status: false,
                        message: 'incorrect password',
                    }
                }
            }
            else {
                var resp = {
                    status: false,
                    message: 'incorrect email or password'
                }
            }
            response.send(resp)
        })
        .catch((error) => {
            var error = {
                status: false,
                message: 'something went wrong',
                data: error.message
            }
            response.send(error)
        })
}


exports.profile = async (request, response) => {

    console.log(request.headers.authorization);

    if (request.headers.authorization == undefined) {
        return response.send({
            status: false,
            token_error: true,
            message: 'Token required'
        });
    }

    if (request.headers.authorization.split(' ')[1] == '') {

        var result = {
            status: false,
            token_error: true,
            message: 'invalid token required'
        }
        response.send(result);
    }

    jwt.verify(request.headers.authorization.split(' ')[1], 'secretkey', function (error, result) {
        if (error) {
            var result = {
                status: false,
                message: 'incorrect token',
                token_error: true
            }
            response.send(result);
        } else {
            // var userdetails = result;
            // console.log(result)
            var result = {
                status: true,
                message: 'profile found',
                imagePath: 'http://localhost:3/uploads/user/',
                data: result
            }
            response.send(result);
        }
    });

}



exports.viewuser = async (request, response) => {

    var condition = {
        deleted_at: null
    }

    var total = await usermodel.aggregate([
        {
            $group: {
                _id: null,
                count: {
                    '$sum': 1
                }
            }
        }
    ])

    await usermodel.find(condition)
        .then((success) => {
            if (success.length > 0) {
                return response.send({
                    status: true,
                    message: 'successfully count',
                    data: success,
                    total: total
                });
                console.log(result)
                response.send(result)
            }
        })

}


exports.deleteuser = async (request, response) => {

    await usermodel.deleteOne({
        _id: request.body.id
    })
        .then((success) => {
            return response.send({
                status: true,
                message: 'successfully deleted',
                data: success,
            });
            console.log(result)
            response.send(result)

        })
}
