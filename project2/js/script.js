// const { clippingParents } = require("@popperjs/core");

$("#searchInp").on("keyup", function () {
  
  // your code
  
});

$("#refreshBtn").on("click", function () {
  
  if ($("#personnelBtn").hasClass("active")) {
    console.log('personnel btn pressed');
    // Refresh personnel table
    // AJAX call to search all personnel
    $.ajax({
      url: "php/getAll.php",
      type: "GET",
      success: function (result) {
        console.log(result);
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
        }
      }
    });
    
  } else {
    
    if ($("#departmentsBtn").hasClass("active")) {
      console.log('btn pressed');
      // Refresh department table
      $.ajax({
        url: "php/getAllDepartments.php",
        type: 'GET',
        success: function (result) {

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
    } else {
      
      // Refresh location table
      
    }
    
  }
  
});

$("#filterBtn").click(function () {
  
  // Open a modal of your own design that allows the user to apply a filter to the personnel table on either department or location
  
});

$("#addBtn").click(function () {
  
  // Replicate the logic of the refresh button click to open the add modal for the table that is currently on display
  
});

$("#personnelBtn").click(function () {
  
  // Call function to refresh personnel table
  
});

$("#departmentsBtn").click(function () {
  
  // Call function to refresh department table
  
});

$("#locationsBtn").click(function () {
  
  // Call function to refresh location table
  
});

$("#editPersonnelModal").on("show.bs.modal", function (e) {
  console.log('edit personnel btn pressed');
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
      
      console.log(result);

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
