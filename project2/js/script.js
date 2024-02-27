//upon script and DOM loading, refresh personnel table immediately
refreshPersonnelTable();

function refreshPersonnelTable() {
  $("#filterBtn").attr("disabled", false);

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

function clearSearchFilter() {
  $("#searchInp").val("");
}

function searchFilter(result) {
  //make personnel tab active as search acts on personnel table.
  $("#personnelBtn").tab("show");

  $("#filterBtn").attr("disabled", false);

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

  $.ajax({
    url: "php/SearchAll.php",
    type: "POST",
    data: {
      txt : $(this).val()
    },
    success: function(result){

      if (result.status.code == 200) {

        $('#personnelTable').empty();
        $('#departmentsTable').empty();
        $('#locationsTable').empty();

        searchFilter(result);
      }
    }
  })
});

$("#refreshBtn").on("click", function () {

  clearSearchFilter();
  
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

$("#filterModal").on("show.bs.modal", function () {
  // Open a modal of your own design that allows the user to apply a filter to the personnel table on either department or location
  //clear all existing options in list
  $('#departmentDropdown').empty();
  $('#locationDropdown').empty();

  $.ajax({
    url: "php/getAllDepartments.php",
    type: "GET",
    success: function(result) {     
      let tempLocnArray = [];

      for (let i = 0; i < result.data.length; i++){
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

      for (let i = 0; i < result.location.length; i++){

        let option = document.createElement('option');
        option.text = result.location[i].name;
        option.value = result.location[i].name;

        tempLocnArray.push(option);
      }

      tempLocnArray.sort(function (a, b) {
        if (a.text < b.text) {
          return -1;
        }
        if (a.text > b.text) {
          return 1;
        }
        return 0;
      });

      for (let i = 0; i < tempLocnArray.length + 1; i++){
        if (i == 0) {
          let option = document.createElement('option');
          option.text = "All";
          option.value = "all";
          $("#locationDropdown").append(option);
        } else {
          $("#locationDropdown").append(tempLocnArray[i - 1]);
        }
      }

      tempLocnArray.forEach(element => {
        $("#locationDropdown").append(element);
      });
    }
  })

clearSearchFilter();

  $("#departmentDropdown").off("change").on("change", function() {
    let dept = $('select[id="departmentDropdown"] option:selected').val();
    let locn = $('select[id="locationDropdown"] option:selected').val();

    if (dept != "all") {
      $("#locationDropdown").val("all");

      $.ajax({
        url: "php/SearchAll.php",
        type: "POST",
        data: {
          txt: dept
        },
        success: function(result) {
          if (result.status.code == 200) {
            if (result.data.found.length == 0) {
              $("#informationModal").modal('show');
              $("#information").html('No records saved under this department.');
            }
            searchFilter(result);
          }
        }
      })
    } 

    if (dept == "all" && locn == "all") {
      refreshPersonnelTable();
    }
  })

  $("#locationDropdown").off("change").on("change", function() {
    let dept = $('select[id="departmentDropdown"] option:selected').val();
    let locn = $('select[id="locationDropdown"] option:selected').val();

    if (locn != "all") {
      $("#departmentDropdown").val("all");

      $.ajax({
        url: "php/SearchAll.php",
        type: "POST",
        data: {
          txt: locn
        },
        success: function(result) {
          if (result.status.code == 200) {
            if(result.data.found.length == 0) {
              $("#informationModal").modal('show');
              $("#information").text('No records found at this location.');
            }
            searchFilter(result);
          }
        }
      })
    }

    if (dept == "all" && locn == "all") {
      refreshPersonnelTable();
    }
  })
});


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
    departmentSelectLabel.innerHTML = "Department";

    //read getAllDepartments to populate the departments dropdown.
    $.ajax({
      url: "php/getAllDepartments.php",
      type: "GET",
      success: function(result) {
        if (result.status.code == 200) {

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

        //first check for duplicates
        let personnelArray = [];
        const firstName = document.getElementById("inputFirstName").value;
        const lastName = document.getElementById("inputLastName").value;
        const email = document.getElementById("inputEmail").value;

        let bool = false;

        $.ajax({
          url: "php/getAll.php",
          type: "GET",
          async: false,
          dataType: "json",
          success: function(result) {
            if (result.status.code == 200) {
              $.each(result.data, function(i){
                personnelArray.push(result.data[i]);
              })
            }
          }
        })

        $.each(personnelArray, function (i, record) {
          if ((record.lastName == lastName) && (record.firstName == firstName) && (record.email == email)) {
            e.preventDefault();
            $("#informationModal").modal('show');
            $("#information").text(`A record with the name: ${firstName} ${lastName} and email: ${email} already exists. Record not saved.`);
            bool = true;
            return false;
          };
        })

        if (bool == false) {
          $.ajax({
            url: "php/insertPersonnel.php",
            type: "POST",
            async: false,
            data: {
              firstName: firstName,
              lastName: lastName,
              jobTitle: document.getElementById("inputJobTitle").value,
              email: email,
              departmentID: document.getElementById("personnelDepartmentDropdown").value
            },
            success: function (result) {
              if (result.status.code == 200) {
                $('#personnelForm').addClass('alert alert-success').show();
                $('#personnelForm').text('Success!');
              }
            }
          })
        }
      })

  } else {
    //add department
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
          if (result.status.code == 200) {

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

        //check for duplicates
        let departmentArray = [];
        const departmentName = document.getElementById("departmentNameInput").value;
        const locnID = document.getElementById("departmentLocationDropdown").value;
        let bool = false;

        $.ajax({
          url: "php/getAllDepartments.php",
          type: "GET",
          async: false,
          success: function (result) {
            if (result.status.code == 200) {
              $.each(result.data, function(i) {
                departmentArray.push(result.data[i])
              })
            }
          }
        })

        $.each(departmentArray, function (i, record) {
          
          if ((record.name == departmentName) && (record.locationID == locnID)){
            e.preventDefault();
            $("#informationModal").modal('show');
            $("#information").text(`A department with the name: ${departmentName} exists in the same location. New department not saved.`);
            bool = true;
            return false;
          };
        })

        if (bool == false) {
          $.ajax({
            url: "php/insertDepartment.php",
            type: "POST",
            async: false,
            data: {
              name: departmentName,
              locationID: locnID
            },
            success: function (result) {
              if (result.status.code == 200) {
                $('#departmentForm').addClass('alert alert-success').show();
                $('#departmentForm').text('Department saved successsfully.');
              }
            }
          })
        }
      })

    } else {
      //add location modal
      $("#addModalTitle").html("Add Location")

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

      $("#locationForm").on("submit", function (e) {

        //check for duplicates
        let locationArray = [];
        const location = document.getElementById("inputLocationName").value;
        let bool = false;

        $.ajax({
          url: "php/getAllLocations.php",
          type: "GET",
          async: false,
          success: function (result){
            if (result.status.code == 200) {
              $.each(result.data, function(i) {
                locationArray.push(result.data[i].name)
              })
            }
          }
        })

        $.each(locationArray, function () {
          if (locationArray.includes(location)) {
            e.preventDefault();
            $("#informationModal").modal('show');
            $("#information").text(`Location: ${location} already exists. New location not saved.`);
            bool = true;
            return false;
          }
        })

        if (bool == false) {
          $.ajax({
            url: "php/insertLocation.php",
            type: "POST",
            data: {
              name: location
            },
            success: function (result) {
              if (result.status.code == 200) {
                $('#locationForm').addClass('alert alert-success').show();
                $('#locationForm').text('Location saved successfully.');
              }
            }
          })
        }
      })
    }
  }
});


