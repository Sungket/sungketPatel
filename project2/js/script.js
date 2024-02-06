// const { clippingParents } = require("@popperjs/core");

function refreshPersonnelTable() {
  $.ajax({
    url: "php/getAll.php",
    type: "GET",
    success: function (result) {
      $('#personnelTable').empty();
      for (let i = 0; i < result.data.length; i++){
        let tableRef = document.getElementById('personnelTable');
        let row = tableRef.insertRow(-1);
        let nameCell = row.insertCell(0);
        nameCell.className = 'align-middle text-nowrap';
        let nameText = document.createTextNode(result.data[i].lastName + ", " + result.data[i].firstName);
        nameCell.appendChild(nameText);
        let jobCell = row.insertCell(1);
        jobCell.className = 'align-middle text-nowrap d-none d-md-table-cell';
        let jobText = document.createTextNode(result.data[i].jobTitle);
        jobCell.appendChild(jobText);
        let departmentCell = row.insertCell(2);
        departmentCell.className = 'align-middle text-nowrap d-none d-md-table-cell';
        let departmentText = document.createTextNode(result.data[i].department);
        departmentCell.appendChild(departmentText);
        let locationCell = row.insertCell(3);
        locationCell.className = 'align-middle text-nowrap d-none d-md-table-cell';
        let locationText = document.createTextNode(result.data[i].location);
        locationCell.appendChild(locationText);
        let emailCell = row.insertCell(4);
        emailCell.className = 'align-middle text-nowrap d-none d-md-table-cell';
        let emailText = document.createTextNode(result.data[i].email);
        emailCell.appendChild(emailText);
        let btnCell = row.insertCell(5);
        btnCell.className = '';
        let editBtn = document.createElement('button');
        editBtn.type = 'button';
        editBtn.className = 'btn btn-primary btn-sm mx-1';
        editBtn.setAttribute('data-bs-toggle', 'modal');
        editBtn.setAttribute('data-bs-target', '#editPersonnelModal');
        editBtn.setAttribute('data-id', '23');
        editBtn.innerHTML = '<i class="fa-solid fa-pencil fa-fw"></i>';
        let deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.className = "btn btn-primary btn-sm deletePersonnelBtn";
        deleteBtn.setAttribute('data-id', '23');
        deleteBtn.innerHTML = '<i class="fa-solid fa-trash fa-fw"></i>';
        btnCell.appendChild(editBtn);
        btnCell.appendChild(deleteBtn);
      }
    }
  });
}

function refreshDepartmentTable() {
  $.ajax({
    url: "php/getAllDepartments.php",
    type: 'GET',
    success: function (result) {
      $('#departmentsTable').empty();
      for (let i = 0; i < result.data.length; i++){
        let tableRef = document.getElementById('departmentsTable');
        let row = tableRef.insertRow(-1);
        let deptCell = row.insertCell(0);
        deptCell.className = 'align-middle text-nowrap';
        let deptText = document.createTextNode(result.data[i].name);
        deptCell.appendChild(deptText);
        result.location.forEach(element => {
          if (element.id === result.data[i].locationID) {
            let locationCell = row.insertCell(1);
            locationCell.className = 'align-middle text-nowrap d-none d-md-table-cell';
            let locationText = document.createTextNode(element.name);
            locationCell.appendChild(locationText);
          };             
        });
        let btnCell = row.insertCell(2);
        btnCell.className = "align-middle text-end text-nowrap";
        let btn = document.createElement("button");
        btn.type = 'button';
        btn.className = 'btn btn-primary btn-sm mx-1';
        btn.setAttribute('data-bs-toggle', "modal");
        btn.setAttribute("data-bs-target", "#deleteDepartmentModal");
        btn.setAttribute("data-id", "1");
        btn.innerHTML = '<i class="fa-solid fa-pencil fa-fw"></i>'
        let btn2 = document.createElement("button");
        btn2.type = 'button';
        btn2.className = 'btn btn-primary btn-sm deleteDepartmentBtn';
        btn2.setAttribute("data-id", "1");
        btn2.innerHTML = '<i class="fa-solid fa-trash fa-fw"></i>';
        btnCell.appendChild(btn);
        btnCell.appendChild(btn2);
      };
    }
  });
}

