export interface Apartment {
  id: string
  title: string
  description: string | null
  address: string
  city: string
  country: string
  price_per_night: number
  max_guests: number
  bedrooms: number
  bathrooms: number
  amenities: string[]
  images: string[]
  latitude: number | null
  longitude: number | null
  is_available: boolean
  created_at: string
  updated_at: string
}

export interface Booking {
  id: string
  apartment_id: string
  user_id: string
  guest_name: string
  guest_email: string
  guest_phone: string | null
  check_in_date: string
  check_out_date: string
  total_guests: number
  total_price: number
  status: "pending" | "confirmed" | "cancelled" | "completed"
  special_requests: string | null
  created_at: string
  updated_at: string
  apartment?: Apartment
}

export interface Profile {
  id: string
  first_name: string | null
  last_name: string | null
  phone: string | null
  is_admin: boolean
  created_at: string
  updated_at: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone: string | null
  subject: string | null
  message: string
  is_read: boolean
  created_at: string
}