$("#personnelBtn").on("click", function() {
  // Call function to refresh personnel table
  clearSearchFilter()
  $("#filterBtn").attr("disabled", false);
  refreshPersonnelTable()
});

$("#departmentsBtn").on("click", function() {
  // Call function to refresh department table
  clearSearchFilter()
  $("#filterBtn").attr("disabled", true);
  refreshDepartmentTable()
});

$("#locationsBtn").on("click", function() {
  // Call function to refresh location table 
  clearSearchFilter()
  $("#filterBtn").attr("disabled", true);
  refreshLocationTable() 
});


// edit Personnel
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
  e.preventDefault();

  let persArray = [];
  const fName = document.getElementById("editPersonnelFirstName").value;
  const lName = document.getElementById("editPersonnelLastName").value;
  const persEmail = document.getElementById("editPersonnelEmailAddress").value;

  let bool = false;

  $.ajax({
    url: "php/getAll.php",
    type: "GET",
    dataType: "json",
    success: function(result) {
      if (result.status.code == 200) {
        $.each(result.data, function(i){
          persArray.push(result.data[i]);
        })
      }
    }
  })
  
  .then(()=> {
    persArray.forEach((person) => {
      if (person.lastName == lName && person.firstName == fName && person.email == persEmail) {
        $("#informationModal").modal('show');
        $("#information").text(`A record with the name: ${fName} ${lName} and email: ${persEmail} already exists.`);
        bool = true;
        return;
      }
    })

    if(bool == false) {
      $.ajax({
        url: "php/editPersonnel.php",
        type: "POST",
        data: {
          id : document.getElementById("editPersonnelEmployeeID").value,
          firstName : document.getElementById("editPersonnelFirstName").value,
          lastName : document.getElementById("editPersonnelLastName").value,
          email : document.getElementById("editPersonnelEmailAddress").value,
          jobTitle : document.getElementById("editPersonnelJobTitle").value,
          departmentID : document.getElementById("editPersonnelDepartment").value
        },
        success: function(result) {
          if (result.status.code == 200) {
            $('#editPersonnelForm').addClass('alert alert-success').show();
            $('#editPersonnelForm').text('successfully edited personnel record.');
            e.target.submit();
          }
        }
      })
    }
  })
})

