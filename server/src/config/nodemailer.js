const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    },
});

const sendWelcomeEmail = async ({ userEmail, userName }) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: userEmail,
            subject: "Welcome to PratikWear",
            html: `
            <h1>Welcome to PratikWear, ${userName}!</h1>
            <p>Your account has been created successfully.</p>
            <p>We're excited to have you with us.</p>
        `,
        });
        console.log("Welcome email sent to:", userEmail);
    } catch (error) {
        console.error("Welcome email error:", error);
    }
};

const sendOrderConfirmation = async ({ userEmail, orderId, total }) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL,
            to: userEmail,
            subject: "Order Confirmed",
            html: `
                <h1>Order Confirmed</h1>
                <p>Order ID: ${orderId}</p>
                <p>Total: ₹${total}</p>
                <p>Thank you for shopping with PratikWear.</p>
            `,
        });

        console.log("Order confirmation email sent:", info.messageId);
    } catch (error) {
        console.error("Order email error:", error);
    }
};

module.exports = { sendWelcomeEmail, sendOrderConfirmation } 