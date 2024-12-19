'use client'
import { useState, useEffect } from 'react'

export default function AdminPanel() {
  const [users, setUsers] = useState([])
  const [subscriptions, setSubscriptions] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const usersResponse = await fetch('/api/admin/users')
      const usersData = await usersResponse.json()
      setUsers(usersData)

      const subscriptionsResponse = await fetch('/api/admin/subscriptions')
      const subscriptionsData = await subscriptionsResponse.json()
      setSubscriptions(subscriptionsData)
    }

    fetchData()
  }, [])

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4">Users</h2>
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Plan</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td className="border p-2">{user.id}</td>
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.plan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4">Subscriptions</h2>
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">User ID</th>
              <th className="border p-2">Plan</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map(subscription => (
              <tr key={subscription.id}>
                <td className="border p-2">{subscription.id}</td>
                <td className="border p-2">{subscription.userId}</td>
                <td className="border p-2">{subscription.plan}</td>
                <td className="border p-2">{subscription.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