// Edit department
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
  e.preventDefault();
  let departArray = [];
  let bool = false;
  const departName = document.getElementById("editDepartmentName").value;
  const departlocn = document.getElementById("editDepartmentLocation").value;

  $.ajax({
    url: "php/getAllDepartments.php",
    type: "GET",
    success: function (result) {
      if (result.status.code == 200) {
        $.each(result.data, function(i) {
          departArray.push(result.data[i])
        })
      }
    }    
  })
  
  .then(()=> {
    departArray.forEach((department)=> {
      if(department.name == departName && department.locationID == departlocn) {
        $("#informationModal").modal('show');
        $("#information").innerHTML(`A department with the name: <b>${departName}</b> already exists in the same location.`);
        bool = true;
        return;
      } 
    })

    if (bool == false) {
      $.ajax({
        url : "php/editDepartmentByID.php",
        type: "POST",
        data: {
          id: document.getElementById("editDepartmentID").value,
          name: document.getElementById("editDepartmentName").value,
          locationID: document.getElementById("editDepartmentLocation").value
        },
        success: function (result) {
          if(result.status.code == 200) {
            $('#editDepartmentForm').addClass('alert alert-success').show();
            $('#editDepartmentForm').text('record succesfully updated!');
            e.target.submit();
          }
        }
      })
    }
  })
})


