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
  $.ajax({
    url: "php/getAllDepartments.php",
    type: "GET",
    success: function(result) {
      $.each(result.data, function(i) {
        let option = document.createElement('option');
        option.text = result.data[i].name;
        option.value = result.data[i].name;
        $("#departmentDropdown").append(option);
      })
      $.each(result.location, function(i) {
        let option = document.createElement('option');
        option.text = result.location[i].name;
        option.value = result.location[i].name;
        $("#locationDropdown").append(option);
      })
    }
  })

  // if a department is selected in the dropdown, reduce the number of options in the location dropdown
    $('#departmentDropdown').on("click", function(e) {
    console.log(e.target.value);
    $.ajax({
      url: "php/SearchAll.php",
      type: "POST",
      data: {
        txt : e.target.value
      },
      success: function (result) {
        let resultCode = result.status.code;

        if (resultCode == 200) {
          // searchFilter(result);
          $("#locationDropdown").empty();

          //rebuild the location dropdown which is now based on department
          let option = document.createElement('option');
          option.text = result.data.found[0].locationName;
          option.value = result.data.found[0].locationName;
          $("#locationDropdown").append(option);
        }
      }
    })
  })

  // if a location is selected in the dropdown, reduce the number of options in the departments dropdown
  $('#locationDropdown').on("click", function(e) {
    console.log(e.target.value);
    $.ajax({
      url: "php/SearchAll.php",
      type: "POST",
      data: {
        txt : e.target.value
      },
      success: function (result) {
        let resultCode = result.status.code;

        if (resultCode == 200) {
          // searchFilter(result);
          $("#departmentDropdown").empty();

          let departmentArray = [];

          //rebuild the department dropdown which is now based on location
          $.each(result.data.found, function(i) {
            let option = document.createElement('option');
            option.text = result.data.found[i].departmentName;
            option.value = result.data.found[i].departmentName;
            const val = option.text;

            if (!departmentArray.includes(val)){
              $("#departmentDropdown").append(option);
            }
            departmentArray.push(result.data.found[i].departmentName);
          })
        }
      }
    })
  })

  // event when submitting form
  $("#filterForm").on("submit", function(e) {
    e.preventDefault();
    let value = $('select[id="departmentDropdown"] option:selected').val();
    console.log(value);
    
  })

  // The following block of code works, however it is actuated when clicking on dd option
  // $('#departmentDropdown').on("click", function(e) {
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
  //         $('#personnelTable').empty();
  //         $('#departmentsTable').empty();
  //         $('#locationsTable').empty();

  //         console.log(result);
  //         searchFilter(result);
  //       }
  //     }
  //   })
  // })

});

$("#addBtn").click(function () {
  
  // Replicate the logic of the refresh button click to open the add modal for the table that is currently on display
  
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
