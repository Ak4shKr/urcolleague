export const userRegisterOTP = (name: string, OTP: string) => {
  return `
        <html>
            <body>
                <p>Hello ${name},</p>
                <p>Welcome to our platform.</p>
                <p>Your OTP is ${OTP}.</p>
                <br>
                <p>Regards,</p>
                <p>Nestays Service</p>
                <p>Faridabad, India</p>
            </body>
        </html>
    `;
};