function refreshLocationTable() {
  $.ajax({
    url: "php/getAllLocations.php",
    type: 'GET',
    success: function(result) {
      $('#locationsTable').empty();
      for (let i = 0; i < result.data.length; i++) {
        let tableRef = document.getElementById('locationsTable');
        let row = tableRef.insertRow(-1);
        let locNameCell = row.insertCell(0);
        locNameCell.className = 'align-middle text-nowrap';
        let locationText = document.createTextNode(result.data[i].name);
        locNameCell.appendChild(locationText);
        let btnCell = row.insertCell(1);
        btnCell.className = "align-middle text-end text-nowrap";
        let editButton = document.createElement("button");
        editButton.type = 'button';
        editButton.className = "btn btn-primary btn-sm mx-1";
        editButton.innerHTML = '<i class="fa-solid fa-pencil fa-fw"></i>';
        let deleteButton = document.createElement("button");
        deleteButton.type = 'button';
        deleteButton.className = 'btn btn-primary btn-sm';
        deleteButton.innerHTML = '<i class="fa-solid fa-trash fa-fw"></i>';
        btnCell.appendChild(editButton);
        btnCell.appendChild(deleteButton);
      }
    }
  }); 
}

function searchFilter(result) {
  for (let i = 0; i < result.data.found.length; i++){
    if (i == 0){
      $('#searchFilterTable').empty();
    }
    let tableref = document.getElementById('searchFilterTable');
    let row = tableref.insertRow(-1);
    let nameCell = row.insertCell(0);
    nameCell.className = 'align-middle text-nowrap';
    let nameText = document.createTextNode(result.data.found[i].firstName + ", " + result.data.found[i].lastName);
    nameCell.appendChild(nameText);
    let jobCell = row.insertCell(1);
    jobCell.className = 'align-middle text-nowrap d-none d-md-table-cell';
    let jobText = document.createTextNode(result.data.found[i].jobTitle);
    jobCell.appendChild(jobText);
    let departmentCell = row.insertCell(2);
    departmentCell.className = 'align-middle text-nowrap d-none d-md-table-cell';
    let departmentText = document.createTextNode(result.data.found[i].departmentName);
    departmentCell.appendChild(departmentText);
    let locationCell = row.insertCell(3);
    locationCell.className = 'align-middle text-nowrap d-none d-md-table-cell';
    let locationText = document.createTextNode(result.data.found[i].locationName);
    locationCell.appendChild(locationText);
    let emailCell = row.insertCell(4);
    emailCell.className = 'align-middle text-nowrap d-none d-md-table-cell';
    let emailText = document.createTextNode(result.data.found[i].email);
    emailCell.appendChild(emailText);
    let btnCell = row.insertCell(5);
    btnCell.className = '';
    let editBtn = document.createElement('button');
    editBtn.type = 'button';
    editBtn.className = 'btn btn-primary btn-sm mx-1';
    editBtn.setAttribute('data-bs-toggle', 'modal');
    editBtn.setAttribute('data-bs-target', '#editPersonnelModal');
    editBtn.setAttribute('data-id', '23');
    editBtn.innerHTML = '<i class="fa-solid fa-pencil fa-fw"></i>';
    let deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = "btn btn-primary btn-sm deletePersonnelBtn";
    deleteBtn.setAttribute('data-id', '23');
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash fa-fw"></i>';
    btnCell.appendChild(editBtn);
    btnCell.appendChild(deleteBtn);
  }
}


$("#searchInp").on("keyup", function () {
  
  // your code
  $.ajax({
    url: "php/SearchAll.php",
    type: "POST",
    data: {
      txt : $(this).val()
    },
    success: function(result){

      let resultCode = result.status.code;

      if (resultCode == 200) {

        $('#personnelTable').empty();
        $('#departmentsTable').empty();
        $('#locationsTable').empty();

        searchFilter(result);
        
      }
    }
  })

});

$("#refreshBtn").on("click", function () {

  $('#searchFilterTable').empty();
  
  if ($("#personnelBtn").hasClass("active")) {
    // Refresh personnel table
    $('#personnelTable').empty();
    refreshPersonnelTable();
    
  } else {
    
    if ($("#departmentsBtn").hasClass("active")) {
      // Refresh department table
      $('#departmentsTable').empty();
      refreshDepartmentTable();

    } else {
      
      // Refresh location table
      $('#locationsTable').empty();
      refreshLocationTable();

    } 
  }
});

