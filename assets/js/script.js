// TinyMCE
const tinyMCEInit = (selector) => {
  tinymce.init({
    selector: selector || '[textarea-mce]',
    plugins: [
      "anchor", "link",
    ],
  });
};
tinyMCEInit();
// End TinyMCE

// FilePond
const listFilepondImages = document.querySelectorAll("[filepond-image]");
const filePond = {};
if(listFilepondImages.length > 0) {
  FilePond.registerPlugin(FilePondPluginImagePreview);
  FilePond.registerPlugin(FilePondPluginFileValidateType);
  
  listFilepondImages.forEach(item => {
    filePond[item.name] = FilePond.create(item, {
      labelIdle: "+",
      acceptedFileTypes: ['image/*']
    });
  })
}
// End FilePond

// Button Menu
const buttonMenu = document.querySelector(".header .inner-button-menu");
if(buttonMenu) {
  const sider = document.querySelector(".sider");
  const boxOverlay = document.querySelector(".box-overlay");

  buttonMenu.addEventListener("click", () => {
    sider.classList.add("show");
    boxOverlay.classList.add("show");
  })

  boxOverlay.addEventListener("click", () => {
    sider.classList.remove("show");
    boxOverlay.classList.remove("show");
  })
}
// End Button Menu

// Schedule List Section 7
const boxSchelduleList = document.querySelector(".section-7 .inner-schedule-list");
if(boxSchelduleList) {
  // Tao moi lich trinh
  const buttonCreate = document.querySelector(".section-7 .inner-schedule-create");
  buttonCreate.addEventListener("click", () => {
    const id = `mce_${Date.now()}`;
    const scheduleItem = document.createElement("div");
    scheduleItem.classList.add("inner-schedule-item");
    scheduleItem.innerHTML = `
      <div class="inner-head">
        <div class="inner-button inner-move"><i class="fa-solid fa-arrows-up-down-left-right"></i></div>
        <input type="text" name="">
        <div class="inner-button inner-trash"><i class="fa-solid fa-trash-can"></i></div>
        <div class="inner-button inner-more"><i class="fa-solid fa-angle-down"></i></div>
      </div>
      <div class="inner-body show">
        <textarea name="", id="${id}"> </textarea>
      </div>
    `;
    boxSchelduleList.append(scheduleItem);
    tinyMCEInit(`#${id}`);
  })

  boxSchelduleList.addEventListener("click", (event) => {
    // Dong/mo
    if(event.target.closest(".inner-more")) {
      event.target.closest(".inner-schedule-item").classList.toggle("hidden");
    }

    // Xoa  
    if(event.target.closest(".inner-trash")) {
      const itemRemove = event.target.closest(".inner-schedule-item");
      // boxSchelduleList.removeChild(itemRemove);
      itemRemove.remove();
    }
  })

  // SortableJS
  Sortable.create(boxSchelduleList, {
    handle: ".inner-move",
    animation: 150,
    onStart: (event) => {
      const item = event.item;
      const textarea = item.querySelector("textarea");
      const id = textarea.id;
      tinymce.get(id).remove(); // Xoa bo soan thao tinymce cho khoi code co id tuong ung
    },
    onEnd: (event) => {
      const item = event.item;
      const textarea = item.querySelector("textarea");
      const id = textarea.id; // Dung de lay id cho khoi code tuong ung
      tinyMCEInit(`#${id}`);
    }
  });
  // End SortableJS
}
// End Schedule List Section 7

// Revenue Chart
const revenueChart = document.querySelector("#revenueChart");
if(revenueChart) {
  new Chart(revenueChart, {
    type: 'line',
    data: {
      labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"],
      datasets: [
        {
          label: 'Tháng trước',
          data: ["48231", "91754", "26389", "74512", "58106", "33478", "89621", "12045", "67893", "55421", "99876", "43120", "77234", "68901", "24567", "83012", "59348", "16789", "95432", "71805", "38671", "84219", "27450", "66138", "50927", "11356", "92740", "45863", "78415", "63209"],
          borderColor: "#FF6384",
          backgroundColor: "#FF9EB2",
          borderWidth: 1.5,
        },
        {
          label: 'Tháng này',
          data: ["73124", "28456", "96503", "41872", "55219", "80347", "17658", "69421", "92015", "34786", "58134", "76290", "21475", "88963", "43018", "67125", "95841", "12679", "54320", "81746", "39215", "70483", "26891", "93540", "48672", "15934", "82367", "60125", "74819", "51283"],
          borderColor: "#36A2EB",
          backgroundColor: "#82CDFF",
          borderWidth: 1.5,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        }
      }
    },
  });
}
// End Revenue Chart

