// Login Form
const loginForm = document.querySelector("#loginForm");
if(loginForm) {
  const validator = new JustValidate(loginForm);

  validator
    .addField('#email', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập email',
      }
    ])
    .addField('#password', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập mật khẩu',
      }
    ])
    .onSuccess(( event ) => {
      const email = event.target.email.value;
      const password = event.target.password.value;
      const rememberPassword = event.target.rememberPassword.checked;
      console.log(email);
      console.log(password);
      console.log(rememberPassword);
    });
}
// End Login Form

// Register Form
const registerForm = document.querySelector("#registerForm");
if(registerForm) {
  const validator = new JustValidate(registerForm);

  validator
    .addField('#fullName', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập Họ và tên',
      },
      {
        rule: 'minLength',
        errorMessage: 'Họ và tên phải ít nhất 5 ký tự',
        value: 5
      },
      {
        rule: 'maxLength',
        errorMessage: 'Họ và tên không được vượt quá 50 ký tự',
        value: 50
      }
    ])
    .addField('#email', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập email',
      },
      {
        rule: 'email',
        errorMessage: 'Email không đúng định dạng',
      }
    ])
    .addField('#password', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập mật khẩu',
      },
      {
        rule: 'strongPassword',
        errorMessage: 'Tối thiểu tám ký tự, ít nhất một chữ cái viết hoa, một chữ cái viết thường, một chữ số và một ký tự đặc biệt.',
      }
    ])
    .addField('#agree', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng chấp nhận các điều khoản',
      }
    ])
    .onSuccess(( event ) => {
      const fullName = event.target.fullName.value;
      const email = event.target.email.value;
      const password = event.target.password.value;
      console.log(fullName);
      console.log(email);
      console.log(password);
    });
}
// End Register Form

// Forget Password Form
const forgetPasswordForm = document.querySelector("#forgetPasswordForm");
if(forgetPasswordForm) {
  const validator = new JustValidate(forgetPasswordForm);

  validator
    .addField('#email', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập email',
      },
      {
        rule: 'email',
        errorMessage: 'Email không đúng định dạng',
      }
    ])
    .onSuccess(( event ) => {
      const email = event.target.email.value;
      console.log(email);
    });
}
// End Forget Password Form

// OTP Form
const otpForm = document.querySelector("#otpForm");
if(otpForm) {
  const validator = new JustValidate(otpForm);

  validator
    .addField('#otp', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập mã otp',
      }
    ])
    .onSuccess(( event ) => {
      const otp = event.target.otp.value;
      console.log(otp);
    });
}
// End OTP Form

// Reset Password Form
const resetPasswordForm = document.querySelector("#resetPasswordForm");
if(resetPasswordForm) {
  const validator = new JustValidate(resetPasswordForm);

  validator
    .addField('#password', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập mật khẩu mới',
      },
      {
        rule: 'strongPassword',
        errorMessage: 'Tối thiểu tám ký tự, ít nhất một chữ cái viết hoa, một chữ cái viết thường, một chữ số và một ký tự đặc biệt.',
      }
    ])
    .addField('#confirmPassword', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng xác nhận lại mật khẩu',
      },
      {
        validator: (value, context) => value === context["#password"].elem.value,
        errorMessage: "Xác nhận mật khẩu không khớp"
      }
    ])
    .onSuccess(( event ) => {
      const password = event.target.password.value;
      console.log(password);
    });
}
// End Reset Password Form