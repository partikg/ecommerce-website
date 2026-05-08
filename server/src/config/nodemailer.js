const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    },
});

const sendOrderConfirmation = ({ userEmail, orderId, items, total }) => {
    transporter.sendMail({
        from: process.env.EMAIL,
        to: userEmail,
        subject: 'Order Confirmed!',
        html: `
        <h1>Order Confirmed!</h1>
        <p>Order ID: ${orderId}</p>
        <p>Total: $${total}</p>
    `
    })
}

module.exports = { sendOrderConfirmation } 