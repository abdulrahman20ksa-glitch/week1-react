import { useEffect, useState } from "react";
import "./App.css";

type Course = {
  id: number;
  title: string;
};

function App() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/courses")
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch(() => setMessage("Could not load courses"));
  }, []);

  const enrol = async (courseId: number) => {
    try {
      const response = await fetch("http://localhost:3000/enrolments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: 1, courseId }),
      });

      if (!response.ok) throw new Error();
      setMessage("Enrolment successful!");
    } catch {
      setMessage("Enrolment failed");
    }
  };

  return (
    <main style={{ maxWidth: 650, margin: "40px auto", padding: 20 }}>
      <h1>Course Enrolment</h1>

      <input
        type="text"
        placeholder="Search courses..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      {courses
        .filter((course) =>
          course.title.toLowerCase().includes(search.toLowerCase())
        )
        .map((course) => (
          <div key={course.id} style={{ marginTop: 20 }}>
            <h3>{course.title}</h3>
            <button onClick={() => enrol(course.id)}>Enrol</button>
          </div>
        ))}

      <p>{message}</p>
    </main>
  );
}

export default App;