// Category Create Form
const categoryCreateForm = document.querySelector("#categoryCreateForm");
if(categoryCreateForm) {
  const validator = new JustValidate(categoryCreateForm);

  validator
    .addField('#categoryName', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập tên danh mục',
      }
    ])
    .onSuccess(( event ) => {
      const categoryName = event.target.categoryName.value;
      const categoryParent = event.target.categoryParent.value;
      const position = event.target.position.value;
      const status = event.target.status.value;
      const avatar = filePond.avatar.getFile()?.file || null;
      const logo = filePond.logo.getFile()?.file || null;
      const description = tinymce.get("description").getContent();
      console.log(categoryName);
      console.log(categoryParent);
      console.log(position);
      console.log(status);
      console.log(avatar);
      console.log(logo);
      console.log(description);
    });
}
// End Category Create Form

// Tour Create Form
const tourCreateForm = document.querySelector("#tourCreateForm");
if(tourCreateForm) {
  const validator = new JustValidate(tourCreateForm);

  validator
    .addField('#name', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập tên tour',
      }
    ])
    .onSuccess(( event ) => {
      const name = event.target.name.value;
      const category = event.target.category.value;
      const position = event.target.position.value;
      const status = event.target.status.value;
      const avatar = filePond.avatar.getFile()?.file || null;

      const priceAdult = event.target.priceAdult.value;
      const priceChild = event.target.priceChild.value;
      const priceBaby = event.target.priceBaby.value;

      const newPriceAdult = event.target.newPriceAdult.value;
      const newPriceChild = event.target.newPriceChild.value;
      const newPriceBaby = event.target.newPriceBaby.value;

      const stockAdult = event.target.stockAdult.value;
      const stockChild = event.target.stockChild.value;
      const stockBaby = event.target.stockBaby.value;

      const locations = [];

      const time = event.target.time.value;
      const transport = event.target.transport.value;
      const date = event.target.date.value;
      const description = tinymce.get("description").getContent();

      const schedules = [];

      // Location
      const inputLocationCheckedList = tourCreateForm.querySelectorAll("[name='locations']:checked");
      if(inputLocationCheckedList.length) {
        inputLocationCheckedList.forEach(input => locations.push(input.value));
      }
      // End Location

      // Schedule
      const scheduleItemList = tourCreateForm.querySelectorAll(".inner-schedule-item");
      if(scheduleItemList.length) {
        scheduleItemList.forEach(item => {
          const input = item.querySelector(".inner-head input");
          const textarea = item.querySelector(".inner-body textarea");
          
          const title = input.value;
          const content = tinymce.get(textarea.id).getContent();

          const info = {
            title,
            content
          };

          schedules.push(info);
        })
      }
      // End Schedule

      console.log(name);
      console.log(category);
      console.log(position);
      console.log(status);
      console.log(avatar);

      console.log(priceAdult);
      console.log(priceChild);
      console.log(priceBaby);

      console.log(newPriceAdult);
      console.log(newPriceChild);
      console.log(newPriceBaby);

      console.log(stockAdult);
      console.log(stockChild);
      console.log(stockBaby);

      console.log(locations);
      console.log(time);
      console.log(transport);
      console.log(date);
      console.log(description);
      console.log(schedules);
    });
}
// End Tour Create Form