$("#filterBtn").on("click", function () {
  // Open a modal of your own design that allows the user to apply a filter to the personnel table on either department or location
  //clear all existing options in list
  $('#departmentDropdown').empty();
  $('#locationDropdown').empty();

  $.ajax({
    url: "php/getAllDepartments.php",
    type: "GET",
    success: function(result) {

      for (let i = 0; i < result.data.length + 1; i++){
        let option = document.createElement('option');
        if (i == 0) {
          option.text = "All";
          option.value = "all";
        } else {
          option.text = result.data[i -1].name;
          option.value = result.data[i -1].name;
        }
        $("#departmentDropdown").append(option);
      }

      for (let i = 0; i < result.location.length + 1; i++){
        let option = document.createElement('option');
        if (i == 0) {
          option.text = "All";
          option.value = "all";
        } else {
          option.text = result.location[i -1].name;
          option.value = result.location[i -1].name;
        }
        $("#locationDropdown").append(option);
      }
    }
  })

  // if a department is selected in the dropdown, reduce the number of options in the location dropdown
  //   $('#departmentDropdown').on("click", function(e) {
  //   console.log(e.target.value);
  //   $.ajax({
  //     url: "php/SearchAll.php",
  //     type: "POST",
  //     data: {
  //       txt : e.target.value
  //     },
  //     success: function (result) {
  //       let resultCode = result.status.code;

  //       if (resultCode == 200) {
  //         // searchFilter(result);
  //         $("#locationDropdown").empty();

  //         //rebuild the location dropdown which is now based on department
  //         let option = document.createElement('option');
  //         option.text = result.data.found[0].locationName;
  //         option.value = result.data.found[0].locationName;
  //         $("#locationDropdown").append(option);
  //       }
  //     }
  //   })
  // })

  // if a location is selected in the dropdown, reduce the number of options in the departments dropdown
  // $('#locationDropdown').on("click", function(e) {
  //   console.log(e.target.value);
  //   $.ajax({
  //     url: "php/SearchAll.php",
  //     type: "POST",
  //     data: {
  //       txt : e.target.value
  //     },
  //     success: function (result) {
  //       let resultCode = result.status.code;

  //       if (resultCode == 200) {
  //         searchFilter(result);
  //         $("#departmentDropdown").empty();

  //         let departmentArray = [];

  //         //rebuild the department dropdown which is now based on location
  //         $.each(result.data.found, function(i) {
  //           let option = document.createElement('option');
  //           option.text = result.data.found[i].departmentName;
  //           option.value = result.data.found[i].departmentName;
  //           const val = option.text;

  //           if (!departmentArray.includes(val)){
  //             $("#departmentDropdown").append(option);
  //           }
  //           departmentArray.push(result.data.found[i].departmentName);
  //         })
  //       }
  //     }
  //   })
  // })

  // event when submitting form
  $("#filterForm").on("submit", function(e) {
    e.preventDefault();
    $('#personnelTable').empty();
    $('#departmentsTable').empty();
    $('#locationsTable').empty();
    let dept = $('select[id="departmentDropdown"] option:selected').val();
    let locn = $('select[id="locationDropdown"] option:selected').val();
    console.log(dept + ', ' + locn);
    
    if(dept == "all" && locn == "all") {
      $('#searchFilterTable').empty();
      refreshPersonnelTable();
    }
    else if (dept != "all" && (locn == "all" || locn != "all")) {
      console.log(dept);
      $.ajax({
        url: "php/SearchAll.php",
        type: "POST",
        data: {
          txt: dept
        },
        success: function(result) {
          let resultCode = result.status.code;
          if (resultCode == 200) {
            searchFilter(result);
          }
        }
      })
    } else if (dept == "all" && locn != "all") {
      console.log(locn);
      $.ajax({
        url: "php/SearchAll.php",
        type: "POST",
        data: {
          txt: locn
        },
        success: function(result) {
          let resultCode = result.status.code;
          if (resultCode == 200) {
            searchFilter(result);
          }
        }
      })
    }
  })

});

// ------ ADD BUTTON SECTION ------------------

