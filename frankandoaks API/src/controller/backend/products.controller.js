const productmodel = require("../../models/product");


exports.create = async (request, response) => {

    data = new productmodel({
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
        var total = await productmodel.aggregate([{
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

        const productdata = await
            productmodel.find().populate({
                path: 'category_id',
                select: { '_id': 1, 'name': 1, 'image': 1 }
            })

        if (productdata.length != 0) {
            var resp = {
                status: true,
                message: 'record found successfully',
                data: productdata,
                imagePath: 'http://localhost:3/uploads/products/',
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

    const productdata = await productmodel.updateOne({
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

        const productdata = await productmodel.deleteOne({
            _id: request.body.id
        }, {
            $set: {
                deleted_at: Date.now()
            }
        })

        if (productdata.length != 0) {
            var resp = {
                status: true,
                message: 'record deleted successfully',
                data: productdata
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
        const productdata = await productmodel.updateOne({
            _id: request.body.id
        }, {
            $set: {
                status: request.body.status
            }
        })

        if (productdata.length != 0) {
            var resp = {
                status: true,
                message: 'record changed successfully',
                data: productdata
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

        const productdata = await productmodel.deleteMany({
            _id: { $in: request.body.ids },
        }, {
            $set: {
                deleted_at: Date.now()
            }
        })

        if (productdata.length != 0) {
            var resp = {
                status: true,
                message: 'record deleted successfully',
                data: productdata
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

        const productdata = await productmodel.findById(request.params.id);

        if (productdata.length != 0) {
            var resp = {
                status: true,
                message: 'record found successfully',
                data: productdata
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