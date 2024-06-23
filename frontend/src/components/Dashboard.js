import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Users fetched:', response.data); 
        setUsers(response.data);
        setError(''); 
      } catch (error) {
        console.error('Error fetching users', error);
        if (error.response && error.response.status === 401) {
          navigate('/login');
        } else {
          setError('Failed to fetch users. Please try again later.');
        }
      }
    };

    fetchUsers();
  }, [navigate]);

  return (
    <Container className="dashboard-container">
      <h2>User Data</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {users.length === 0 && !error && <p>No users found.</p>}
      {users.length > 0 && (
        <Table striped bordered hover className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{new Date(user.dob).toLocaleDateString()}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Dashboard;






// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Container, Table, Alert } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import './Dashboard.css';

// const Dashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       navigate('/login');
//       return;
//     }

//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/users', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         console.log('Users fetched:', response.data); // Log the response data for debugging
//         setUsers(response.data);
//       } catch (error) {
//         console.error('Error fetching users', error);
//         if (error.response && error.response.status === 401) {
//           navigate('/login');
//         } else {
//           setError('Failed to fetch users. Please try again later.');
//         }
//       }
//     };

//     fetchUsers();
//   }, [navigate]);

//   return (
//     <Container className="dashboard-container">
//       <h2>User Data</h2>
//       {error && <Alert variant="danger">{error}</Alert>}
//       {users.length === 0 && !error && <p>No users found.</p>}
//       {users.length > 0 && (
//         <Table striped bordered hover className="user-table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Date of Birth</th>
//               <th>Email</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user._id}>
//                 <td>{user.name}</td>
//                 <td>{new Date(user.dob).toLocaleDateString()}</td>
//                 <td>{user.email}</td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       )}
//     </Container>
//   );
// };

// export default Dashboard;









// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Container, Table } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import './Dashboard.css';

// const Dashboard = () => {
//   const [users, setUsers] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       navigate('/login');
//       return;
//     }

//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/users', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUsers(response.data);
//       } catch (error) {
//         console.error('Error fetching users', error);
//       }
//     };

//     fetchUsers();
//   }, [navigate]);

//   return (
//     <Container className="dashboard-container">
//       <h2>User Data</h2>
//       <Table striped bordered hover className="user-table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Date of Birth</th>
//             <th>Email</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user._id}>
//               <td>{user.name}</td>
//               <td>{new Date(user.dob).toLocaleDateString()}</td>
//               <td>{user.email}</td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </Container>
//   );
// };

// export default Dashboard;

