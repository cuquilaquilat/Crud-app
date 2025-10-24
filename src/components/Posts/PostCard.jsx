import { supabase } from '../../lib/supabase'
import { useState, useEffect } from 'react'

export default function PostCard({ post, onDelete }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const { data } = await supabase.auth.getUser()
    setUser(data.user)
  }

  const isOwner = user && user.id === post.user_id

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {post.image_url && (
        <div className="h-48 overflow-hidden">
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      {post.video_url && (
        <div className="h-48">
          <video
            src={post.video_url}
            controls
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{post.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {new Date(post.created_at).toLocaleDateString()}
          </span>
          
          {isOwner && (
            <button
              onClick={() => onDelete(post.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm font-medium"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
