
// Simulate a database
let mockPortfolioPosts = [
  { id: '1', title: 'E-commerce Platform', link: 'https://example.com/project1', imgLink: 'https://picsum.photos/seed/project1/400/200', paragraph: 'A full-featured e-commerce platform with React frontend and Node.js backend. Implemented payment gateway integration and user management.' },
  { id: '2', title: 'Task Management App', link: 'https://example.com/project2', imgLink: 'https://picsum.photos/seed/project2/400/200', paragraph: 'A responsive task management application using Vue.js and Firebase. Features include drag-and-drop, notifications, and team collaboration.' },
  { id: '3', title: 'Personal Blog', link: 'https://example.com/project3', imgLink: 'https://picsum.photos/seed/project3/400/200', paragraph: 'A statically generated blog using Gatsby and Markdown. Optimized for performance and SEO with a clean, minimalist design.' },
];

let mockUsers = [
    { id: 'user1', email: 'test@example.com', token: 'fake-jwt-token-test' },
];

const SIMULATED_DELAY = 700; // ms

// --- Portfolio API Simulations ---

export const fetchPortfolio = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockPortfolioPosts].reverse()); // Return a copy, newest first
    }, SIMULATED_DELAY);
  });
};

export const addPost = (postData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newPost = {
        id: String(Date.now() + Math.random()), // Simple unique ID
        ...postData,
      };
      mockPortfolioPosts.push(newPost);
      resolve(newPost);
    }, SIMULATED_DELAY);
  });
};

export const updatePost = (postId, postData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const postIndex = mockPortfolioPosts.findIndex(p => p.id === postId);
      if (postIndex !== -1) {
        mockPortfolioPosts[postIndex] = { ...mockPortfolioPosts[postIndex], ...postData };
        resolve(mockPortfolioPosts[postIndex]);
      } else {
        reject(new Error('Post not found for update.'));
      }
    }, SIMULATED_DELAY);
  });
};

export const deletePost = (postId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const initialLength = mockPortfolioPosts.length;
      mockPortfolioPosts = mockPortfolioPosts.filter(p => p.id !== postId);
      if (mockPortfolioPosts.length < initialLength) {
        resolve();
      } else {
        reject(new Error('Post not found for deletion.'));
      }
    }, SIMULATED_DELAY);
  });
};


// --- Auth API Simulations ---

export const registerUser = (emailId, pass) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const existingUser = mockUsers.find(u => u.email === emailId);
            if (existingUser) {
                resolve({ err: false, userExist: true, register: false, validKey: null });
                return;
            }
            // Simulate password hashing and user creation
            const newUser = { id: String(Date.now()), email: emailId, token: `fake-jwt-${emailId}-${Date.now()}` };
            mockUsers.push(newUser);
            resolve({ err: false, userExist: false, register: true, validKey: null });
        }, SIMULATED_DELAY);
    });
};

export const loginUser = (email, pass) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = mockUsers.find(u => u.email === email);
            // In a real app, you'd check the hashed password 'pass'
            if (user) {
                resolve({ ...user }); // Return a copy
            } else {
                reject(new Error('Invalid email or password.'));
            }
        }, SIMULATED_DELAY);
    });
};

// Simulate updateUser, not directly used in this portfolio CRUD app but here for completeness from user prompt
export const updateUserPassword = (userIdEmail, newPass) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const userIndex = mockUsers.findIndex(u => u.email === userIdEmail);
            if (userIndex !== -1) {
                // In real app, update password hash
                console.log(`Simulating password update for ${userIdEmail} to ${newPass}`);
                resolve(true);
            } else {
                reject(new Error('User not found for password update.'));
            }
        }, SIMULATED_DELAY);
    });
};
