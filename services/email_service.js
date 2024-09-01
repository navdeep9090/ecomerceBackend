import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', 
    port: 587, 
    auth: {
      user: 'bharat.onclick@gmail.com', 
      pass: 'auah yanm aufd isdt'   
    }
  });

const mailGenerator = new Mailgen({
  theme: 'default',
  product: {
    name: 'Your Product Name',
    link: 'http://localhost:3000/',
  },
});

export const sendPasswordResetEmail = async (resetPasswordToken,user) => {
  const resetUrl = `http://localhost:3000/reset-password?token=${resetPasswordToken}&id=${user._id}`;
  const emailContent = {
    body: {
      name: user.name,
      intro: 'You have requested to reset your password.',
      action: {
        instructions: 'Click the button below to reset your password:',
        button: {
          color: '#22BC66', 
          text: 'Reset your password',
          link: resetUrl,
        },
      },
      outro: 'If you did not request a password reset, please ignore this email.',
    },
  };
  const emailBody = mailGenerator.generate(emailContent);
  const mailOptions = {
    from: 'bharat.onclick@gmail.com',
    to: user.email,
    subject: 'Password Reset Request',
    html: emailBody,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email could not be sent');
  }
};
