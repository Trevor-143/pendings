
function submitIssue() {

  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('importance');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random() * 9999999) + '';
  const status = 'Open';

  if ((description.length == 0)) {
    alert("Please fill all fields with required data.");
    document.getElementById('add-issue').setAttribute("data-toggle", "modal");
    document.getElementById('add-issue').setAttribute("data-target", "#emptyField")
  }
  else {
    document.getElementById('add-issue').removeAttribute("data-toggle", "modal");
    document.getElementById('add-issue').removeAttribute("data-target", "#emptyField")
    const issue = { id, description, severity, assignedTo, status };
    let issues = [];
    if (localStorage.getItem('issues')) {
      issues = JSON.parse(localStorage.getItem('issues'));
    }
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));


    fetchIssues();

    // Set the background color based on severity
    const container = document.getElementById('well');
    
    if (severity === 'Very High') {
      container.style.backgroundColor = 'red';
    } else if (severity === 'Medium') {
      container.style.backgroundColor = 'yellow';
    }

  }

}


const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id == id);

  const hasStrike = currentIssue.description.includes('<strike>');

  if (hasStrike) {
    currentIssue.status = 'open'
    currentIssue.description = currentIssue.description.replace(/<strike>/g, '').replace(/<\/strike>/g, '');

  } else {
    currentIssue.status = 'closed'
    currentIssue.description = `<strike>${currentIssue.description}</strike>`
  }

  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter(issue => ((issue.id) != id))
  localStorage.removeItem('issues');
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  fetchIssues();
}

const fetchIssues = () => {

  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    const { id, description, severity, assignedTo, status } = issues[i];

    const container = document.createElement('div'); // Create a new container element for each issue
    container.className = 'well'; // Assign the class name 'well' to the container

    container.innerHTML += 
    `
      <h6>Issue ID: ${id} </h6>
      <p class="one"> <img src="./images/clock-icon.png" />  <span> ${status} </span></p>
      <h3> ${description} </h3>
      <p class="prio"><span > <img src="./images/prio.png" /> </span> ${severity}</p>
      <p><span > <img src="./images/cont.png" />  </span> ${assignedTo}</p>
      <button onclick="closeIssue(${id})" class="complete">Close</button>
      <button onclick="deleteIssue(${id})" class="remove">Delete</button>
    
    `
    
    if (severity === 'Very High') {
      container.style.backgroundColor = '#ff6f6f';
    } else if (severity === 'High') {
      container.style.backgroundColor = '#ffb58a';
    } else if (severity === 'Medium') {
      container.style.backgroundColor = '#f3ff8a';
    } else if (severity === 'Low') {
      container.style.backgroundColor = '#a5ff8a'
    } else {
      container.style.backgroundColor = 'white';
    }

    issuesList.appendChild(container)
  }
}
fetchIssues();