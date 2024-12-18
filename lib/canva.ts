import axios from 'axios'

const canvaApi = axios.create({
  baseURL: 'https://api.canva.com',
  headers: {
    'Authorization': `Bearer ${process.env.CANVA_API_KEY}`,
    'Content-Type': 'application/json'
  }
})

export const generateImage = async (template: string, text: string) => {
  try {
    const response = await canvaApi.post('/v1/designs', {
      template_id: template,
      modifications: [
        {
          type: 'text',
          text: text
        }
      ]
    })

    return response.data.url
  } catch (error) {
    console.error('Error generating image with Canva:', error)
    throw error
  }
}

export default canvaApi

