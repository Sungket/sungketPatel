// const { clippingParents } = require("@popperjs/core");

$("#searchInp").on("keyup", function () {
  
  // your code
  
});

$("#refreshBtn").on("click", function () {
  
  if ($("#personnelBtn").hasClass("active")) {
    console.log('personnel btn pressed');
    // Refresh personnel table
    // AJAX call to search all personnel
    
  } else {
    
    if ($("#departmentsBtn").hasClass("active")) {
      console.log('btn pressed');
      // Refresh department table
      // AJAX call to getAllDepartments.php
      $.ajax({
        url: "php/getAllDepartments.php",
        type: 'GET',
        success: function (result) {
          // result is coming back as an array, not JSON. No need to parse
          console.log(result.data[0]);
          console.log(result);

          for (let i = 0; i < result.data.length; i++){
            let tableRef = document.getElementById('departmentsTable');
            let newRow = tableRef.insertRow(-1);
            let newCell = newRow.insertCell(0);
            let newText = document.createTextNode(
              `<td class="align-middle text-nowrap">${result.data[i].name}</td><td class="align-middle text-nowrap d-none d-md-table-cell">${result.data[i].locationID}
              </td><td class="align-middle text-end text-nowrap">
              <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#deleteDepartmentModal" data-id="1">
              <i class="fa-solid fa-pencil fa-fw"></i></button>
              <button type="button" class="btn btn-primary btn-sm deleteDepartmentBtn" data-id="1">
              <i class="fa-solid fa-trash fa-fw"></i>
            </button>
          </td>`
            );
            newCell.appendChild(newText);
          };

          // for (let i = 0; i < result.data.length; i++){
          //   const row = document.createElement('tr');
          //   row.innerHTML = `<td class="align-middle text-nowrap">${result.data[i].name}</td><td class="align-middle text-nowrap d-none d-md-table-cell">${result.data[i].locationID}
          //   </td>            <td class="align-middle text-end text-nowrap">
          //   <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#deleteDepartmentModal" data-id="1">
          //     <i class="fa-solid fa-pencil fa-fw"></i>
          //   </button>
          //   <button type="button" class="btn btn-primary btn-sm deleteDepartmentBtn" data-id="1">
          //     <i class="fa-solid fa-trash fa-fw"></i>
          //   </button>
          // </td>`;
          // };
        }
      })
      
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
