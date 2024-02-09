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
        btnCell.className = 'align-middle text-end text-nowrap';
        let editBtn = document.createElement('button');
        editBtn.type = 'button';
        editBtn.className = 'btn btn-primary btn-sm mx-1';
        editBtn.setAttribute('data-bs-toggle', 'modal');
        editBtn.setAttribute('data-bs-target', '#editPersonnelModal');
        editBtn.setAttribute('data-id', result.data[i].id);
        editBtn.innerHTML = '<i class="fa-solid fa-pencil fa-fw"></i>';
        let deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.className = "btn btn-primary btn-sm deletePersonnelBtn";
        deleteBtn.setAttribute('data-bs-toggle', 'modal');
        deleteBtn.setAttribute('data-bs-target', '#deletePersonnelModal');
        deleteBtn.setAttribute('data-id', result.data[i].id);
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
        let editBtn = document.createElement("button");
        editBtn.type = 'button';
        editBtn.className = 'btn btn-primary btn-sm mx-1';
        editBtn.setAttribute('data-bs-toggle', "modal");
        editBtn.setAttribute("data-bs-target", "#editDepartmentModal");
        editBtn.setAttribute("data-id", result.data[i].id);
        editBtn.innerHTML = '<i class="fa-solid fa-pencil fa-fw"></i>'
        let deleteBtn = document.createElement("button");
        deleteBtn.type = 'button';
        deleteBtn.className = 'btn btn-primary btn-sm deleteDepartmentBtn';
        deleteBtn.setAttribute("data-bs-toggle", "modal");
        deleteBtn.setAttribute("data-bs-target", "#deleteDepartmentModal");
        deleteBtn.setAttribute("data-id", result.data[i].id);
        deleteBtn.innerHTML = '<i class="fa-solid fa-trash fa-fw"></i>';
        btnCell.appendChild(editBtn);
        btnCell.appendChild(deleteBtn);
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
        let editBtn = document.createElement("button");
        editBtn.type = 'button';
        editBtn.className = "btn btn-primary btn-sm mx-1";
        editBtn.setAttribute('data-bs-toggle', "modal");
        editBtn.setAttribute("data-bs-target", "#editLocationModal");
        editBtn.setAttribute("data-id", result.data[i].id);
        editBtn.innerHTML = '<i class="fa-solid fa-pencil fa-fw"></i>';
        let deleteBtn = document.createElement("button");
        deleteBtn.type = 'button';
        deleteBtn.className = 'btn btn-primary btn-sm';
        deleteBtn.setAttribute("data-bs-toggle", "modal");
        deleteBtn.setAttribute("data-bs-target", "#deleteLocationModal");
        deleteBtn.setAttribute("data-id", result.data[i].id);
        deleteBtn.innerHTML = '<i class="fa-solid fa-trash fa-fw"></i>';
        btnCell.appendChild(editBtn);
        btnCell.appendChild(deleteBtn);
      }
    }
  }); 
}

function searchFilter(result) {
  for (let i = 0; i < result.data.found.length; i++){
    if (i == 0){
      $('#personnelTable').empty();
    }
    let tableref = document.getElementById('personnelTable');
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
    btnCell.className = 'align-middle text-end text-nowrap';
    let editBtn = document.createElement('button');
    editBtn.type = 'button';
    editBtn.className = 'btn btn-primary btn-sm mx-1';
    editBtn.setAttribute('data-bs-toggle', 'modal');
    editBtn.setAttribute('data-bs-target', '#editPersonnelModal');
    editBtn.setAttribute('data-id', result.data.found[i].id);
    editBtn.innerHTML = '<i class="fa-solid fa-pencil fa-fw"></i>';
    let deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = "btn btn-primary btn-sm deletePersonnelBtn";
    deleteBtn.setAttribute('data-id', result.data.found[i].id);
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash fa-fw"></i>';
    btnCell.appendChild(editBtn);
    btnCell.appendChild(deleteBtn);
  }
}




$("#searchInp").on("keyup", function () {
  
  // when using searchbar, you need to be in personnel tab as it is searching personnel table
  // possible usecase for personnelTable.show?
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

        const fname = document.getElementById("inputFirstName").value;
        const lname = document.getElementById("inputLastName").value;
        const job = document.getElementById("inputJobTitle").value;
        const email = document.getElementById("inputEmail").value;
        const dept = document.getElementById("personnelDepartmentDropdown").value;
        
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
            // $("#addModal").modal("hide");
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
  refreshPersonnelTable()
});

$("#departmentsBtn").on("click", function() {
  // Call function to refresh department table
  refreshDepartmentTable()
});

