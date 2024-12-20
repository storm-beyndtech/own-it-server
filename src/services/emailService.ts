import { emailTemplate } from "./emailTemplate";
import { transporter } from "./emailConfig";

const sendMail = (mailData:any) => {
	return new Promise((resolve, reject) => {
		transporter.sendMail(mailData, (err, info) => {
			if (err) {
				console.error(err);
				reject(err);
			} else {
				console.log(info);
				resolve(info);
			}
		});
	});
};

const sendMailWithRetry = async (mailData:any, retries = 3) => {
	for (let i = 0; i < retries; i++) {
		try {
			return await sendMail(mailData);
		} catch (error) {
			if (i === retries - 1) throw error;
			console.log(`Retrying sendMail... Attempt ${i + 1}`);
		}
	}
};

// Welcome mail
export async function welcomeMail(userEmail: string, token: string) {
  const verificationLink = `http://localhost:5000/api/auth/verify-email/${token}`;
  try {
    let bodyContent = `
      <td style="padding: 20px; line-height: 1.8;">
        <p>Welcome to Own-It!</p>
        <p>We're thrilled to have you as part of our community. At Own-It, we are dedicated to providing the best services and support to our members.</p>
        <p>Click the link to verify your email address</p>
        <a href="${verificationLink}">${verificationLink}</a>
        <p>Best regards,</p>
        <p>The Own-It Team</p>
      </td>
    `;

    let mailOptions = {
      from: `Own-It ${process.env.SMTP_USER}`,
      to: userEmail,
      subject: "Welcome to Own-It!",
      html: emailTemplate("Welcome to Own-It", bodyContent),
    };

    const result = await sendMailWithRetry(mailOptions);
    return result;
  } catch (error) {
    return { error: error instanceof Error && error.message};
  }
}


// Alert admin mail
export async function alertAdmin(userEmail:string, firstName:string, lastName:string) {
	try {
		let bodyContent = `
      <td style="padding: 20px; line-height: 1.8;">
        <p>Hello Admin,</p>
        <p>A new user has registered on Own-It.</p>
        <p>Details:</p>
        <ul>
          <li>Email: ${userEmail}</li>
          <li>Name: ${firstName} ${lastName}</li>
        </ul>
        <p>Thank you,</p>
        <p>Own-It Team</p>
      </td>
    `;

		let mailOptions = {
			from: `Own-It ${process.env.SMTP_USER}`,
			to: userEmail,
			subject: "New User Registration Alert",
			html: emailTemplate("New User Registration", bodyContent),
		};

		const result = await sendMailWithRetry(mailOptions);
		return result;
	} catch (error) {
    return { error: error instanceof Error && error.message};
	}
}

// Contact admin mail
export async function contactAdmin(userEmail:string, fullName:string, message:string) {
	try {
		let bodyContent = `
      <td style="padding: 20px; line-height: 1.8;">
        <p>Hello Admin,</p>
        <p>You have received a new message from <b>${fullName}.</b></p>
        <p>${message}</p>
        <p>Sent by: ${userEmail}</p>
      </td>
    `;

		let mailOptions = {
			from: `Own-It ${process.env.SMTP_USER}`,
			to: process.env.ADMIN_EMAIL,
			subject: "Contact Mail",
			html: emailTemplate("Contact Mail", bodyContent),
		};

		const result = await sendMailWithRetry(mailOptions);
		return result;
	} catch (error) {
    return { error: error instanceof Error && error.message};
	}
}

// Password reset mail
export async function passwordReset(userEmail: string) {
	try {
		let bodyContent = `
      <td style="padding: 20px; line-height: 1.8;">
        <p>A request was sent for password reset. If this wasn't you, please contact our customer service.</p>
        <p>Click the reset link below to proceed:</p>
        <a style="display: inline-block; max-width: 200px; padding: 15px 30px; border-radius: 30px; background-color: #114000; color: #fafafa; text-decoration: none;" href="https://prowealth-inc.com/forgotPassword/newPassword">Reset Password</a>
      </td>
    `;

		let mailOptions = {
			from: `Own-It ${process.env.SMTP_USER}`,
			to: userEmail,
			subject: "Password Reset",
			html: emailTemplate("Password Reset", bodyContent),
		};

		const result = await sendMailWithRetry(mailOptions);
		return result;
	} catch (error) {
    return { error: error instanceof Error && error.message};
	}
}