$("#addBtn").on("click", function () {
  
  // Replicate the logic of the refresh button click to open the add modal for the table that is currently on display
  if ($("#personnelBtn").hasClass("active")) {
    
    //add personnel label
    $("#addModalTitle").html("Add Personnel")

    $("#modalBody").empty();
    $("#modalFooter").empty();

    //clear form
    // $("#addForm").empty();

    //build the modal body for adding Personnel
    const modalBody = document.getElementById("modalBody")

    const footer = document.getElementById("modalFooter");

    const personnelForm = document.createElement("form");
    personnelForm.setAttribute("id", "personnelForm");

    const div = document.createElement("div");
    div.setAttribute("class", "form-floating mb-3");

    const firstNameInput = document.createElement("input");
    firstNameInput.setAttribute("type", "text");
    firstNameInput.setAttribute("class", "form-control");
    firstNameInput.setAttribute("id", "inputFirstName");
    firstNameInput.setAttribute("placeholder", "First Name");
    firstNameInput.setAttribute("oninvalid", "Missed info");
    firstNameInput.setAttribute("required", "");
    const firstNameInputLabel = document.createElement("label");
    firstNameInputLabel.setAttribute("for", "inputFirstName");
    firstNameInputLabel.innerHTML = "First Name";

    const div2 = document.createElement("div");
    div2.setAttribute("class", "form-floating mb-3");

    const lastNameInput = document.createElement("input");
    lastNameInput.setAttribute("type", "text");
    lastNameInput.setAttribute("class", "form-control");
    lastNameInput.setAttribute("id", "inputLastName");
    lastNameInput.setAttribute("placeholder", "Last name");
    lastNameInput.setAttribute("required", "");
    const lastNameInputLabel = document.createElement("label");
    lastNameInputLabel.setAttribute("for", "inputLastName");
    lastNameInputLabel.innerHTML = "Last Name";

    const div3 = document.createElement("div");
    div3.setAttribute("class", "form-floating mb-3");

    const jobTitleInput = document.createElement("input");
    jobTitleInput.setAttribute("type", "text");
    jobTitleInput.setAttribute("class", "form-control");
    jobTitleInput.setAttribute("id", "inputJobTitle");
    jobTitleInput.setAttribute("placeholder", "Last name");
    jobTitleInput.setAttribute("required", "");
    const jobTitleInputLabel = document.createElement("label");
    jobTitleInputLabel.setAttribute("for", "inputJobTitle");
    jobTitleInputLabel.innerHTML = "Job Title";

    const div4 = document.createElement("div");
    div4.setAttribute("class", "form-floating mb-3");

    const emailInput = document.createElement("input");
    emailInput.setAttribute("type", "email");
    emailInput.setAttribute("class", "form-control");
    emailInput.setAttribute("id", "inputEmail");
    emailInput.setAttribute("placeholder", "Enter Email");
    emailInput.setAttribute("required", "");
    const emailInputLabel = document.createElement("label");
    emailInputLabel.setAttribute("for", "inputEmail");
    emailInputLabel.innerHTML = "Email";

    const div5 = document.createElement("div");
    div5.setAttribute("class", "form-floating mb-3");

    const departmentSelect = document.createElement("select");
    departmentSelect.setAttribute("class", "form-select");
    departmentSelect.setAttribute("id", "personnelDepartmentDropdown");
    departmentSelect.setAttribute("placeholder", "Department");
    const departmentSelectLabel = document.createElement("label");
    departmentSelectLabel.setAttribute("for", "personnelDepartmentDropdown");
    departmentSelect.innerHTML = "Department";

    //read getAllDepartments to populate the departments dropdown.
    $.ajax({
      url: "php/getAllDepartments.php",
      type: "GET",
      success: function(result) {
        let resultCode = result.status.code;
        if (resultCode == 200) {
          console.log(result);
          
          for (let i = 0; i < result.data.length; i++) {
            let option = document.createElement("option");
            option.text = result.data[i].name;
            option.value = result.data[i].id;
            $("#personnelDepartmentDropdown").append(option);
          }
        }
      }
    })

    div.appendChild(firstNameInput);
    div.appendChild(firstNameInputLabel);
    personnelForm.appendChild(div);

    div2.appendChild(lastNameInput);
    div2.appendChild(lastNameInputLabel);
    personnelForm.appendChild(div2);

    div3.appendChild(jobTitleInput);
    div3.appendChild(jobTitleInputLabel);
    personnelForm.appendChild(div3);

    div4.appendChild(emailInput);
    div4.appendChild(emailInputLabel);
    personnelForm.appendChild(div4);

    div5.appendChild(departmentSelect);
    div5.appendChild(departmentSelectLabel);
    personnelForm.appendChild(div5);

    //create the relevant submit button

    const savebutton = document.createElement("button");
    savebutton.setAttribute("type", "submit");
    savebutton.setAttribute("form", "personnelForm");
    savebutton.setAttribute("class", "btn btn-outline-primary btn-sm myBtn");
    savebutton.innerHTML = "SAVE";
    const cancelbutton = document.createElement("button");
    cancelbutton.setAttribute("type", "button");
    cancelbutton.setAttribute("class", "btn btn-outline-primary btn-sm myBtn");
    cancelbutton.setAttribute("data-bs-dismiss", "modal");
    cancelbutton.innerHTML = "CANCEL";

    modalBody.appendChild(personnelForm);
    footer.appendChild(savebutton);
    footer.appendChild(cancelbutton);

    //hitting save in personnel tab passes through to the following ajax call.
      $("#personnelForm").on("submit", function (e) {
        e.preventDefault();

        console.log('personnel submit btn pressed');
        const fname = document.getElementById("inputFirstName").value;
        const lname = document.getElementById("inputLastName").value;
        const job = document.getElementById("inputJobTitle").value;
        const email = document.getElementById("inputEmail").value;
        const dept = document.getElementById("personnelDepartmentDropdown").value;
  
        console.log(dept);
        
        $.ajax({
          url: "php/insertPersonnel.php",
          type: "POST",
          data: {
            firstName: fname,
            lastName: lname,
            jobTitle: job,
            email: email,
            departmentID: dept
          },
          success: function(result) {
            console.log('person added!');
            console.log(result);
            $("#addModal").modal("hide");
          }
        })
      })

  } else {


// ---------------- START OF DEPARTMENT ADD MODAL --------------------------


    if ($("#departmentsBtn").hasClass("active")) {

      //add department modal
      $("#addModalTitle").html("Add Department")

      $("#modalBody").empty();
      $("#modalFooter").empty();

      //build the modal body for adding a Department
      const modalBody = document.getElementById("modalBody")

      const footer = document.getElementById("modalFooter");

      const departmentForm = document.createElement("form");
      departmentForm.setAttribute("id", "departmentForm");

      const div = document.createElement("div");
      div.setAttribute("class", "form-floating mb-3");

      const departmentNameInput = document.createElement("input");
      departmentNameInput.setAttribute("type", "text");
      departmentNameInput.setAttribute("class", "form-control");
      departmentNameInput.setAttribute("id", "departmentNameInput");
      departmentNameInput.setAttribute("placeholder", "Name of Location");
      departmentNameInput.setAttribute("required", "");
      const departmentNameInputLabel = document.createElement("label");
      departmentNameInputLabel.setAttribute("for", "departmentNameInput");
      departmentNameInputLabel.innerHTML = "Enter name of Department"

      const div2 = document.createElement("div");
      div2.setAttribute("class", "form-floating mb-3");

      const departmentLocationInput = document.createElement("select");
      departmentLocationInput.setAttribute("class", "form-select");
      departmentLocationInput.setAttribute("id", "departmentLocationDropdown");
      departmentLocationInput.setAttribute("placeholder", "Location");
      const departmentLocationLabel = document.createElement("label");
      departmentLocationLabel.setAttribute("for", "departmentLocationDropdown");
      departmentLocationLabel.innerHTML = "Location";

      //read in locations to populate the locations dropdown.
      $.ajax({
        url: "php/getAllLocations.php",
        type: "GET",
        success: function(result) {
          let resultCode = result.status.code;
          if (resultCode == 200) {
            console.log(result);
            
            for (let i = 0; i < result.data.length; i++) {
              let option = document.createElement("option");
              option.text = result.data[i].name;
              option.value = result.data[i].id;
              $("#departmentLocationDropdown").append(option);
            }
          }
        }
      })

      div.appendChild(departmentNameInput);
      div.appendChild(departmentNameInputLabel);
      departmentForm.appendChild(div);

      div2.appendChild(departmentLocationInput);
      div2.appendChild(departmentLocationLabel);
      departmentForm.appendChild(div2);


      //create the relevant submit button

      const savebutton = document.createElement("button");
      savebutton.setAttribute("type", "submit");
      savebutton.setAttribute("form", "departmentForm");
      savebutton.setAttribute("class", "btn btn-outline-primary btn-sm myBtn");
      savebutton.innerHTML = "SAVE";
      const cancelbutton = document.createElement("button");
      cancelbutton.setAttribute("type", "button");
      cancelbutton.setAttribute("class", "btn btn-outline-primary btn-sm myBtn");
      cancelbutton.setAttribute("data-bs-dismiss", "modal");
      cancelbutton.innerHTML = "CANCEL";

      modalBody.appendChild(departmentForm);
      footer.appendChild(savebutton);
      footer.appendChild(cancelbutton);

      //hitting save in department tab passes through to the following ajax call.
      $("#departmentForm").on("submit", function (e) {
        e.preventDefault();
        console.log('dept submit btn pressed');
        const dept = document.getElementById("departmentNameInput").value;
        const deptlocn = document.getElementById("departmentLocationDropdown").value;
        console.log(dept + ", " + deptlocn);
        $.ajax({
          url: "php/insertDepartment.php",
          type: "POST",
          data: {
            name: dept,
            locationID: deptlocn
          },
          success: function(result) {
            console.log('department added!');
            console.log(result);
            $("#addModal").modal("hide");
          }
        })
      })


      //clear form
      // $("#addForm").empty();

      //create 'add department' form
      // const form = document.getElementById("addForm")

      // const div = document.createElement("div");
      // div.setAttribute("class", "form-floating mb-3");

      // const departmentNameInput = document.createElement("input");
      // departmentNameInput.setAttribute("type", "text");
      // departmentNameInput.setAttribute("class", "form-control");
      // departmentNameInput.setAttribute("id", "departmentNameInput");
      // departmentNameInput.setAttribute("placeholder", "Name of Location");
      // departmentNameInput.setAttribute("required", "");
      // const departmentNameInputLabel = document.createElement("label");
      // departmentNameInputLabel.setAttribute("for", "departmentNameInput");
      // departmentNameInputLabel.innerHTML = "Enter name of Department"

      // const div2 = document.createElement("div");
      // div2.setAttribute("class", "form-floating mb-3");

      // const departmentLocationInput = document.createElement("select");
      // departmentLocationInput.setAttribute("class", "form-select");
      // departmentLocationInput.setAttribute("id", "departmentLocationDropdown");
      // departmentLocationInput.setAttribute("placeholder", "Location");
      // const departmentLocationLabel = document.createElement("label");
      // departmentLocationLabel.setAttribute("for", "departmentLocationDropdown");
      // departmentLocationLabel.innerHTML = "Location";

      // div.appendChild(departmentNameInput);
      // div.appendChild(departmentNameInputLabel);
      // form.appendChild(div);

      // div2.appendChild(departmentLocationInput);
      // div2.appendChild(departmentLocationLabel);
      // form.appendChild(div2);

      // //read in locations to populate the locations dropdown.
      // $.ajax({
      //   url: "php/getAllLocations.php",
      //   type: "GET",
      //   success: function(result) {
      //     let resultCode = result.status.code;
      //     if (resultCode == 200) {
      //       console.log(result);
            
      //       for (let i = 0; i < result.data.length; i++) {
      //         let option = document.createElement("option");
      //         option.text = result.data[i].name;
      //         option.value = result.data[i].id;
      //         $("#departmentLocationDropdown").append(option);
      //       }
      //     }
      //   }
      // })

// --------------------END OF DEPARTMENT ADD MODAL ------------------------------






    } else {
      //add location modal
      $("#addModalTitle").html("Add Location")

      // Build the form, fetch the id of the parent div

      $("#modalBody").empty();
      $("#modalFooter").empty();

      const modalBody = document.getElementById("modalBody");

      const footer = document.getElementById("modalFooter");

      const locationForm = document.createElement("form");
      locationForm.setAttribute("id", "locationForm");

      const div = document.createElement("div");
      div.setAttribute("class", "form-floating mb-3");

      const locationInput = document.createElement("input");
      locationInput.setAttribute("type", "text");
      locationInput.setAttribute("class", "form-control");
      locationInput.setAttribute("id", "inputLocationName");
      locationInput.setAttribute("placeholder", "Location Name");
      locationInput.setAttribute("required", "");
      const locationInputLabel = document.createElement("label");
      locationInputLabel.setAttribute("for", "inputLocationName");
      locationInputLabel.innerHTML = "Location";

      div.appendChild(locationInput);
      div.appendChild(locationInputLabel);

      locationForm.appendChild(div);

      //create the relevant submit button
      const savebutton = document.createElement("button");
      savebutton.setAttribute("type", "submit");
      savebutton.setAttribute("form", "locationForm");
      savebutton.setAttribute("class", "btn btn-outline-primary btn-sm myBtn");
      savebutton.innerHTML = "SAVE";
      const cancelbutton = document.createElement("button");
      cancelbutton.setAttribute("type", "button");
      cancelbutton.setAttribute("class", "btn btn-outline-primary btn-sm myBtn");
      cancelbutton.setAttribute("data-bs-dismiss", "modal");
      cancelbutton.innerHTML = "CANCEL";

      modalBody.appendChild(locationForm);
      footer.appendChild(savebutton);
      footer.appendChild(cancelbutton);

      // hitting save in location tab passes through to the following ajax call.
      $("#locationForm").on("submit", function (e) {
        e.preventDefault();
        console.log('submit location btn pressed');
        const locnName = document.getElementById("inputLocationName").value;
        console.log(locnName);
        $.ajax({
          url: "php/insertLocation.php",
          type: "POST",
          data: {
            name: locnName,
          },
          success: function(result) {
            console.log('location added!');
            console.log(result);
            $("#addModal").modal("hide");
          }
        })
      })

      // //clear form
      // $("#addForm").empty();

      // //create 'add location' form
      // const form = document.getElementById("addForm")

      // const div = document.createElement("div");
      // div.setAttribute("class", "form-floating mb-3");

      // const locationInput = document.createElement("input");
      // locationInput.setAttribute("type", "text");
      // locationInput.setAttribute("class", "form-control");
      // locationInput.setAttribute("id", "inputLocationName");
      // locationInput.setAttribute("placeholder", "Location Name");
      // locationInput.setAttribute("required", "");
      // const locationInputLabel = document.createElement("label");
      // locationInputLabel.setAttribute("for", "inputLocationName");
      // locationInputLabel.innerHTML = "Location";

      // div.appendChild(locationInput);
      // div.appendChild(locationInputLabel);

      // form.appendChild(div);

      // //create the relevant submit button
      // const footer = document.getElementById("modalFooter");

      // const button = document.createElement("button");
      // button.setAttribute("type", "submit");
      // button.setAttribute("form", "addForm");
      // button.setAttribute("class", "btn btn-outline-primary btn-sm myBtn");
      // button.innerHTML = "SAVE";

      // footer.appendChild(button);
    }
  }
  
});



