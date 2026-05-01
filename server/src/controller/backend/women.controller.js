const womenmodel = require("../../models/women");



exports.create = async (request, response) => {

    data = new womenmodel({
        name: request.body.name,
        status: request.body.status,
        order: request.body.order,
        price: request.body.price,
        description: request.body.description,
        category_id: request.body.category_id,
        created_at: Date.now(),
        updated_at: Date.now(),
    })
    if (request.file != undefined) {
        if (request.file != '') {
            data.image = request.file.filename
        }
    }
    console.log(request.file)

    await data.save()
        .then((success) => {
            const result = {
                status: true,
                message: "record created successfully",
                data: success
            }
            response.send(result);
        })
        .catch((error) => {

            error_messages = [];

            for (let field in error.errors) {
                error_messages.push(error.errors[field].message)
            }

            const result = {
                status: false,
                message: "something went wrong",
                error_message: error_messages
            }
            response.send(result);
        })

}

exports.view = async (request, response) => {

    try {
        var total = await womenmodel.aggregate([{
            $group: {
                _id: null,
                count: {
                    $sum: 1
                },
                sum: {
                    $sum: '$price'
                },
                avg: {
                    $avg: '$price'
                },
                min: {
                    $min: '$price'
                },
                max: {
                    $max: '$price'
                }
            },
        }
        ])

        const womendata = await
            womenmodel.find().populate({
                path: 'category_id',
                select: { '_id': 1, 'name': 1, 'image': 1 }
            })

        if (womendata.length != 0) {
            var resp = {
                status: true,
                message: 'record found successfully',
                data: womendata,
                imagePath: 'http://localhost:3/uploads/women/',
                total: total,
            }
            response.send(resp);
        } else {
            var resp = {
                status: false,
                message: 'no record found'
            }
            response.send(resp);
        }
    }
    catch (error) {
        var resp = {
            status: false,
            message: 'something went wrong',
            error_message: error.message
        }
        response.send(resp);
    }
}

exports.update = async (request, response) => {

    data = {
        name: request.body.name,
        status: request.body.status,
        order: request.body.order,
        created_at: Date.now(),
        updated_at: Date.now(),
    }

    if (request.file != undefined) {
        if (request.file != '') {
            data.image = request.file.filename
        }
    }

    const womendata = await womenmodel.updateOne({
        _id: request.params.id
    }, { $set: data })
        .then((success) => {
            const result = {
                status: true,
                message: "record created successfully",
                data: success
            }
            response.send(result);
        })
        .catch((error) => {
            const result = {
                status: false,
                message: "something went wrong",
                error_message: error.message
            }
            response.send(result);
        })
}

exports.delete = async (request, response) => {
    try {

        const womendata = await womenmodel.deleteOne({
            _id: request.body.id
        }, {
            $set: {
                deleted_at: Date.now()
            }
        })

        if (womendata.length != 0) {
            var resp = {
                status: true,
                message: 'record deleted successfully',
                data: womendata
            }
            response.send(resp);
        } else {
            var resp = {
                status: false,
                message: 'no record found'
            }
            response.send(resp);
        }
    }
    catch (error) {
        var resp = {
            status: false,
            message: 'something went wrong'
        }
        response.send(resp);
    }
}

exports.changestatus = async (request, response) => {
    try {
        const womendata = await womenmodel.updateOne({
            _id: request.body.id
        }, {
            $set: {
                status: request.body.status
            }
        })

        if (womendata.length != 0) {
            var resp = {
                status: true,
                message: 'record changed successfully',
                data: womendata
            }
            response.send(resp);
        } else {
            var resp = {
                status: false,
                message: 'no record found'
            }
            response.send(resp);
        }
    }
    catch (error) {
        var resp = {
            status: false,
            message: 'something went wrong'
        }
        response.send(resp);
    }
}


exports.multidelete = async (request, response) => {
    try {

        const womendata = await womenmodel.deleteMany({
            _id: { $in: request.body.ids },
        }, {
            $set: {
                deleted_at: Date.now()
            }
        })

        if (womendata.length != 0) {
            var resp = {
                status: true,
                message: 'record deleted successfully',
                data: womendata
            }
            response.send(resp);
        } else {
            var resp = {
                status: false,
                message: 'no record found'
            }
            response.send(resp);
        }
    }
    catch (error) {
        var resp = {
            status: false,
            message: 'something went wrong'
        }
        response.send(resp);
    }
}


exports.details = async (request, response) => {

    try {

        const womendata = await womenmodel.findById(request.params.id);

        if (womendata.length != 0) {
            var resp = {
                status: true,
                message: 'record found successfully',
                data: womendata
            }
            response.send(resp);
        } else {
            var resp = {
                status: false,
                message: 'no record found'
            }
            response.send(resp);
        }
    }
    catch (error) {
        var resp = {
            status: false,
            message: 'something went wrong',
            error_message: error.message
        }
        response.send(resp);
    }
}