// Order Edit Form
const orderEditForm = document.querySelector("#orderEditForm");
if(orderEditForm) {
  const validator = new JustValidate(orderEditForm);

  validator
    .addField('#fullName', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập họ tên',
      }
    ])
    .addField('#phone', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập số điện thoại',
      },
      {
        rule: 'customRegexp',
        value: /^(?:\+84|0)(3|5|7|8|9)\d{8}$/,
        errorMessage: 'Số điện thoại không đúng định dạng của Việt Nam'
      }
    ])
    .onSuccess(( event ) => {
      const fullName = event.target.fullName.value;
      const phone = event.target.phone.value;
      const note = event.target.note.value;
      const paymentMethod = event.target.paymentMethod.value;
      const paymentStatus = event.target.paymentStatus.value;
      const status = event.target.status.value;
      console.log(fullName);
      console.log(phone);
      console.log(note);
      console.log(paymentMethod);
      console.log(paymentStatus);
      console.log(status);
    });
}
// End Order Edit Form


// Setting Website Info Form
const settingWebsiteInfoForm = document.querySelector("#settingWebsiteInfoForm");
if(settingWebsiteInfoForm) {
  const validator = new JustValidate(settingWebsiteInfoForm);

  validator
    .addField('#email', [
      {
        rule: 'email',
        errorMessage: 'Không đúng định dạng email',
      }
    ])
    .onSuccess(( event ) => {
      const websiteName = event.target.websiteName.value;
      const phone = event.target.phone.value;
      const email = event.target.email.value;
      const address = event.target.address.value;
      const logo = filePond.logo.getFile()?.file || null;
      const favicon = filePond.favicon.getFile()?.file || null;
      console.log(websiteName);
      console.log(phone);
      console.log(email);
      console.log(address);
      console.log(logo);
      console.log(favicon);
    });
}
// End Setting Website Info Form


// Setting Account Admin Create Form
const settingAccountAdminCreateForm = document.querySelector("#settingAccountAdminCreateForm");
if(settingAccountAdminCreateForm) {
  const validator = new JustValidate(settingAccountAdminCreateForm);

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
    .addField('#phone', [
      {
        rule: 'customRegexp',
        value: /^(?:\+84|0)(3|5|7|8|9)\d{8}$/,
        errorMessage: 'Số điện thoại không đúng định dạng của Việt Nam'
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
    .onSuccess(( event ) => {
      const fullName = event.target.fullName.value;
      const email = event.target.email.value;
      const phone = event.target.phone.value;
      const role = event.target.role.value;
      const position = event.target.position.value;
      const status = event.target.status.value;
      const password = event.target.password.value;
      const avatar = filePond.avatar.getFile()?.file || null;
      console.log(fullName);
      console.log(email);
      console.log(phone);
      console.log(role);
      console.log(position);
      console.log(status);
      console.log(password);
      console.log(avatar);
    });
}
// End Setting Account Admin Create Form

// Setting Role Create Form
const settingRoleCreateForm = document.querySelector("#settingRoleCreateForm");
if(settingRoleCreateForm) {
  const validator = new JustValidate(settingRoleCreateForm);

  validator
    .addField('#roleName', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập tên nhóm quyền',
      }
    ])
    .onSuccess(( event ) => {
      const roleName = event.target.roleName.value;
      const description = event.target.description.value;
      const roles = [];

      // Role
      const roleCheckedLists = settingRoleCreateForm.querySelectorAll("[name='roles']:checked");
      roleCheckedLists.forEach(input => roles.push(input.value))
      // End Role

      console.log(roleName);
      console.log(description);
      console.log(roles);
    });
}
// End Setting Role Create Form

// Profile Edit Form
const profileEditForm = document.querySelector("#profileEditForm");
if(profileEditForm) {
  const validator = new JustValidate(profileEditForm);

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
    .addField('#phone', [
      {
        rule: 'customRegexp',
        value: /^(?:\+84|0)(3|5|7|8|9)\d{8}$/,
        errorMessage: 'Số điện thoại không đúng định dạng của Việt Nam'
      }
    ])
    .onSuccess(( event ) => {
      const fullName = event.target.fullName.value;
      const email = event.target.email.value;
      const phone = event.target.phone.value;
      const avatar = filePond.avatar.getFile()?.file || null;
      console.log(fullName);
      console.log(email);
      console.log(phone);
      console.log(avatar);
    });
}
// End Profile Edit Form

// Profile Change Password Form
const profileChangePasswordForm = document.querySelector("#profileChangePasswordForm");
if(profileChangePasswordForm) {
  const validator = new JustValidate(profileChangePasswordForm);

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
// End Profile Change Password Form