$("#locationsBtn").on("click", function() {
  // Call function to refresh location table 
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

$("#editPersonnelForm").on("submit", function (e) {

  const id = document.getElementById("editPersonnelEmployeeID").value;
  const firstName = document.getElementById("editPersonnelFirstName").value;
  const lastName = document.getElementById("editPersonnelLastName").value;
  const jobTitle = document.getElementById("editPersonnelJobTitle").value;
  const email = document.getElementById("editPersonnelEmailAddress").value;
  const departmentID = document.getElementById("editPersonnelDepartment").value;

  $.ajax({
    url: "php/editPersonnel.php",
    type: "POST",
    data: {
      id : id,
      firstName : firstName,
      lastName : lastName,
      email : email,
      jobTitle : jobTitle,
      departmentID : departmentID
    },
    success: function(result) {
      if (result.status.code == 200) {
        console.log('successfully edited personnel record.');
      }
    }

  })
  
})


$("#editDepartmentModal").on("show.bs.modal", function (e) {
  
  $.ajax({
    url : "php/getDepartmentByID.php",
    type: "POST",
    dataType: "json",
    data: {
      id : $(e.relatedTarget).attr("data-id")
    },
    success: function (result) {
      const resultCode = result.status.code;

      if (resultCode == 200) {

        $("#editDepartmentID").val(result.data.department[0].id);
        $("#editDepartmentName").val(result.data.department[0].name);
        $("#editDepartmentLocation").html("");

        $.each(result.data.location, function () {
          $('#editDepartmentLocation').append(
            $("<option>", {
              value: this.id,
              text: this.name
            })
          );
        });

        $("#editDepartmentLocation").val(result.data.department[0].locationID);
      }
      else {
        $("#editDepartmentModal .modal-title").replaceWith(
          "Error retrieving data"
        );
      }
      
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#editPersonnelModal .modal-title").replaceWith(
        "Error retrieving data"
      );
    }
  })
})


$("#editDepartmentForm").on("submit", function (e) {
  //remove below line in production
  e.preventDefault()

  const id = document.getElementById("editDepartmentID").value;
  const deptName = document.getElementById("editDepartmentName").value;
  const locnID = document.getElementById("editDepartmentLocation").value;

  console.log(id);
  console.log(deptName);
  console.log(locnID);
  
$.ajax({
  url : "php/editDepartmentByID.php",
  type: "POST",
  data: {
    id: id,
    name: deptName,
    locationID: locnID
  },
  success: function (result) {
    console.log('record succesfully updated!');
    console.log(result);
  }
})
})


$("#deleteDepartmentModal").on("show.bs.modal", function (e) {  
  //check if department is being used
  const deptArray = [];
  let deptname;
  const id = $(e.relatedTarget).attr("data-id");
  

  $.ajax({
    url: "php/getAll.php",
    type: "GET",
    dataType: "json",
    success: function(result) {
      if (result.status.code == 200) {
        $.each(result.data, function(i){
          deptArray.push(result.data[i].department);
        })
      }
    }
  });

  $.ajax({
    url: "php/getDepartmentByID.php",
    type: "POST",
    dataType: "json",
    data: {
      id: id
    },
    success: function (result) {
      const resultCode = result.status.code;

      if (resultCode == 200) {
        deptname = result.data[0].name
      }
      
    }
  })

  $("#confirmDepDelete").off("click").on("click", function() {

    if (deptArray.includes(deptname)) {
      alert(`Cannot delete department: ${deptname} as it is in use.`)
    } else {
      $.ajax({
        url: "php/deleteDepartmentByID.php",
        type: "POST",
        data: {
          id : id
        },
        success: function(result) {
          const resultCode = result.status.code;
          if (resultCode == 200) {
            alert("Successfully deleted department");
          } else {
            alert("error deleting department.");
          }      
        }
      })
    }
    refreshDepartmentTable();
  })

})


$("#deleteLocationModal").on("show.bs.modal", function (e) {
  const locationIndexArray = [];
  const id = $(e.relatedTarget).attr("data-id");
  console.log(id);
  
  $.ajax({
    url: "php/getAllDepartments.php",
    type: "GET",
    dataType: "json",
    success: function(result) {
      if(result.status.code == 200) {
        $.each(result.data, function(i){
          locationIndexArray.push(result.data[i].locationID);
        })
      }
      console.log(locationIndexArray);
    }
  })
  
  $("#confirmLocDelete").off("click").on("click", function() {

    if (locationIndexArray.includes(id)) {
      alert(`Cannot delete location, as it is in use.`)
    } else {
      $.ajax({
        url: "php/deleteLocationByID.php",
        type: "POST",
        data: {
          id : id
        },
        success: function(result) {
          const resultCode = result.status.code;
          if (resultCode == 200) {
            alert("Successfully deleted location");
          } else {
            alert("error occured while deleting location");
          }
        }
      })
    }
    refreshLocationTable();
  })
})


$("#deletePersonnelModal").on("show.bs.modal", function (e) {
  //no need to check for dependencies
  const id = $(e.relatedTarget).attr("data-id");
  console.log(id);
  
  $("#confirmPersDelete").off("click").on("click", function() {
    
    $.ajax({
      url: "php/deletePersonnelByID.php",
      type: "POST",
      data: {
        id : id
      },
      success: function(result) {
        const resultCode = result.status.code;
        if (resultCode == 200) {
          alert("Successfully deleted record");
        } else {
          alert("error occured while deleting record");
        }
      }
    })
    refreshPersonnelTable();
  })
  
})