-- Insert sample apartments
INSERT INTO public.apartments (
  title, description, address, city, country, price_per_night, max_guests, 
  bedrooms, bathrooms, amenities, images, latitude, longitude
) VALUES 
(
  'Luxury Apartment in Split Old Town',
  'Beautiful 2-bedroom apartment in the heart of Split''s historic old town. Walking distance to Diocletian''s Palace and the waterfront.',
  'Ul. Kralja Tomislava 15',
  'Split',
  'Croatia',
  120.00,
  4,
  2,
  1,
  ARRAY['wifi', 'air_conditioning', 'kitchen', 'balcony', 'washing_machine'],
  ARRAY['/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600'],
  43.5081,
  16.4402
),
(
  'Modern Studio near Dubrovnik Walls',
  'Cozy studio apartment with stunning views of the Adriatic Sea. Perfect for couples exploring Dubrovnik.',
  'Ul. Frana Supila 23',
  'Dubrovnik',
  'Croatia',
  95.00,
  2,
  1,
  1,
  ARRAY['wifi', 'air_conditioning', 'sea_view', 'balcony'],
  ARRAY['/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600'],
  42.6507,
  18.0944
),
(
  'Family Villa in Pula',
  'Spacious 3-bedroom villa with private garden and pool. Ideal for families visiting Istria.',
  'Ul. Svetog Teodora 8',
  'Pula',
  'Croatia',
  180.00,
  6,
  3,
  2,
  ARRAY['wifi', 'air_conditioning', 'kitchen', 'pool', 'garden', 'parking', 'washing_machine'],
  ARRAY['/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600'],
  44.8666,
  13.8496
),
(
  'Beachfront Apartment in Zadar',
  'Modern apartment right on the beach with panoramic sea views. Watch the famous Zadar sunset from your terrace.',
  'Obala kneza Branimira 2',
  'Zadar',
  'Croatia',
  110.00,
  4,
  2,
  1,
  ARRAY['wifi', 'air_conditioning', 'kitchen', 'sea_view', 'terrace', 'beach_access'],
  ARRAY['/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600'],
  44.1194,
  15.2314
),
(
  'Historic House in Rovinj',
  'Charming traditional Istrian house in Rovinj''s old town. Authentic experience with modern amenities.',
  'Ul. Grisia 12',
  'Rovinj',
  'Croatia',
  140.00,
  5,
  2,
  2,
  ARRAY['wifi', 'air_conditioning', 'kitchen', 'historic_building', 'balcony'],
  ARRAY['/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600'],
  45.0811,
  13.6387
);

-- Create an admin user profile (you'll need to replace this UUID with an actual user ID after registration)
-- This is just a placeholder - in real usage, you'd update this after creating an admin account
INSERT INTO public.profiles (id, first_name, last_name, is_admin)
VALUES ('00000000-0000-0000-0000-000000000000', 'Admin', 'User', true)
ON CONFLICT (id) DO UPDATE SET is_admin = true;

-- Insert sample contact message
INSERT INTO public.contact_messages (name, email, subject, message)
VALUES (
  'John Doe',
  'john.doe@example.com',
  'Inquiry about Split apartment',
  'Hi, I''m interested in booking the luxury apartment in Split for next month. Could you please provide more information about availability?'
);
