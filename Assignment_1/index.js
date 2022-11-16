const { studentList } = require("./students");
studentList.map((student, i) => {
  let details = `Student Id : ${student.id} and Name is ${student.name}`;
  console.log(details);
});
