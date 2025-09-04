interface User {
  id: string
  email: string
  password: string
  name: string
  role: "student" | "instructor" | "admin"
  createdAt: Date
}

// In-memory storage for users (in production, this would be a real database)
const users: User[] = []

export const authStorage = {
  createUser: (userData: Omit<User, "id" | "createdAt">) => {
    const user: User = {
      ...userData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
    }
    users.push(user)
    return { ...user, password: undefined } // Don't return password
  },

  findUserByEmail: (email: string) => {
    return users.find((user) => user.email === email)
  },

  validateUser: (email: string, password: string) => {
    const user = users.find((user) => user.email === email && user.password === password)
    if (user) {
      return { ...user, password: undefined } // Don't return password
    }
    return null
  },

  getAllUsers: () => {
    return users.map((user) => ({ ...user, password: undefined }))
  },
}
