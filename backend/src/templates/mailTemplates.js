

exports.resetPasswordTemplate = (name, token) => {
  return `<p>Hello, ${name}</p>
  <p>Someone, hopefully you, has requested to reset the password for your account on ${process.env.REDIRECT_URL}.</p>
  <p>If you did not perform this request, you can safely ignore this email. Otherwise, click the link below to complete the process.</p>
  <p>
      <strong>
          <a href="${process.env.REDIRECT_URL}/login?resetpassword=${token}">
              <span style="color:#3498db">Reset password</span>
          </a>
      </strong> 
  </p>
  <p>please note link will be valid for the next 20 minutes.</p>
  </br>
  <p>This email is sent by,</p>
  <p><span style="color:#2980b9">Surenthernath J</span></p>`;
};
