const sales = require("../../models/sales");
const salesmodel = require("../../models/sales");



exports.create = async (request, response) => {

    data = new salesmodel({
        name: request.body.name,
        type: request.body.type,
        gender: request.body.gender,
        status: request.body.status,
        order: request.body.order,
        price: request.body.price,
        qty: request.body.qty,
        justIn: request.body.justIn,
        daysAgo: request.body.daysAgo,
        description: request.body.description,
        category_id: request.body.category_id,
        created_at: Date.now(),
        updated_at: Date.now(),
    })


    // if (request.file != undefined) {
    //     if (request.file != '') {
    //         // data.image = request.file.filename
    //     }
    // }

    if (request.files != undefined) {
        if (request.files != '') {
            data.image = request.files.map(file => file.filename);
        }
    }

    console.log("Uploaded Files:", request.file)

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

        const search = request.body.search || '';

        const filter = {};
        if (request.body.gender) {
            filter.gender = request.body.gender;
        }
        if (request.body.type) {
            filter.type = request.body.type;
        }

        // give justIn and daysAgo key in body
        const daysAgo = request.body.daysAgo || 1; // Default to 30 days if not provided
        const currentDate = new Date();
        const pastDate = new Date();
        pastDate.setDate(currentDate.getDate() - daysAgo); // Calculate the past date

        if (request.body.justIn) {
            filter.created_at = { $gte: pastDate }; // Filter products added after the calculated past date
        }

        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        var total = await salesmodel.aggregate([{
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

        const salesdata = await
            salesmodel.find(filter).populate({
                path: 'category_id',
                select: { '_id': 1, 'name': 1, 'image': 1, 'price': 1 }
            })

        console.log("Sales Data Created At:", salesdata.map(s => s.created_at)); // Log created_at of records


        if (salesdata.length > 0) {
            var resp = {
                status: true,
                message: 'record found successfully',
                data: salesdata,
                imagePath: 'http://localhost:3/uploads/sales/',
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
        type: request.body.type,
        gender: request.body.gender,
        status: request.body.status,
        order: request.body.order,
        price: request.body.price,
        qty: request.body.qty,
        description: request.body.description,
        category_id: request.body.category_id,
        created_at: Date.now(),
        updated_at: Date.now(),
    }

    // if (request.file != undefined) {
    //     if (request.file != '') {
    //         data.image = request.file.filename
    //     }
    // }
    if (request.files != undefined) {
        if (request.files != '') {
            data.image = request.files.map(file => file.filename);
        }
    }
    const salesdata = await salesmodel.updateOne({
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

        const salesdata = await salesmodel.deleteOne({
            _id: request.body.id
        }, {
            $set: {
                deleted_at: Date.now()
            }
        })

        if (salesdata.length != 0) {
            var resp = {
                status: true,
                message: 'record deleted successfully',
                data: salesdata
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
        const salesdata = await salesmodel.updateOne({
            _id: request.body.id
        }, {
            $set: {
                status: request.body.status
            }
        })

        if (salesdata.length != 0) {
            var resp = {
                status: true,
                message: 'record changed successfully',
                data: salesdata
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

        const salesdata = await salesmodel.deleteMany({
            _id: { $in: request.body.ids },
        }, {
            $set: {
                deleted_at: Date.now()
            }
        })

        if (salesdata.length != 0) {
            var resp = {
                status: true,
                message: 'record deleted successfully',
                data: salesdata
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

        const salesdata = await salesmodel.findById(request.params.id);

        if (salesdata.length != 0) {
            var resp = {
                status: true,
                message: 'record found successfully',
                data: salesdata
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