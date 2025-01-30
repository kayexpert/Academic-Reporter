let students = [];
let subjects = [];
let grades = [];
let scores = [];

// Show specific page
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));
  document.getElementById(pageId).classList.remove('hidden');
  if (pageId === 'scores') updateScoresTable();
}

// Add student
function addStudent() {
  const firstName = document.getElementById('firstNameInput').value.trim();
  const lastName = document.getElementById('lastNameInput').value.trim();

  if (firstName && lastName) {
    students.push({ firstName, lastName });
    updateStudentTable();
    document.getElementById('firstNameInput').value = '';
    document.getElementById('lastNameInput').value = '';
  } else {
    alert('Please enter both first and last names.');
  }
}

// Update student table
function updateStudentTable() {
  const tableBody = document.getElementById('studentTableBody');
  tableBody.innerHTML = '';

  students.forEach((student, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><span>${student.firstName}</span><input type="text" value="${student.firstName}" class="hidden"></td>
      <td><span>${student.lastName}</span><input type="text" value="${student.lastName}" class="hidden"></td>
      <td>
        <button onclick="editRow(${index}, 'student')"><i class="fa fa-edit"></i>Edit</button>
        <button onclick="saveRow(${index}, 'student')" class="hidden"><i class="fa fa-save"></i>Save</button>
        <button onclick="deleteRow(index, 'student')"><i class="fa fa-trash"></i>Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Edit row (generic for students, subjects, grades)
function editRow(index, type) {
  const row = document.querySelector(`#${type}TableBody tr:nth-child(${index + 1})`);
  Array.from(row.cells).forEach(cell => {
    cell.querySelector('span')?.classList.add('hidden');
    cell.querySelector('input')?.classList.remove('hidden');
  });
  row.cells[row.cells.length - 1].querySelector('.fa-save').parentElement.classList.remove('hidden');
  row.cells[row.cells.length - 1].querySelector('.fa-edit').parentElement.classList.add('hidden');
}

// Save row (generic for students, subjects, grades)
function saveRow(index, type) {
  const row = document.querySelector(`#${type}TableBody tr:nth-child(${index + 1})`);
  let data;

  if (type === 'student') {
    const firstName = row.cells[0].querySelector('input').value.trim();
    const lastName = row.cells[1].querySelector('input').value.trim();
    if (firstName && lastName) {
      students[index] = { firstName, lastName };
      updateStudentTable();
    } else {
      alert('Please enter valid first and last names.');
    }
  } else if (type === 'subject') {
    const subjectName = row.cells[0].querySelector('input').value.trim();
    if (subjectName) {
      subjects[index] = subjectName;
      updateSubjectTable();
    } else {
      alert('Please enter a valid subject name.');
    }
  } else if (type === 'grade') {
    const minScore = parseInt(row.cells[0].querySelector('input').value);
    const maxScore = parseInt(row.cells[1].querySelector('input').value);
    const grade = row.cells[2].querySelector('input').value.trim();
    const remark = row.cells[3].querySelector('input').value.trim();
    if (!isNaN(minScore) && !isNaN(maxScore) && grade && remark) {
      grades[index] = { minScore, maxScore, grade, remark };
      updateGradeTable();
    } else {
      alert('Please fill in all fields correctly.');
    }
  }
}

// Delete row (generic for students, subjects, grades)
function deleteRow(index, type) {
  if (type === 'student') {
    students.splice(index, 1);
    updateStudentTable();
  } else if (type === 'subject') {
    subjects.splice(index, 1);
    updateSubjectTable();
  } else if (type === 'grade') {
    grades.splice(index, 1);
    updateGradeTable();
  }
}

// Add subject
function addSubject() {
  const subjectName = document.getElementById('subjectInput').value.trim();
  if (subjectName) {
    subjects.push(subjectName);
    updateSubjectTable();
    document.getElementById('subjectInput').value = '';
  } else {
    alert('Please enter a subject name.');
  }
}

// Update subject table
function updateSubjectTable() {
  const tableBody = document.getElementById('subjectTableBody');
  tableBody.innerHTML = '';

  subjects.forEach((subject, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><span>${subject}</span><input type="text" value="${subject}" class="hidden"></td>
      <td>
        <button onclick="editRow(${index}, 'subject')"><i class="fa fa-edit"></i>Edit</button>
        <button onclick="saveRow(${index}, 'subject')" class="hidden"><i class="fa fa-save"></i>Save</button>
        <button onclick="deleteRow(${index}, 'subject')"><i class="fa fa-trash"></i>Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Add grade
function addGrade() {
  const minScore = parseInt(document.getElementById('minScoreInput').value);
  const maxScore = parseInt(document.getElementById('maxScoreInput').value);
  const grade = document.getElementById('gradeInput').value.trim();
  const remark = document.getElementById('remarkInput').value.trim();

  if (!isNaN(minScore) && !isNaN(maxScore) && grade && remark) {
    grades.push({ minScore, maxScore, grade, remark });
    updateGradeTable();
    document.getElementById('minScoreInput').value = '';
    document.getElementById('maxScoreInput').value = '';
    document.getElementById('gradeInput').value = '';
    document.getElementById('remarkInput').value = '';
  } else {
    alert('Please fill in all fields correctly.');
  }
}

// Update grade table
function updateGradeTable() {
  const tableBody = document.getElementById('gradeTableBody');
  tableBody.innerHTML = '';

  grades.forEach((grade, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><span>${grade.minScore}</span><input type="number" value="${grade.minScore}" class="hidden"></td>
      <td><span>${grade.maxScore}</span><input type="number" value="${grade.maxScore}" class="hidden"></td>
      <td><span>${grade.grade}</span><input type="text" value="${grade.grade}" class="hidden"></td>
      <td><span>${grade.remark}</span><input type="text" value="${grade.remark}" class="hidden"></td>
      <td>
        <button onclick="editRow(${index}, 'grade')"><i class="fa fa-edit"></i>Edit</button>
        <button onclick="saveRow(${index}, 'grade')" class="hidden"><i class="fa fa-save"></i>Save</button>
        <button onclick="deleteRow(${index}, 'grade')"><i class="fa fa-trash"></i>Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Update scores table
function updateScoresTable() {
  const student = document.getElementById('studentSelect').value;
  const tableBody = document.getElementById('scoreTableBody');
  tableBody.innerHTML = '';

  subjects.forEach((subject, index) => {
    const existingScore = scores.find(score => score.student === student && score.subject === subject);

    const classScore = existingScore?.classScore || '';
    const examScore100 = existingScore?.examScore100 || '';
    const examScore50 = examScore100 ? examScore100 / 2 : '';

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${subject}</td>
      <td><input type="number" value="${classScore}" oninput="updateScore('${student}', '${subject}', 'classScore', this.value)"></td>
      <td><input type="number" value="${examScore100}" oninput="updateScore('${student}', '${subject}', 'examScore100', this.value)"></td>
      <td><input type="number" value="${examScore50}" readonly></td>
      <td>
        <button onclick="deleteScore('${student}', '${subject}')"><i class="fa fa-trash"></i>Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Update or add score
function updateScore(student, subject, field, value) {
  const existingScoreIndex = scores.findIndex(score => score.student === student && score.subject === subject);

  if (existingScoreIndex !== -1) {
    scores[existingScoreIndex][field] = parseInt(value);
  } else {
    scores.push({ student, subject, classScore: 0, examScore100: 0 });
    const newScoreIndex = scores.length - 1;
    scores[newScoreIndex][field] = parseInt(value);
  }

  // Recalculate examScore50
  const score = scores.find(score => score.student === student && score.subject === subject);
  score.examScore50 = score.examScore100 / 2;

  updateScoresTable();
}

// Delete score
function deleteScore(student, subject) {
  scores = scores.filter(score => !(score.student === student && score.subject === subject));
  updateScoresTable();
}

// Generate report
function generateReport() {
  const selectedStudent = document.getElementById('reportStudentSelect').value;
  const reportBody = document.getElementById('reportBody');
  reportBody.innerHTML = '';

  subjects.forEach(subject => {
    const score = scores.find(score => score.student === selectedStudent && score.subject === subject);
    if (score) {
      const totalScore = score.classScore + score.examScore50;
      const gradeInfo = grades.find(g => totalScore >= g.minScore && totalScore <= g.maxScore);
      const grade = gradeInfo ? gradeInfo.grade : 'N/A';
      const remark = gradeInfo ? gradeInfo.remark : 'N/A';

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${subject}</td>
        <td>${score.classScore}</td>
        <td>${score.examScore50}</td>
        <td>${totalScore}</td>
        <td>${grade}</td>
        <td>${remark}</td>
      `;
      reportBody.appendChild(row);
    }
  });

  document.getElementById('reportTable').classList.remove('hidden');
}

// Update dropdowns
function updateDropdowns() {
  const studentDropdowns = [document.getElementById('studentSelect'), document.getElementById('reportStudentSelect')];

  studentDropdowns.forEach(dropdown => {
    dropdown.innerHTML = '';
    students.forEach(student => {
      const option = document.createElement('option');
      option.value = `${student.firstName} ${student.lastName}`;
      option.textContent = `${student.firstName} ${student.lastName}`;
      dropdown.appendChild(option);
    });
  });
}