// Edit Location
$("#editLocationModal").on("show.bs.modal", function (e) {

  $.ajax({
    url: "php/getLocationByID.php",
    type: "POST",
    dataType: "json",
    data: {
      id : $(e.relatedTarget).attr("data-id")
    },
    success: function (result) {

      if (result.status.code == 200) {
        $("#editLocationID").val(result.data.location[0].id);
        $("#editLocationName").val(result.data.location[0].name);
      }
      else {
        $("#editLocationModal .modal-title").replaceWith(
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

$("#editLocationForm").on("submit", function (e) {
  e.preventDefault();
  let locnArray = [];
  const input = document.getElementById("editLocationName").value;

  $.ajax({
    url: "php/getAllLocations.php",
    type: "GET",
    success: function (result){
      
      if (result.status.code == 200) {
        $.each(result.data, function(i) {
          locnArray.push(result.data[i].name)
        })
      }
    }
  })

  .then(()=> {
    if(!locnArray.includes(input)) {
      $.ajax({
        url: "php/editLocationByID.php",
        type: "POST",
        data: {
          id : document.getElementById("editLocationID").value,
          name : input
        },
        success: function(result) {
          if (result.status.code == 200) {
            $('#editLocationForm').addClass('alert alert-success').show();
            $('#editLocationForm').text('successfully edited location.');
            e.target.submit();
          }
        }
      })
    } else {
      $("#informationModal").modal('show');
      $('#information').text('this location already exists.');
    }
  })
})


//Delete Department
$("#deleteDepartmentModal").on("show.bs.modal", function (e) {  
  //check if department is being used
  const deptArray = [];
  let deptname;
  let count;
  const id = $(e.relatedTarget).attr("data-id");  
  let promises = [];

  promises.push(new Promise(resolve => {
    $.ajax({
      url: "php/getAll.php",
      type: "GET",
      dataType: "json",
      success: function(result) {
        if (result.status.code == 200) {
          $.each(result.data, function(i){
            resolve(deptArray.push(result.data[i].department));
          })
        }
      }
    });
  }));

  promises.push(new Promise(resolve => {
    $.ajax({
      url: "php/getDepartmentByID.php",
      type: "POST",
      dataType: "json",
      data: {
        id: id
      },
      success: function (result) {      
        if (result.status.code == 200) {
          resolve(deptname = result.data.department[0].name);
        }
      }
    });
  }));

  promises.push(new Promise((resolve) => {
    $.ajax({
      url: "php/getPersonnelByDeptCountByID.php",
      type: "POST",
      dataType: "json",
      data: {
        id: id
      },
      success: function (result) {     
        if (result.status.code == 200) {        
          resolve(count = result.data[0]['COUNT(departmentID)']);        
        }
      }
    });
  }));

  Promise.all(promises).then(() => {
    
    if (deptArray.includes(deptname)) {
      document.getElementById("deleteDepartmentModalFooter").replaceChildren();
      document.getElementById("deleteDepartmentTitle").innerHTML = "Cannot delete department";
      document.getElementById("deleteDepartmentWarning").innerHTML = `Cannot delete <b>${deptname}</b> department as there ${count > 1 ? "are" : "is"} <b>${count}</b> ${count > 1 ? 'employees' : 'employee'} assigned to it.`;
      $('#deleteDepartmentModalFooter').append($('<button type="button" class="btn btn-outline-primary btn-sm myBtn" data-bs-dismiss="modal">CLOSE</button>'));
  
    } else {
      document.getElementById("deleteDepartmentModalFooter").replaceChildren();
      document.getElementById("deleteDepartmentTitle").innerHTML = "Delete department";
      document.getElementById("deleteDepartmentWarning").innerHTML = `Are you sure you want to delete the department <b>${deptname}</b>?`;
      $('#deleteDepartmentModalFooter').append($('<button type="button" id="confirmDepDelete" class="btn btn-outline-primary btn-sm myBtn" data-bs-dismiss="modal">YES</button>'));
      $('#deleteDepartmentModalFooter').append($('<button type="button" class="btn btn-outline-primary btn-sm myBtn" data-bs-dismiss="modal">CANCEL</button>'));
    }
  
    $("#confirmDepDelete").off("click").on("click", function() {
      $.ajax({
        url: "php/deleteDepartmentByID.php",
        type: "POST",
        data: {
          id : id
        },
        success: function(result) {
          if (result.status.code == 200) {
            $("#confirmDepDelete").replaceWith("Successfully deleted department");
          } else {
            $("#confirmDepDelete").replaceWith("error deleting department.");
          }      
        }
      })
      refreshDepartmentTable();
    })
  });
})


// Delete Location
$("#deleteLocationModal").on("show.bs.modal", function (e) {
  const locationIndexArray = [];
  let locnName;
  let locnCount;
  const id = $(e.relatedTarget).attr("data-id");
  let promises = [];
  
  promises.push(new Promise(resolve => {
    $.ajax({
      url: "php/getAllDepartments.php",
      type: "GET",
      dataType: "json",
      success: function(result) {
        if(result.status.code == 200) {        
          $.each(result.data, function(i){
            resolve(locationIndexArray.push(result.data[i].locationID));
          })
        }
      }
    });
  }));

  promises.push(new Promise(resolve => {
    $.ajax({
      url: "php/getLocationByID.php",
      type: "POST",
      dataType: "json",
      data: {
        id: id
      },
      success: function (result) {      
        if (result.status.code == 200) {
          resolve(locnName = result.data.location[0].name);
        }
      }
    });
  }));

  promises.push(new Promise(resolve => {
    $.ajax({
      url: "php/getDeptLocationCountByID.php",
      type: "POST",
      dataType: "json",
      data: {
        id: id
      },
      success: function(result) {      
        if(result.status.code == 200) {
          resolve(locnCount = result.data[0]['COUNT(locationID)']);
        }
      }
    });
  }));

  Promise.all(promises).then(() => {
    if (locationIndexArray.includes(id)) {
      document.getElementById("deleteLocationModalFooter").replaceChildren();
      document.getElementById("deleteLocationTitle").innerHTML = "Cannot delete location";
      document.getElementById("deleteLocationWarning").innerHTML = `Cannot delete location <b>${locnName}</b> as there ${locnCount > 1 ? "are" : "is"} <b>${locnCount}</b> ${locnCount > 1 ? "departments" : "department"} allocated to it.`;
      $('#deleteLocationModalFooter').append($('<button type="button" class="btn btn-outline-primary btn-sm myBtn" data-bs-dismiss="modal">CLOSE</button>'));
    
    } else {
      document.getElementById("deleteLocationModalFooter").replaceChildren();
      document.getElementById("deleteLocationTitle").innerHTML = "Delete location";
      document.getElementById("deleteLocationWarning").innerHTML = `Are you sure you want to delete location <b>${locnName}</b>?`;
      $('#deleteLocationModalFooter').append($('<button type="button" id="confirmLocDelete" class="btn btn-outline-primary btn-sm myBtn" data-bs-dismiss="modal">YES</button>'));
      $('#deleteLocationModalFooter').append($('<button type="button" class="btn btn-outline-primary btn-sm myBtn" data-bs-dismiss="modal">CANCEL</button>'));
    }
  
    $("#confirmLocDelete").off("click").on("click", function() {
      $.ajax({
        url: "php/deleteLocationByID.php",
        type: "POST",
        data: {
          id : id
        },
        success: function(result) {
          const resultCode = result.status.code;
          if (resultCode == 200) {
            $("#informationModal").modal('show');
            $('#information').text("Successfully deleted location");
          } else {
            $("#informationModal").modal('show');
            $('#information').text("error occured while deleting location");
          }
        }
      })
      refreshLocationTable();
    });
  });
})


//Delete Personnel
$("#deletePersonnelModal").on("show.bs.modal", function (e) {

  let persName;
  const id = $(e.relatedTarget).attr("data-id");

  $.ajax({
    url: "php/getPersonnelByID.php",
    type: "POST",
    dataType: "json",
    data: {
      id: id
    },
    success: function (result) {      
      if (result.status.code == 200) {        
        persName = result.data.personnel[0].firstName + " " + result.data.personnel[0].lastName;
      }
    }
  })

  .then(function() {
    document.getElementById("deletePersonnelWarning").innerHTML = `Are you sure you want to delete the record for <b>${persName}</b>?`;
  
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
            $("#informationModal").modal('show');
            $('#information').text("Successfully deleted record");
          } else {
            $("#informationModal").modal('show');
            $('#information').text("error occured while deleting record");
          }
        }
      })
      refreshPersonnelTable();
    })
  })
})