import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default function AnalyticsChart() {
  const [analyticsData, setAnalyticsData] = useState(null)

  useEffect(() => {
    const fetchAnalytics = async () => {
      const response = await fetch('/api/analytics')
      const data = await response.json()
      setAnalyticsData(data)
    }

    fetchAnalytics()
  }, [])

  if (!analyticsData) return <div>Loading analytics...</div>

  const data = {
    labels: analyticsData.dates,
    datasets: [
      {
        label: 'Likes',
        data: analyticsData.likes,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Comments',
        data: analyticsData.comments,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }

  return <Line data={data} />
}