$("#personnelBtn").on("click", function() {
  // Call function to refresh personnel table
  $('#searchFilterTable').empty()
  refreshPersonnelTable()
});

$("#departmentsBtn").on("click", function() {
  // Call function to refresh department table
  $('#searchFilterTable').empty()
  refreshDepartmentTable()
});

$("#locationsBtn").on("click", function() {
  // Call function to refresh location table 
  $('#searchFilterTable').empty()
  refreshLocationTable() 
});

$("#editPersonnelModal").on("show.bs.modal", function (e) {
  $.ajax({
    url:
      "php/getPersonnelByID.php",
    type: "POST",
    dataType: "json",
    data: {
      id: $(e.relatedTarget).attr("data-id") // Retrieves the data-id attribute from the calling button
    },
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        // Update the hidden input with the employee id so that
        // it can be referenced when the form is submitted

        $("#editPersonnelEmployeeID").val(result.data.personnel[0].id);

        $("#editPersonnelFirstName").val(result.data.personnel[0].firstName);
        $("#editPersonnelLastName").val(result.data.personnel[0].lastName);
        $("#editPersonnelJobTitle").val(result.data.personnel[0].jobTitle);
        $("#editPersonnelEmailAddress").val(result.data.personnel[0].email);

        $("#editPersonnelDepartment").html("");

        $.each(result.data.department, function () {
          $("#editPersonnelDepartment").append(
            $("<option>", {
              value: this.id,
              text: this.name
            })
          );
        });

        $("#editPersonnelDepartment").val(result.data.personnel[0].departmentID);
        
      } else {
        $("#editPersonnelModal .modal-title").replaceWith(
          "Error retrieving data"
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#editPersonnelModal .modal-title").replaceWith(
        "Error retrieving data"
      );
    }
  });
});

// Executes when the form button with type="submit" is clicked

$("#editPersonnelForm").on("submit", function (e) {
  
  // Executes when the form button with type="submit" is clicked
  // stop the default browser behviour

  e.preventDefault();

  // AJAX call to save form data
  
});