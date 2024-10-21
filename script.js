function filterData(event) {
  event.preventDefault(); // Prevent page reload on form submission

  const startdate = new Date(document.getElementById("startdate").value);
  const enddate = new Date(document.getElementById("enddate").value);
  console.log("Starting date: " + startdate);
  console.log("Ending date: " + enddate);

  const rows = document.querySelectorAll("#data-table tbody tr");

  rows.forEach(row => {
    const dateCell = row.cells[3]?.textContent.trim(); // Get date from 4th column (Datetime)
    if (dateCell === "--") {
      row.style.display = "none"; // Hide row if date is missing
      return;
    }

    const rowDate = new Date(dateCell);

    // Check if rowDate is within the range
    if (rowDate >= startdate && rowDate <= enddate) {
      row.style.display = ""; // Show row
    } else {
      row.style.display = "none"; // Hide row
    }
  });
}

 // Fetch and populate data
 async function fetchData() {
  const tableBody = document.querySelector("#data-table tbody");

  try {
    const response = await fetch('https://compute.samford.edu/zohauth/clients/datajson');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    // Clear the loading row
    tableBody.innerHTML = '';

    // Iterate over the data and populate rows
    data.forEach(item => {
      const row = document.createElement('tr');

      row.innerHTML = `
        <td><a href="details.html?id=${item.id}">Pitch ${item.id}</a></td>
        <td>${item.speed}</td>
        <td>${item.result || '--'}</td>
        <td>${item.datetime || '--'}</td>
      `;

      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Failed to fetch data:', error);
    tableBody.innerHTML = '<tr><td colspan="4">Error loading data.</td></tr>';
  }
}

// Call the function to fetch data on page load
fetchData();