const categorymodel = require("../../models/categories");


exports.create = async (request, response) => {

    data = new categorymodel({
        name: request.body.name,
        status: request.body.status,
        order: request.body.order,
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
        console.log("View categories route hit, request body:", request.body);
        const addcondition = [{
            deleted_at: null
        }
        ];

        const orcondition = [];

        if (request.body.order != undefined) {
            if (request.body.order != '') {
                orcondition.push({ order: request.body.order })
            }
        }

        if (request.body.name != undefined) {
            if (request.body.name != '') {
                orcondition.push({ name: request.body.name })
            }
        }

        if (addcondition.length > 0) {
            var filter = { $and: addcondition }
        } else {
            var filter = {}
        }

        if (orcondition.length > 0) {
            filter.$or = orcondition;
        }
        console.log(filter);

        var total = await categorymodel.aggregate([
            {
                $group: {
                    _id: null,
                    count: {
                        '$sum': 1
                    }
                }
            }
        ])

        const categorydata = await categorymodel.find
            (
                {
                    name: { $exists: true },
                    order: { $type: 16 },
                    deleted_at: null,
                }
            );

        if (categorydata.length != 0) {
            var resp = {
                status: true,
                message: 'record found successfully',
                imagePath: 'http://localhost:3/uploads/categories/',
                data: categorydata,
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

    const categorydata = await categorymodel.updateOne({
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

        const categorydata = await categorymodel.updateOne({
            _id: request.body.id
        }, {
            $set: {
                deleted_at: Date.now()
            }
        })

        if (categorydata.length != 0) {
            var resp = {
                status: true,
                message: 'record found successfully',
                data: categorydata
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
        const categorydata = await categorymodel.updateOne({
            _id: request.body.id
        }, {
            $set: {
                status: request.body.status
            }
        })

        if (categorydata.length != 0) {
            var resp = {
                status: true,
                message: 'record changed successfully',
                data: categorydata
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

        const categorydata = await categorymodel.updateMany({
            _id: { $in: request.body.ids },
        }, {
            $set: {
                deleted_at: Date.now()
            }
        })

        if (categorydata.length != 0) {
            var resp = {
                status: true,
                message: 'record deleted successfully',
                data: categorydata
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

        const categorydata = await categorymodel.findById(request.params.id);

        if (categorydata.length != 0) {
            var resp = {
                status: true,
                message: 'record found successfully',
                data: categorydata
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